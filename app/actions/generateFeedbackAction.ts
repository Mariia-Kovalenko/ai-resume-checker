'use server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function generateFeedbackAction(applicantInfo: any, parsedCV: string, diffs: any) {
  const prompt = `\nYou are an expert resume assistant.\n\nOriginal CV:\n${parsedCV}\n\nExample diffs for inspiration (do not copy directly):\n${JSON.stringify(diffs, null, 2)}\n\nYour task:\n- Suggest only meaningful improvements to the CV's content, clarity, or professionalism.\n- Ignore changes that are just formatting, punctuation, or capitalization.\n- Return a JSON object with: \n  - fullName (string)\n  - score (0-100)\n  - date (e.g., 'April 3, 2025')\n  - strengths (4-5 items, about resume structure, not candidate)\n  - diffs (up to 5, each with 'remove' and 'place' fields)\nRespond ONLY with valid JSON, no markdown or extra text. Make sure the JSON is valid and complete, all tags are closed.\n`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an assistant that generates structured resume feedback.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 600
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
