import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

const docxPath = '832781633-Topshare-vn-y-Nghia-78-La-Bai-Tarot.docx';
const outputDir = 'public/images/tarot_vn';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let imageCounter = 1;

const options = {
    convertImage: mammoth.images.inline(function(element) {
        return element.read("base64").then(function(imageBuffer) {
            const ext = element.contentType.split('/')[1] || 'png';
            const filename = `card_${imageCounter.toString().padStart(3, '0')}.${ext}`;
            const filepath = path.join(outputDir, filename);
            const buffer = Buffer.from(imageBuffer, 'base64');
            fs.writeFileSync(filepath, buffer);
            imageCounter++;
            return {
                src: `/images/tarot_vn/${filename}`
            };
        });
    })
};

mammoth.convertToHtml({path: docxPath}, options)
    .then(function(result){
        const html = result.value; 
        fs.writeFileSync('parsed_tarot.html', `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`);
        console.log('Saved parsed_tarot.html. Total images:', imageCounter - 1);
    })
    .catch(err => {
        console.error("Error parsing docx:", err);
    });
