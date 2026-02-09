import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "prodigy_pathways"
});

db.connect(err => {
    if (err) {
        console.error("❌ MySQL connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database: prodigy_pathways");
    }
});

// ✅ Save quiz result
app.post("/api/results", (req, res) => {
    const { userId, domain, topic, score, percentage } = req.body;
    const sql = `
        INSERT INTO simple_results (user_id, domain, topic, score, percentage)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [userId, domain, topic, score, percentage], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

// ✅ Get results for user
app.get("/api/results/:userId", (req, res) => {
    const { userId } = req.params;
    const sql = `SELECT * FROM simple_results WHERE user_id = ? ORDER BY completed_at DESC`;
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
