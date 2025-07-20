import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { applicantInfo, parsedCV, diffs } = req.body;

  const prompt = `You are an expert resume assistant. Here is the original CV text:\n${parsedCV}\n\nHere are some diffs / suggested improvements:\n${JSON.stringify(diffs, null, 2)}\n\nPlease regenerate the full CV with improvements applied and return the result as a JSON object with the following fields: fullName (string), score (number, 0-100), date (string, format like 'April 3, 2025'), strengths (array of strings, maximum 5 items), diffs (array of objects with 'remove' and 'place' string fields, maximum 10 items). Respond ONLY with valid JSON, no markdown or extra text.`;

  console.log('[generate-feedback] prompt:', prompt);

  try {
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
    console.log('[generate-feedback] aiText:', aiText);

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
      console.log('[generate-feedback] parsed data:', data);
    } catch (e) {
      console.log('[generate-feedback] error when parsing aiText', e);
      return res.status(500).json({ error: 'Failed to parse AI response', aiText });
    }
    if (!data) {
      return res.status(500).json({ error: 'No data returned from AI', aiText });
    }
    return res.status(200).json({ data });
  } catch (error: any) {
    console.log('[generate-feedback] error', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
} 