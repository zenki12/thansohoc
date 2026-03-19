import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('parsed_tarot.html', 'utf8');
const $ = cheerio.load(html);

const cards = [];
let currentCard = null;

$('body').children().each((i, el) => {
    const text = $(el).text().trim();
    if (!text && el.name !== 'p') return;

    let isHeading = false;
    
    // Stricter check
    if (text.length > 2 && text.length < 40 && !text.toLowerCase().includes('ý nghĩa') && !text.toLowerCase().includes('trong')) {
        // Must start with identifier 
        if (text.match(/^(?:[0-9]{1,2}|AW|[2-9]W|10W|PW|KW|QW|AC|[2-9]C|10C|PC|KC|QC|AS|[2-9]S|10S|PS|KS|QS|AP|[2-9]P|10P|PP|KP|QP|[IVX]{1,4})\s*[\.\-\–]/i) 
            || text.match(/^0\.\s*THE FOLD/i) 
            || text.match(/^I\s*[-–]/)) {
             isHeading = true;
        }
    }

    if (isHeading) {
        if (currentCard) cards.push(currentCard);
        currentCard = {
            name: text.replace('FOLD', 'FOOL'), // fix typo from doc
            images: [],
            content: ''
        };
    } else if (currentCard) {
        currentCard.content += '<' + el.name + '>' + $(el).html() + '</' + el.name + '>\n';
        $(el).find('img').each((j, img) => currentCard.images.push($(img).attr('src')));
        if (el.name === 'img') currentCard.images.push($(el).attr('src'));
    }
});
if (currentCard) cards.push(currentCard);

const finalCards = cards.map(c => ({
    name: c.name,
    image: c.images.length > 0 ? c.images[0] : null,
    description_html: c.content
}));
console.log('Total extracted:', finalCards.length);

// Just print the card names to see what we got
console.log(finalCards.map(c => c.name).join(' | '));

fs.writeFileSync('cards2.json', JSON.stringify(finalCards, null, 2));
