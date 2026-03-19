import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const dbPath = path.join(__dirname, 'tarot_database.json');
    const imagesDir = path.join(__dirname, 'public', 'images', 'tarot_vn');
    
    let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const files = fs.readdirSync(imagesDir);
    const filesLower = files.map(f => f.toLowerCase());
    
    let updatedCount = 0;
    
    for (let card of db) {
        // Try exact match first
        let expectedName = `${card.name_en}.jpeg`;
        let matchedFile = null;
        
        // Find best match in dir
        const expectedLower = expectedName.toLowerCase();
        
        // Trying various names
        const namesToTry = [
            expectedLower,
            expectedLower.replace('.jpeg', '.jpg'),
            expectedLower.replace('the ', ''),
            card.name_vi ? card.name_vi.toLowerCase() + '.jpeg' : null,
            card.name_vi ? card.name_vi.toLowerCase() + '.jpg' : null
        ];
        
        for (let j = 0; j < filesLower.length; j++) {
            if (namesToTry.includes(filesLower[j])) {
                matchedFile = files[j];
                break;
            }
        }
        
        if (matchedFile) {
            card.image = `/images/tarot_vn/${matchedFile}`;
            // Remove old properties that are no longer needed
            delete card.oldId;
            updatedCount++;
        } else {
            console.log("Could not find image for:", card.name_en);
        }
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log(`Successfully mapped ${updatedCount} images.`);
}

main().catch(console.error);
