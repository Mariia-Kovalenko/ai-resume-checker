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
    parsedText TEXT,
    score INTEGER,
    strengths TEXT, -- JSON string
    diffs TEXT,     -- JSON string
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Add missing columns if they do not exist
const columnsToAdd = [
  { name: 'parsedText', type: 'TEXT' },
  { name: 'score', type: 'INTEGER' },
  { name: 'strengths', type: 'TEXT' },
  { name: 'diffs', type: 'TEXT' },
];

const tableInfo = db.prepare("PRAGMA table_info(resumes)").all();
const existingColumns = tableInfo.map(col => col.name);

for (const col of columnsToAdd) {
  if (!existingColumns.includes(col.name)) {
    db.prepare(`ALTER TABLE resumes ADD COLUMN ${col.name} ${col.type}`).run();
  }
}

export default db;