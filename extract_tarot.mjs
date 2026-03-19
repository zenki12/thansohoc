import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToProcess = [
  '871674724-Ẩn-Chinh-Ngược-Xuoipdf.pdf',
  'Hành trình (câu chuyện lá bài).pdf',
  '462558615-Ý-nghĩa-79-la-bai-docx.docx',
  '832781633-Topshare-vn-y-Nghia-78-La-Bai-Tarot.docx'
];

async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  try {
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error parsing PDF ${filePath}:`, error);
    return '';
  }
}

async function extractTextFromDocx(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error(`Error parsing DOCX ${filePath}:`, error);
    return '';
  }
}

async function main() {
  console.log('Starting text extraction from documents...');
  let combinedText = '';

  for (const filename of filesToProcess) {
    const filePath = path.join(__dirname, filename);
    console.log(`Processing: ${filename}`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    let text = '';
    if (filename.toLowerCase().endsWith('.pdf')) {
      text = await extractTextFromPDF(filePath);
    } else if (filename.toLowerCase().endsWith('.docx')) {
      text = await extractTextFromDocx(filePath);
    }

    if (text) {
      combinedText += `\n\n--- Start of ${filename} ---\n\n`;
      combinedText += text;
      combinedText += `\n\n--- End of ${filename} ---\n\n`;
      console.log(`Successfully extracted ${text.length} characters from ${filename}`);
    }
  }

  const outputPath = path.join(__dirname, 'tarot_raw_data.txt');
  fs.writeFileSync(outputPath, combinedText, 'utf8');
  console.log(`\nExtraction complete. Total characters: ${combinedText.length}`);
  console.log(`Saved to: ${outputPath}`);
}

main().catch(console.error);
