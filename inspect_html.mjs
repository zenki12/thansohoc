import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('parsed_tarot.html', 'utf8');
const $ = cheerio.load(html);

const headings = [];
$('h1, h2, h3, h4, p > strong').each((i, el) => {
    const text = $(el).text().trim();
    if (text.length > 3 && text.length < 50) {
        headings.push(text);
    }
});

fs.writeFileSync('headings.txt', headings.join('\n'));
console.log('Saved headings to headings.txt');
