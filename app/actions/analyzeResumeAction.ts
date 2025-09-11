'use server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function analyzeResumeAction(parsedText: string) {
  const prompt = `Extract the following information from the resume text below. Respond ONLY in valid JSON with these fields: fullName, desiredJob, phone, email, location.\n\nResume:\n${parsedText}`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an assistant that extracts structured data from resumes.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 300
  });
  const aiText = completion.choices[0]?.message?.content || '';
  function extractJsonFromMarkdown(markdown: string): any {
    const match = markdown.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (match && match[1]) {
      return JSON.parse(match[1]);
    }
    // Fallback: try to parse the whole string if no code block found
    return JSON.parse(markdown);
  }
  let data: any;
  try {
    data = extractJsonFromMarkdown(aiText);
  } catch (e) {
    throw new Error('Failed to parse AI response: ' + (e as Error).message);
  }
  if (!data) {
    throw new Error('No data returned from AI');
  }
  return data;
}
