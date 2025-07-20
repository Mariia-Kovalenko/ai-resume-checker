import { getResumes } from "../../lib/resumes";

interface Resume {
  id: number;
  fullName: string;
  desiredJob: string;
  phone: string;
  email: string;
  location: string;
  createdAt: string;
}

export default async function Dashboard() {
  const resumes = await getResumes();

  return (
    <div>
      <h2>Analyzed Resumes</h2>
      {resumes.length === 0 && <p>No resumes found.</p>}
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Desired Job</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map(resume => (
              <tr key={resume.id}>
                <td>{resume.fullName}</td>
                <td>{resume.desiredJob}</td>
                <td>{resume.phone}</td>
                <td>{resume.email}</td>
                <td>{resume.location}</td>
                <td>{new Date(resume.createdAt).toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}