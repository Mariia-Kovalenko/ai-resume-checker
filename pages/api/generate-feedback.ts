import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { applicantInfo, parsedCV, diffs } = req.body;

  const prompt = `
You are an expert resume assistant.

Original CV:
${parsedCV}

Example diffs for inspiration (do not copy directly):
${JSON.stringify(diffs, null, 2)}

Your task:
- Suggest only meaningful improvements to the CV's content, clarity, or professionalism.
- Ignore changes that are just formatting, punctuation, or capitalization.
- Return a JSON object with: 
  - fullName (string)
  - score (0-100)
  - date (e.g., 'April 3, 2025')
  - strengths (4-5 items, about resume structure, not candidate)
  - diffs (up to 5, each with 'remove' and 'place' fields)
Respond ONLY with valid JSON, no markdown or extra text. Make sure the JSON is valid and complete, all tags are closed.
`;

  // const prompt = `You are an expert resume assistant. Here is the original CV text:\n${parsedCV}\n\nHere are some example diffs / suggested improvements that you can take as example, do not use them as is, but use them as example to improve the CV:\n${JSON.stringify(diffs, null, 2)}\n\nPlease regenerate the full CV with improvements applied and return the result as a JSON object with the following fields: fullName (string), score (number, 0-100), date (string, format like 'April 3, 2025'), strengths (array of strings, min 4, max 5 items that highlight the most important strengths of the resume structure, not candidate), diffs (array of objects with 'remove' and 'place' string fields, maximum 10 items). Respond ONLY with valid JSON, no markdown or extra text.\n\nIMPORTANT: Only include diffs that improve the substance, clarity, or professionalism of the CV. Do NOT include diffs that are only typographical or formatting changes (such as capitalization, punctuation, or spacing).`;

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