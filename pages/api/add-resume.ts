// pages/api/add-resume.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, desiredJob, phone, email, location, parsedText, score, strengths, diffs } = req.body;
    try {
      db.prepare(
        'INSERT INTO resumes (fullName, desiredJob, phone, email, location, parsedText, score, strengths, diffs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).run(
        fullName,
        desiredJob,
        phone,
        email,
        location,
        parsedText,
        score,
        JSON.stringify(strengths || []),
        JSON.stringify(diffs || [])
      );
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error adding resume:', err);
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}