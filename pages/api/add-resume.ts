// pages/api/add-resume.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, desiredJob, phone, email, location } = req.body;
    try {
      db.prepare(
        'INSERT INTO resumes (fullName, desiredJob, phone, email, location) VALUES (?, ?, ?, ?, ?)'
      ).run(fullName, desiredJob, phone, email, location);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}