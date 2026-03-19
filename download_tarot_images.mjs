import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, 'public', 'images', 'tarot_deck');

// Extract the URL downloading logic into a helper promise
const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
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
        console.log("Created directory:", imgDir);
    }

    const tsFilePath = path.join(__dirname, 'src', 'lib', 'tarotData.ts');
    let tsContent = fs.readFileSync(tsFilePath, 'utf8');

    // Extract all image URLs via regex
    const urlMatches = [...tsContent.matchAll(/image: "(https:\/\/[^"]+)"/g)];
    
    console.log(`Found ${urlMatches.length} external images in tarotData.ts. Starting download...`);
    
    // Download all images
    for (let i = 0; i < urlMatches.length; i++) {
        const imageUrl = urlMatches[i][1];
        const filename = imageUrl.split('/').pop();
        const localPath = path.join(imgDir, filename);

        if (fs.existsSync(localPath)) {
            console.log(`[${i+1}/${urlMatches.length}] Image already exists, skipping.`);
            continue;
        }

        try {
            console.log(`[${i+1}/${urlMatches.length}] Downloading ${filename}...`);
            await downloadImage(imageUrl, localPath);
        } catch (err) {
            console.error(`Failed to download ${imageUrl}:`, err.message);
        }
    }

    console.log("\\nAll downloads finished!");

    console.log("Updating database to point to local images...");
    
    // Replace the external URLs with local URLs
    tsContent = tsContent.replace(/image: "(https:\/\/[^"]+)"/g, (match, url) => {
        const filename = url.split('/').pop();
        return `image: "/images/tarot_deck/${filename}"`;
    });

    fs.writeFileSync(tsFilePath, tsContent, 'utf8');
    console.log("Successfully updated src/lib/tarotData.ts with local image paths!");
    console.log("YOU ARE 100% DONE!");
}

main().catch(console.error);
