const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const PORT = 4000;
const DATA_DIR = path.join(__dirname, 'data');
const QUESTIONS_FILE = path.join(DATA_DIR, 'questions.json');
const RESULTS_FILE = path.join(DATA_DIR, 'results.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// CORS headers
function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// JSON response helper
function sendJSON(res, statusCode, data) {
    setCORSHeaders(res);
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

// Helper functions for reading/writing JSON files
async function readJSONFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
}

async function writeJSONFile(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
        return false;
    }
}

// Read questions from file
async function readQuestions() {
    return await readJSONFile(QUESTIONS_FILE);
}

// Parse query parameters
function parseQuery(queryString) {
    const params = new URLSearchParams(queryString);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

// Parse request body
function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
    });
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    console.log(`${method} ${pathname}`);

    // Handle preflight requests
    if (method === 'OPTIONS') {
        setCORSHeaders(res);
        res.writeHead(200);
        res.end();
        return;
    }

    try {
        // Health check endpoint
        if (pathname === '/api/health') {
            sendJSON(res, 200, { 
                status: 'OK', 
                message: 'Minimal server is running',
                timestamp: new Date().toISOString()
            });
            return;
        }

        // Get questions endpoint
        if (pathname === '/api/questions' && method === 'GET') {
            const query = parsedUrl.query;
            const { domain, difficulty, limit = '10' } = query;
            
            console.log('Query params:', { domain, difficulty, limit });
            
            const questions = await readQuestions();
            let filtered = questions;

            // Filter by domain
            if (domain) {
                filtered = filtered.filter(q => q.domain === domain);
                console.log(`Filtered by domain '${domain}': ${filtered.length} questions`);
            }

            // Filter by difficulty
            if (difficulty) {
                filtered = filtered.filter(q => q.difficulty === difficulty);
                console.log(`Filtered by difficulty '${difficulty}': ${filtered.length} questions`);
            }

            // Shuffle and limit results
            const shuffled = filtered.sort(() => 0.5 - Math.random());
            const result = shuffled.slice(0, parseInt(limit));
            
            console.log(`Returning ${result.length} questions`);
            sendJSON(res, 200, result);
            return;
        }

        // Get all questions endpoint
        if (pathname === '/api/questions/all' && method === 'GET') {
            const questions = await readQuestions();
            sendJSON(res, 200, questions);
            return;
        }

        // Save quiz result
        if (pathname === '/api/results' && method === 'POST') {
            const body = await parseRequestBody(req);
            const results = await readJSONFile(RESULTS_FILE);
            
            const newResult = {
                id: results.length + 1,
                ...body,
                created_at: new Date().toISOString()
            };
            
            results.push(newResult);
            const success = await writeJSONFile(RESULTS_FILE, results);
            
            if (success) {
                console.log(`✅ Quiz result saved for user ${body.userId}`);
                sendJSON(res, 200, { id: newResult.id, message: 'Quiz result saved successfully' });
            } else {
                sendJSON(res, 500, { error: 'Failed to save quiz result' });
            }
            return;
        }

        // Get user results
        if (pathname.startsWith('/api/results/') && method === 'GET') {
            const userId = pathname.split('/').pop();
            const results = await readJSONFile(RESULTS_FILE);
            const userResults = results.filter(r => r.userId === userId);
            sendJSON(res, 200, userResults);
            return;
        }

        // Save/Update user
        if (pathname === '/api/users' && method === 'POST') {
            const body = await parseRequestBody(req);
            const users = await readJSONFile(USERS_FILE);
            
            const existingUserIndex = users.findIndex(u => u.uid === body.uid);
            
            if (existingUserIndex >= 0) {
                // Update existing user
                users[existingUserIndex] = { ...users[existingUserIndex], ...body, updated_at: new Date().toISOString() };
                console.log(`✅ User updated: ${body.name}`);
            } else {
                // Create new user
                const newUser = {
                    id: users.length + 1,
                    ...body,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                users.push(newUser);
                console.log(`✅ User created: ${body.name}`);
            }
            
            const success = await writeJSONFile(USERS_FILE, users);
            
            if (success) {
                sendJSON(res, 200, { message: 'User saved successfully' });
            } else {
                sendJSON(res, 500, { error: 'Failed to save user' });
            }
            return;
        }

        // Get user by UID
        if (pathname.startsWith('/api/users/') && method === 'GET') {
            const uid = pathname.split('/').pop();
            const users = await readJSONFile(USERS_FILE);
            const user = users.find(u => u.uid === uid);
            
            if (user) {
                sendJSON(res, 200, user);
            } else {
                sendJSON(res, 404, { error: 'User not found' });
            }
            return;
        }

        // Default 404 response
        sendJSON(res, 404, { 
            error: 'Endpoint not found',
            available_endpoints: [
                'GET /api/health',
                'GET /api/questions?domain=ai&difficulty=easy&limit=5',
                'GET /api/questions/all',
                'POST /api/results',
                'GET /api/results/{userId}',
                'POST /api/users',
                'GET /api/users/{uid}'
            ]
        });

    } catch (error) {
        console.error('Server error:', error);
        sendJSON(res, 500, { error: 'Internal server error' });
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Minimal server running on http://localhost:${PORT}`);
    console.log(`📁 Using JSON file storage: ${DATA_DIR}`);
    console.log(`🌐 Test health check: http://localhost:${PORT}/api/health`);
    console.log(`🧠 Test AI questions: http://localhost:${PORT}/api/questions?domain=ai&difficulty=easy&limit=5`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
    });
});