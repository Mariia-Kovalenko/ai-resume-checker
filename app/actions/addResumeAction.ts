'use server';
import { addResume } from '../../lib/resumes';

export async function addResumeAction(data: any) {
  return await addResume(data);
}
