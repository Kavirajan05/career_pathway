const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const QUESTIONS_FILE = path.join(DATA_DIR, 'questions.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const RESULTS_FILE = path.join(DATA_DIR, 'results.json');

// Initialize data storage
async function initializeStorage() {
    try {
        // Create data directory if it doesn't exist
        await fs.mkdir(DATA_DIR, { recursive: true });
        
        // Initialize empty files if they don't exist
        const files = [
            { path: QUESTIONS_FILE, default: [] },
            { path: USERS_FILE, default: [] },
            { path: RESULTS_FILE, default: [] }
        ];
        
        for (const file of files) {
            try {
                await fs.access(file.path);
            } catch (error) {
                // File doesn't exist, create it
                await fs.writeFile(file.path, JSON.stringify(file.default, null, 2));
                console.log(`✅ Created ${path.basename(file.path)}`);
            }
        }
        
        console.log('✅ File storage initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing storage:', error);
    }
}

// Helper functions
async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
}

async function writeJsonFile(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
        return false;
    }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running (JSON storage)' });
});

// Get questions
app.get('/api/questions', async (req, res) => {
    try {
        const { domain, difficulty, limit = 10 } = req.query;
        const questions = await readJsonFile(QUESTIONS_FILE);
        
        let filtered = questions;
        
        if (domain) {
            filtered = filtered.filter(q => q.domain === domain);
        }
        
        if (difficulty) {
            filtered = filtered.filter(q => q.difficulty === difficulty);
        }
        
        // Shuffle and limit
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const result = shuffled.slice(0, parseInt(limit));
        
        res.json(result);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// Add question
app.post('/api/questions', async (req, res) => {
    try {
        const questions = await readJsonFile(QUESTIONS_FILE);
        const newQuestion = {
            id: Date.now(),
            ...req.body,
            created_at: new Date().toISOString()
        };
        
        questions.push(newQuestion);
        await writeJsonFile(QUESTIONS_FILE, questions);
        
        res.json({ id: newQuestion.id, message: 'Question added successfully' });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: 'Failed to add question' });
    }
});

// Get all questions (for admin)
app.get('/api/questions/all', async (req, res) => {
    try {
        const questions = await readJsonFile(QUESTIONS_FILE);
        res.json(questions);
    } catch (error) {
        console.error('Error fetching all questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// Save quiz result
app.post('/api/results', async (req, res) => {
    try {
        const results = await readJsonFile(RESULTS_FILE);
        const newResult = {
            id: Date.now(),
            ...req.body,
            created_at: new Date().toISOString()
        };
        
        results.push(newResult);
        await writeJsonFile(RESULTS_FILE, results);
        
        console.log(`📊 Quiz result saved for user ${req.body.userId}: ${req.body.percentage}%`);
        res.json({ id: newResult.id, message: 'Quiz result saved successfully' });
    } catch (error) {
        console.error('Error saving quiz result:', error);
        res.status(500).json({ error: 'Failed to save quiz result' });
    }
});

// Get user quiz results
app.get('/api/results/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        
        const results = await readJsonFile(RESULTS_FILE);
        const userResults = results
            .filter(result => result.userId === userId)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, limit);
        
        res.json(userResults);
    } catch (error) {
        console.error('Error fetching user results:', error);
        res.status(500).json({ error: 'Failed to fetch user results' });
    }
});

// User management routes
app.post('/api/users', async (req, res) => {
    try {
        const users = await readJsonFile(USERS_FILE);
        const { uid } = req.body;
        
        // Find existing user
        const existingIndex = users.findIndex(user => user.uid === uid);
        
        if (existingIndex >= 0) {
            // Update existing user
            users[existingIndex] = {
                ...users[existingIndex],
                ...req.body,
                updated_at: new Date().toISOString()
            };
        } else {
            // Create new user
            const newUser = {
                id: Date.now(),
                ...req.body,
                created_at: new Date().toISOString()
            };
            users.push(newUser);
        }
        
        await writeJsonFile(USERS_FILE, users);
        
        res.json({ id: uid, message: 'User saved successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Failed to save user' });
    }
});

app.get('/api/users/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const users = await readJsonFile(USERS_FILE);
        
        const user = users.find(user => user.uid === uid);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Get statistics (bonus endpoint)
app.get('/api/stats', async (req, res) => {
    try {
        const questions = await readJsonFile(QUESTIONS_FILE);
        const results = await readJsonFile(RESULTS_FILE);
        const users = await readJsonFile(USERS_FILE);
        
        const stats = {
            totalQuestions: questions.length,
            totalUsers: users.length,
            totalQuizzes: results.length,
            averageScore: results.length > 0 
                ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
                : 0,
            domains: [...new Set(questions.map(q => q.domain))],
            recentResults: results
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5)
        };
        
        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Using JSON file storage (no database required)`);
    await initializeStorage();
    
    // Log the data directory
    console.log(`💾 Data files location: ${DATA_DIR}`);
    console.log(`🌐 Test server: http://localhost:${PORT}/api/health`);
});