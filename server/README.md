Server (Node.js + MySQL)

Setup
- Copy .env.example to .env and fill values
- Create database: prodigy_pathways
- Run: npm install
- Start dev: npm run dev

MySQL Schema
- users(id, name, email, password_hash, age, phone, created_at)
- questions(id, domain, topic, difficulty, question, options_json, correct_index, explanation, created_at)
- results(id, user_id, domain, difficulty, total_questions, correct_answers, percentage, topics_json, weak_areas_json, created_at)

Endpoints
- POST /api/register
- POST /api/login
- GET /api/questions?domain=&difficulty=&limit=
- POST /api/quiz-results

