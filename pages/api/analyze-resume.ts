import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { parsedText } = req.body;
  console.log('[request body] parsedText', parsedText);
  if (!parsedText || typeof parsedText !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid parsedText' });
  }

  try {
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
      console.log('[error when parsing aiText]', e);
      return res.status(500).json({ error: 'Failed to parse AI response', aiText });
    }
    if (!data) {
      console.log('[error when parsing aiText]');
      return res.status(500).json({ error: 'No data returned from AI', aiText });
    }
    return res.status(200).json({ data });
  } catch (error: any) {
    console.log('[error] error', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
} 