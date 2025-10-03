'use server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function generateCoverLetterAction(parsedCV: string, jobTitle: string) {
  const prompt = `You are an expert career assistant.

The following is a resume:
${parsedCV}

The candidate is applying for the following job or role:
"${jobTitle}"

Your task:
- Write a brief, professional cover letter (max 250 words) tailored to the job/role above, using the resume as background.
- The letter should be in first person, suitable for a modern application, and highlight relevant strengths and motivation.
- Respond ONLY with the cover letter text, no markdown, no extra commentary, no JSON, no tags.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an assistant that generates tailored cover letters.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.3,
    max_tokens: 400
  });

  const coverLetter = completion.choices[0]?.message?.content?.trim() || '';
  if (!coverLetter) {
    throw new Error('No cover letter returned from AI');
  }
  return coverLetter;
}
