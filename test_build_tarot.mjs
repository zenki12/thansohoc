import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

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

const cardsToTest = [
    { id: 'major_0_fool', en: 'The Fool', vn: ['The Fool', 'Chàng Khờ', 'Kẻ Khờ', 'Lá Số 0'] },
    { id: 'major_1_magician', en: 'The Magician', vn: ['The Magician', 'Ảo Thuật Gia', 'Phù Thủy', 'Lá Số 1'] }
];

// Helper to extract relevant text chunks for a card
function extractSnippetsForCard(card) {
    const snippets = [];
    const searchTerms = [card.en, ...card.vn];
    const windowSize = 800; // chars before and after

    const lowerText = rawText.toLowerCase();
    
    for (const term of searchTerms) {
        const lowerTerm = term.toLowerCase();
        let index = lowerText.indexOf(lowerTerm);
        while (index !== -1) {
            // Found a match. Extract window
            let start = Math.max(0, index - windowSize);
            let end = Math.min(rawText.length, index + term.length + windowSize);
            snippets.push(rawText.substring(start, end));
            
            // continue searching
            index = lowerText.indexOf(lowerTerm, index + term.length);
            
            // Just take first 3 matches per term maximum to avoid explosion
            if (snippets.length >= 6) break;
        }
    }
    
    // Combine and deduplicate roughly by taking max 30,000 characters
    let combined = snippets.join('\n\n--- SNIPPET END ---\n\n');
    if (combined.length > 15000) {
        combined = combined.substring(0, 15000); // Keep within around ~4k tokens
    }
    return combined;
}

async function processCard(card) {
    console.log(`Processing ${card.en}...`);
    const context = extractSnippetsForCard(card);
    
    const prompt = `Bạn là một chuyên gia Tarot xuất sắc. Dưới đây là các đoạn văn bản trích xuất từ 4 tài liệu Tarot của tôi về lá bài "${card.vn[0]}" (${card.en}).
Hãy đọc chắt lọc thông tin và tạo ra MỘT đối tượng JSON duy nhất mô tả toàn diện về lá bài này. Yêu cầu định dạng JSON đúng chuẩn, KHÔNG chứa markdown gì khác ngoài JSON.

Cấu trúc JSON yêu cầu:
{
  "id": "${card.id}",
  "name_vn": "${card.vn[0]}",
  "name_en": "${card.en}",
  "type": "Major Arcana|Minor Arcana",
  "suit": "Wands|Cups|Swords|Pentacles|None",
  "description": "Mô tả tổng quan về hình ảnh và ý nghĩa chung của lá bài (khoảng 150-300 từ)",
  "upright": {
    "keywords": ["từ khóa 1", "từ khóa 2"],
    "general": "Ý nghĩa tổng quan khi xuôi",
    "love": "Ý nghĩa tình cảm khi xuôi",
    "career": "Ý nghĩa công việc/tài chính khi xuôi"
  },
  "reversed": {
    "keywords": ["từ khóa 1", "từ khóa 2"],
    "general": "Ý nghĩa tổng quan khi ngược",
    "love": "Ý nghĩa tình cảm khi ngược",
    "career": "Ý nghĩa công việc/tài chính khi ngược"
  },
  "journey_story": "Câu chuyện hành trình Tarot liên quan đến lá bài này (dựa vào tài liệu Hành trình câu chuyện lá bài), hoặc ý nghĩa sâu xa tâm linh (khoảng 200-400 từ)."
}

Dữ liệu tham khảo (có thể lộn xộn, hãy biết chắt lọc ý chính):
"""
${context}
"""

TRẢ VỀ DUY NHẤT ĐỐI TƯỢNG JSON ĐÓ KHÔNG KÈM GÌ THÊM.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2, // low temp for JSON output
            response_format: { type: "json_object" }
        })
    });
    
    if (!res.ok) {
        const errText = await res.text();
        fs.writeFileSync(path.join(__dirname, 'error.txt'), `Groq API Error: ${res.status} ${res.statusText}\n${errText}`, 'utf8');
        throw new Error(`Groq API Error: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    const content = data.choices[0].message.content;
    
    try {
        const parsed = JSON.parse(content);
        return parsed;
    } catch (e) {
        console.error("Failed to parse JSON for card", card.en, content);
        return null;
    }
}

async function main() {
    const results = [];
    for (const card of cardsToTest) {
        const data = await processCard(card);
        if (data) results.push(data);
        // Wait gracefully to avoid rate limits
        await new Promise(r => setTimeout(r, 2000));
    }
    
    fs.writeFileSync(path.join(__dirname, 'tarot_test_db.json'), JSON.stringify(results, null, 2), 'utf8');
    console.log("Saved test database to tarot_test_db.json");
}

main().catch(console.error);
