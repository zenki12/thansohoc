import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadEnv = () => {
  try {
    const envData = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
    envData.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        process.env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/"/g, '');
      }
    });
  } catch (e) {
    console.error("Error loading env:", e);
  }
};
loadEnv();

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
    console.error("GROQ_API_KEY not found in .env.local");
    process.exit(1);
}

const rawText = fs.readFileSync(path.join(__dirname, 'tarot_raw_data.txt'), 'utf8');

const majors = [
  { n:"0", e:"The Fool", v:"Chàng Khờ,Kẻ Khờ" },
  { n:"1", e:"The Magician", v:"Ảo Thuật Gia,Phù Thủy" },
  { n:"2", e:"The High Priestess", v:"Nữ Tư Tế,Nữ Tu" },
  { n:"3", e:"The Empress", v:"Nữ Hoàng,Hoàng Hậu" },
  { n:"4", e:"The Emperor", v:"Hoàng Đế,Vua" },
  { n:"5", e:"The Hierophant", v:"Giáo Hoàng,Thầy Tế" },
  { n:"6", e:"The Lovers", v:"Tình Nhân,Những Kẻ Yêu Nhau" },
  { n:"7", e:"The Chariot", v:"Cỗ Xe,Chiến Xa" },
  { n:"8", e:"Strength", v:"Sức Mạnh,Nghị Lực" },
  { n:"9", e:"The Hermit", v:"Ẩn Sĩ,Người Ẩn Dật" },
  { n:"10", e:"Wheel of Fortune", v:"Bánh Xe Số Phận,Vòng Quay Vận Mệnh" },
  { n:"11", e:"Justice", v:"Công Lý,Công Bằng" },
  { n:"12", e:"The Hanged Man", v:"Người Treo Ngược,Kẻ Bị Treo" },
  { n:"13", e:"Death", v:"Cái Chết,Tử Thần" },
  { n:"14", e:"Temperance", v:"Cân Bằng,Tiết Chế" },
  { n:"15", e:"The Devil", v:"Ác Quỷ,Ngụy Thần" },
  { n:"16", e:"The Tower", v:"Tòa Tháp,Tháp Sụp Đổ" },
  { n:"17", e:"The Star", v:"Ngôi Sao,Tinh Tú" },
  { n:"18", e:"The Moon", v:"Mặt Trăng,Nguyệt" },
  { n:"19", e:"The Sun", v:"Mặt Trời,Thái Dương" },
  { n:"20", e:"Judgement", v:"Phán Xét,Sự Phán Xét" },
  { n:"21", e:"The World", v:"Thế Giới,Vũ Trụ" }
];

const suits = [
  { e: 'Wands', v: 'Gậy' }, { e: 'Cups', v: 'Cốc' },
  { e: 'Swords', v: 'Kiếm' }, { e: 'Pentacles', v: 'Tiền' }
];

const ranks = [
  { e: 'Ace', v: 'Ace' }, { e: 'Two', v: '2' }, { e: 'Three', v: '3' },
  { e: 'Four', v: '4' }, { e: 'Five', v: '5' }, { e: 'Six', v: '6' },
  { e: 'Seven', v: '7' }, { e: 'Eight', v: '8' }, { e: 'Nine', v: '9' },
  { e: 'Ten', v: '10' }, { e: 'Page', v: 'Page' },
  { e: 'Knight', v: 'Knight' }, { e: 'Queen', v: 'Queen' }, { e: 'King', v: 'King' }
];

const allCards = [];

majors.forEach(m => {
  allCards.push({
    id: `major_${m.n}_${m.e.toLowerCase().replace(/ /g, '_')}`,
    en: m.e,
    vn: m.v.split(','),
    type: 'Major Arcana',
    suit: 'None'
  });
});

suits.forEach(s => {
  ranks.forEach(r => {
    allCards.push({
      id: `minor_${s.e.toLowerCase()}_${r.e.toLowerCase()}`,
      en: `${r.e} of ${s.e}`,
      vn: [`${r.e} of ${s.e}`, `${r.v} ${s.v}`],
      type: 'Minor Arcana',
      suit: s.e
    });
  });
});

function extractSnippetsForCard(card) {
    const snippets = [];
    const searchTerms = [card.en, ...card.vn];
    const windowSize = 800; // chars

    const lowerText = rawText.toLowerCase();
    
    for (const term of searchTerms) {
        const lowerTerm = term.toLowerCase();
        let index = lowerText.indexOf(lowerTerm);
        while (index !== -1) {
            let start = Math.max(0, index - windowSize);
            let end = Math.min(rawText.length, index + term.length + windowSize);
            snippets.push(rawText.substring(start, end));
            index = lowerText.indexOf(lowerTerm, index + term.length);
            // Just take first 3 matches per term
            if (snippets.length >= 6) break;
        }
    }
    
    let combined = snippets.join('\n\n--- SNIPPET END ---\n\n');
    if (combined.length > 15000) {
        combined = combined.substring(0, 15000); // Keep under ~4k tokens per request
    }
    return combined;
}

async function processCard(card) {
    console.log(`Processing ${card.en}...`);
    const context = extractSnippetsForCard(card);
    
    const prompt = `Bạn là chuyên gia Tarot. Đọc văn bản trích xuất về lá bài "${card.vn[0]}" (${card.en}) và tạo đối tượng JSON duy nhất mô tả toàn diện lá bài này. Yêu cầu JSON đúng chuẩn, KHÔNG chứa markdown gì khác ngoài JSON.

Cấu trúc JSON:
{
  "id": "${card.id}",
  "name_vn": "${card.vn[0]}",
  "name_en": "${card.en}",
  "type": "${card.type}",
  "suit": "${card.suit}",
  "description": "Mô tả tổng thể (khoảng 150-300 từ)",
  "upright": { "keywords": [], "general": "", "love": "", "career": "" },
  "reversed": { "keywords": [], "general": "", "love": "", "career": "" },
  "journey_story": "Câu chuyện hành trình (dựa theo tài liệu) hoặc ý nghĩa sâu xa (200-400 từ)."
}

Văn bản tham khảo (hãy chắt lọc ý chính vì có thể thiếu/thừa):
"""\n${context}\n"""
`;

    // dynamic import node-fetch to resolve esm natively if needed or just use built-in fetch if Node >= 18
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2, 
            response_format: { type: "json_object" }
        })
    });
    
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Groq API Error: ${res.status} ${errText}`);
    }
    
    const data = await res.json();
    const content = data.choices[0].message.content;
    
    try {
        return JSON.parse(content);
    } catch (e) {
        console.error("Failed to parse JSON for card", card.en);
        return null;
    }
}

async function main() {
    let results = [];
    const dbPath = path.join(__dirname, 'tarot_database.json');
    if (fs.existsSync(dbPath)) {
        try {
            results = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            console.log(`Resuming from ${results.length} cards...`);
        } catch(e){}
    }

    const startIdx = results.length;

    for (let i = startIdx; i < allCards.length; i++) {
        const card = allCards[i];
        try {
            const data = await processCard(card);
            if (data) {
                results.push(data);
                // Save incrementally
                fs.writeFileSync(dbPath, JSON.stringify(results, null, 2), 'utf8');
                console.log(`Saved ${i + 1}/${allCards.length}: ${card.en}`);
            }
        } catch (e) {
            console.error(`Error processing ${card.en}:`, e.message);
            console.log("Waiting 30 seconds before retrying due to error...");
            await new Promise(r => setTimeout(r, 30000));
            i--; // retry
            continue;
        }
        
        // Wait 62 seconds to avoid rate limit (6000 TPM limit -> ~4k tokens per req -> 1 req/min)
        if (i < allCards.length - 1) {
            await new Promise(r => setTimeout(r, 62000));
        }
    }
    
    console.log("Finished generating all 78 cards. Saved to tarot_database.json");
    
    // Map of new IDs to old Sacred Texts IDs for images
    const getOldId = (card) => {
        if (card.type === 'Major Arcana') {
            const numMatch = card.id.match(/^major_(\d+)_/);
            if (numMatch) {
                let n = parseInt(numMatch[1]);
                return `ar${n < 10 ? '0'+n : n}`;
            }
        } else {
            // minor_wands_ace
            let suitMap = {'wands': 'wa', 'cups': 'cu', 'swords': 'sw', 'pentacles': 'pe'};
            let rankMap = {'ace':'ac','two':'02','three':'03','four':'04','five':'05','six':'06','seven':'07','eight':'08','nine':'09','ten':'10','page':'pa','knight':'kn','queen':'qu','king':'ki'};
            let parts = card.id.split('_'); // [minor, wands, ace]
            if (parts.length === 3) {
                return (suitMap[parts[1]]||'') + (rankMap[parts[2]]||'');
            }
        }
        return "ar00";
    };

    const newTsContent = `export interface TarotCard {
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

export const tarotDeck: TarotCard[] = \${JSON.stringify(results.map(c => {
    let oldId = getOldId(c);
    let img = \`https://sacred-texts.com/tarot/pkt/img/\${oldId}.jpg\`;
    if (oldId === 'peki') img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pents14.jpg/220px-Pents14.jpg'; // Reliable fallback from user script
    
    return {
        id: c.id,
        name_en: c.name_en,
        name_vn: c.name_vn,
        type: c.type,
        image: img, 
        uprightMeaning: (c.upright?.general || "") + (c.upright?.love ? "\\n\\nTình yêu: "+c.upright.love : "") + (c.upright?.career ? "\\n\\nCông việc: "+c.upright.career : ""),
        reversedMeaning: (c.reversed?.general || "") + (c.reversed?.love ? "\\n\\nTình yêu: "+c.reversed.love : "") + (c.reversed?.career ? "\\n\\nCông việc: "+c.reversed.career : ""),
        description: c.description || "",
        journey_story: c.journey_story || "",
        upright_keywords: c.upright?.keywords || [],
        reversed_keywords: c.reversed?.keywords || []
    };
}), null, 2)};
`;
    fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'tarotData.ts'), newTsContent, 'utf8');
    console.log("Successfully replaced src/lib/tarotData.ts with the new comprehensive database!");
}

main().catch(console.error);
