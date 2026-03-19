import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const pdfPath = path.join(__dirname, 'Hành trình (câu chuyện lá bài).pdf');
    if (!fs.existsSync(pdfPath)) {
        console.error("File not found!", pdfPath);
        return;
    }
    const dataBuffer = fs.readFileSync(pdfPath);
    try {
        const pdflib = await import('pdf-parse');
        const parser = pdflib.default || pdflib;
        const data = await parser(dataBuffer);
        console.log("PDF TEXT PREVIEW:");
        console.log(data.text.substring(0, 1500));
        
        fs.writeFileSync(path.join(__dirname, 'pdf_extracted.txt'), data.text);
        console.log("Full text saved to pdf_extracted.txt");
    } catch(err) {
        fs.writeFileSync(path.join(__dirname, 'error.txt'), err.stack || String(err));
        console.error("Parse error saved to error.txt");
    }
}
main();
