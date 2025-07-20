const Database = require('better-sqlite3');
const db = new Database('data/resumes.db');

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    desiredJob TEXT,
    phone TEXT,
    email TEXT,
    location TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;