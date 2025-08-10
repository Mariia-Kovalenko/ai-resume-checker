const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Decide database file path based on environment
// - In Vercel/serverless, the filesystem is read-only except for /tmp
// - In local/dev, keep using the repo path under data/
const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
const repoDbPath = path.join(process.cwd(), 'data', 'resumes.db');
const prodDir = '/tmp';
const prodDbPath = path.join(prodDir, 'resumes.db');

const dbFilePath = isProd ? prodDbPath : repoDbPath;

// Ensure target directory exists (especially important for /tmp in serverless)
try {
  fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });
} catch {}

// If running in prod and the db file does not exist yet, seed it from the repo copy if available
if (isProd) {
  try {
    const existsInTmp = fs.existsSync(prodDbPath);
    const hasSeed = fs.existsSync(repoDbPath);
    if (!existsInTmp && hasSeed) {
      fs.copyFileSync(repoDbPath, prodDbPath);
    }
  } catch {}
}

const db = new Database(dbFilePath);

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