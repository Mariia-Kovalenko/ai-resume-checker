import db from '../../db/db';

export default function handler(req, res) {
  const resumes = db.prepare('SELECT * FROM resumes ORDER BY createdAt DESC').all();
  res.status(200).json({ resumes });
}