import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const results = JSON.parse(fs.readFileSync(path.join(__dirname, 'tarot_database.json'), 'utf8'));

const finalArray = results.map(c => {
    return {
        id: c.id,
        name_en: c.name_en,
        name_vn: c.name_vi || c.name_vn || "",
        type: c.type,
        image: c.image || `/images/tarot_vn/${c.name_en}.jpeg`, 
        uprightMeaning: c.uprightMeaning || "",
        reversedMeaning: c.reversedMeaning || "",
        description: c.description || "",
        journey_story: c.journeyStory || c.journey_story || "",
        upright_keywords: c.upright_keywords || [],
        reversed_keywords: c.reversed_keywords || []
    };
});

const tsContent = `export interface TarotCard {
  id: string;
  name_en: string;
  name_vn: string;
  type: string;
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
  journey_story?: string;
  upright_keywords?: string[];
  reversed_keywords?: string[];
}

export const tarotDeck: TarotCard[] = ${JSON.stringify(finalArray, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'tarotData.ts'), tsContent, 'utf8');
console.log("Successfully rebuilt src/lib/tarotData.ts with local image paths!");
