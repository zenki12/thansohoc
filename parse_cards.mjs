import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('parsed_tarot.html', 'utf8');
const $ = cheerio.load(html);

const keywords = [
  'Fool', 'Magician', 'High Priestess', 'Empress', 'Emperor', 'Hierophant', 'Lovers', 'Chariot', 'Strength', 'Hermit',
  'Wheel of Fortune', 'Justice', 'Hanged Man', 'Death', 'Temperance', 'Devil', 'Tower', 'Star', 'Moon', 'Sun', 'Judgement', 'World',
  'Wands', 'Cups', 'Swords', 'Pentacles'
];

const cards = [];
let currentCard = null;

$('body').children().each((i, el) => {
    const text = $(el).text().trim();
    const htmlContent = $(el).html();
    
    // Check if this element is a heading/title for a card
    let isHeading = false;
    if ($(el).is('h1, h2, h3, h4') || ($(el).is('p') && $(el).children('strong').length > 0 && text.length < 100)) {
        if (text.match(/^[0-9IVX]+\s*[-–.]/) || text.match(/^[A-Z0-9]{1,3}\s*[-–]/)) {
            // Check if it contains any of the tarot keywords
            if (keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()))) {
                isHeading = true;
            }
        }
        // Exception for 0. The Fold/Fool
        if (text.toLowerCase().includes('0. the fold')) isHeading = true;
    }
    
    if (isHeading) {
        if (currentCard) {
            cards.push(currentCard);
        }
        currentCard = {
            name: text,
            images: [],
            content: ''
        };
    } else if (currentCard) {
        // Collect content
        currentCard.content += `<${el.name}>${htmlContent}</${el.name}>\n`;
        
        // Find images in this block
        $(el).find('img').each((j, img) => {
            currentCard.images.push($(img).attr('src'));
        });
        if ($(el).is('img')) {
             currentCard.images.push($(el).attr('src'));
        }
    }
});

if (currentCard) cards.push(currentCard);

// Clean up: only keep the first image, and clean the content
const finalCards = cards.map(c => {
    // Sometimes there are multiple images, usually the first one right under the title is the main card image
    return {
        name: c.name,
        image: c.images.length > 0 ? c.images[0] : null,
        description_html: c.content
    };
});

fs.writeFileSync('cards.json', JSON.stringify(finalCards, null, 2));
console.log(`Extracted ${finalCards.length} cards. Saved to cards.json`);
