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
    
    // Very strict check
    if (text.length > 2 && text.length < 40 && !text.includes(':') && !text.toLowerCase().includes('là') && !text.toLowerCase().includes('ý nghĩa') && !text.toLowerCase().includes('trong')) {
        const textUpper = text.toUpperCase();
        if (textUpper.match(/^(?:0\.|I\.|II\.|III\.|IV\.|V\.|VI\.|VII\.|VIII\.|IX\.|X\.|XI\.|XII\.|XIII\.|XIV\.|XV\.|XVI\.|XVII\.|XVIII\.|XIX\.|XX\.|XXI\.|I\s|II\s|III\s|IV\s|V\s|VI\s|VII\s|VIII\s|IX\s|X\s|XI\s|XII\s|XIII\s|XIV\s|XV\s|XVI\s|XVII\s|XVIII\s|XIX\s|XX\s|XXI\s|0\s|AW|2W|3W|4W|5W|6W|7W|8W|9W|10W|PW|KW|QW|AC|2C|3C|4C|5C|6C|7C|8C|9C|10C|PC|KC|QC|AS|2S|3S|4S|5S|6S|7S|8S|9S|10S|PS|KS|QS|AP|2P|3P|4P|5P|6P|7P|8P|9P|10P|PP|KP|QP)[\s\-–]/)) {
             isHeading = true;
        }
    }

    if (isHeading) {
        if (currentCard) cards.push(currentCard);
        currentCard = {
            name: text.replace('FOLD', 'FOOL'), 
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
console.log(finalCards.map(c => c.name).join(' | '));

fs.writeFileSync('cards2.json', JSON.stringify(finalCards, null, 2));
