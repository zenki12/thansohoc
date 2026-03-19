import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('k.html', 'utf8');
const $ = cheerio.load(html);

console.log($('title').text());
// Let's find some tarot cards. Look for common tags.
// Print the first few links or headers
const headers = $('h2, h3').slice(0, 10).map((i, el) => $(el).text()).get();
console.log("Headers:", headers);
