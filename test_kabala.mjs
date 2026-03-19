import * as cheerio from 'cheerio';

async function testScrape() {
  const res = await fetch('https://dich.kabala.vn/tarot/y-nghia.html');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const links = new Set();
  $('a[href^="/tarot/y-nghia/"]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.endsWith('.html') && href !== '/tarot/y-nghia.html') {
      links.add(href);
    }
  });

  console.log(`Found ${links.size} unique links.`);
  console.log(Array.from(links).slice(0, 5));
}

testScrape();
