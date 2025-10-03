import db from '../db/db';

export async function getResumes() {
  // add pseudo-delay with promise
  return new Promise((resolve, reject) => { 
    setTimeout(() => {
      const rows = db.prepare('SELECT * FROM resumes ORDER BY createdAt DESC').all();
      // Parse strengths and diffs from JSON
      resolve(rows.map(row => ({
        ...row,
        strengths: row.strengths ? JSON.parse(row.strengths) : [],
        diffs: row.diffs ? JSON.parse(row.diffs) : [],
      })));

      // reject(new Error('Error parsing strengths and diffs'));

    }, 1000);
  });
}

export async function addResume(resume) {
  return db.prepare(
    'INSERT INTO resumes (fullName, desiredJob, phone, email, location, parsedText, score, strengths, diffs, coverLetter, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)' // added coverLetter and status
  ).run(
    resume.fullName,
    resume.desiredJob,
    resume.phone,
    resume.email,
    resume.location,
    resume.parsedText,
    resume.score,
    JSON.stringify(resume.strengths || []),
    JSON.stringify(resume.diffs || []),
    resume.coverLetter || null,
    resume.status || 'analysed'
  );
}

export async function getResumeById(id) {
  return db.prepare('SELECT * FROM resumes WHERE id = ?').get(id);
}

export async function deleteResume(id) {    
    return db.prepare('DELETE FROM resumes WHERE id = ?').run(id);
}