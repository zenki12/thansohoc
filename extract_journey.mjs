import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanText(text) {
    return text.replace(/\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

async function main() {
    const rawText = fs.readFileSync(path.join(__dirname, 'pdf_extracted.txt'), 'utf8');
    
    // Extract stories
    const blocks = rawText.split('Tên lá bài:');
    const stories = {};
    
    for (let i = 1; i < blocks.length; i++) {
        const block = blocks[i];
        
        const nameMatch = block.match(/^\s*(.*?)\r?\n/);
        const storyMatch = block.match(/Câu\s*chuyện:\s*(.*?)\r?\nÝ Nghĩa:/s);
        
        if (nameMatch && storyMatch) {
            let cardName = nameMatch[1].trim().toLowerCase();
            // Normalize names
            if (cardName.startsWith('the ')) cardName = cardName.replace('the ', '');
            let story = cleanText(storyMatch[1]);
            stories[cardName] = story;
        }
    }
    
    console.log(`Extracted ${Object.keys(stories).length} stories from PDF.`);
    
    // Update db
    const dbPath = path.join(__dirname, 'tarot_database.json');
    let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    let updatedCount = 0;
    const storiesNorm = {};
    for(let k in stories) {
        storiesNorm[k.trim().replace(/\s+/g,' ')] = stories[k];
    }

    for (let card of db) {
        let nameToMatch = card.name_en.toLowerCase().trim();
        if (nameToMatch.startsWith('the ')) nameToMatch = nameToMatch.replace('the ', '');
        
        let found = storiesNorm[nameToMatch];
        if (!found) {
            // Try matching just the letters
            const strippedName = nameToMatch.replace(/[^a-z]/g, '');
            for(let k in storiesNorm) {
                if(k.replace(/[^a-z]/g, '') === strippedName) {
                    found = storiesNorm[k];
                    break;
                }
            }
        }

        if (found) {
            card.journeyStory = found;
            updatedCount++;
        } else {
            console.log("No story found for:", card.name_en, " - Tried matching:", nameToMatch);
        }
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log(`Updated ${updatedCount} cards with new journey stories.`);
}

main().catch(console.error);
