const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const pdfParse = require('pdf-parse');
const docxParser = require('docx-parser');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload error' });
    }
    const file = files.file[0];
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    let text = '';
    try {
      if (file.mimetype === 'application/pdf') {
        const dataBuffer = fs.readFileSync(file.filepath);
        const data = await pdfParse(dataBuffer);
        text = data.text.trim();
        console.log('text', text);
      } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await new Promise((resolve, reject) => {
          docxParser.parseDocx(file.filepath, (data) => {
            if (data) resolve(data.trim());
            else reject(new Error('Failed to parse DOCX'));
          });
        });
      } else {
        return res.status(400).json({ error: 'Unsupported file type' });
      }
    } catch (e) {
      return res.status(500).json({ error: 'Failed to parse file', details: e.message });
    } finally {
      // Clean up temp file
      try {
        fs.unlinkSync(file.filepath);
      } catch (err) {}
    }
    return res.status(200).json({ text });
  });
} 