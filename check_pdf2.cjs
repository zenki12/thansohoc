const fs = require('fs');
const PDFParser = require('pdf2json');
const path = require('path');

async function main() {
    const pdfPath = path.join(__dirname, 'Hành trình (câu chuyện lá bài).pdf');
    if (!fs.existsSync(pdfPath)) {
        console.error("File not found!", pdfPath);
        return;
    }

    const pdfParser = new PDFParser(this, 1);

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        const text = pdfParser.getRawTextContent();
        console.log("PDF TEXT PREVIEW:");
        console.log(text.substring(0, 1500));
        
        fs.writeFileSync(path.join(__dirname, 'pdf_extracted.txt'), text);
        console.log("Full text saved to pdf_extracted.txt");
    });

    pdfParser.loadPDF(pdfPath);
}

main();
