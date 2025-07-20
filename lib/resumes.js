import sql from 'better-sqlite3';

const db = sql('data/resumes.db');

export async function getResumes() {
  // add pseudo-delay with promise
  return new Promise((resolve) => { 
    setTimeout(() => {
      resolve(db.prepare('SELECT * FROM resumes ORDER BY createdAt DESC').all());
    }, 1000);
  });
}

export async function addResume(resume) {
  return db.prepare('INSERT INTO resumes (fullName, desiredJob, phone, email, location) VALUES (?, ?, ?, ?, ?)').run(resume.fullName, resume.desiredJob, resume.phone, resume.email, resume.location);
}

export async function deleteResume(id) {    
    return db.prepare('DELETE FROM resumes WHERE id = ?').run(id);
}