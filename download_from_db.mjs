import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, 'public', 'images', 'tarot_deck');

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Referer": "https://sacred-texts.com/tarot/pkt/index.htm",
            "Accept": "image/webp,image/apng,image/*,*/*;q=0.8"
        } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            }
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Status Code: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
};

async function main() {
    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
    }

    const results = JSON.parse(fs.readFileSync(path.join(__dirname, 'tarot_database.json'), 'utf8'));

    const getOldId = (card) => {
        if (card.type === 'Major Arcana') {
            const numMatch = card.id.match(/^major_(\d+)_/);
            if (numMatch) {
                let n = parseInt(numMatch[1]);
                return `ar${n < 10 ? '0'+n : n}`;
            }
        } else {
            let suitMap = {'wands': 'wa', 'cups': 'cu', 'swords': 'sw', 'pentacles': 'pe'};
            let rankMap = {'ace':'ac','two':'02','three':'03','four':'04','five':'05','six':'06','seven':'07','eight':'08','nine':'09','ten':'10','page':'pa','knight':'kn','queen':'qu','king':'ki'};
            let parts = card.id.split('_'); 
            if (parts.length === 3) {
                return (suitMap[parts[1]]||'') + (rankMap[parts[2]]||'');
            }
        }
        return "ar00";
    };

    console.log(`Found ${results.length} cards. Starting download directly...`);
    
    for (let i = 0; i < results.length; i++) {
        let oldId = getOldId(results[i]);
        let filename = `${oldId}.jpg`;
        let imageUrl = `https://sacred-texts.com/tarot/pkt/img/${filename}`;
        
        if (oldId === 'peki') {
            imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pents14.jpg/220px-Pents14.jpg';
            filename = 'Pents14.jpg';
        }

        const localPath = path.join(imgDir, filename);

        if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
            console.log(`[${i+1}/${results.length}] Image already exists, skipping.`);
            continue;
        }

        try {
            console.log(`[${i+1}/${results.length}] Downloading ${filename} as ${results[i].name_en}...`);
            await downloadImage(imageUrl, localPath);
            await new Promise(r => setTimeout(r, 1500)); // Delay to bypass 429
        } catch (err) {
            console.error(`Failed to download ${imageUrl}:`, err.message);
        }
    }

    console.log("\\nAll downloads finished successfully! Check public/images/tarot_deck folder!");
}

main().catch(console.error);
