import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const maxDuration = 60; // Allow 60s timeout on Vercel

export async function POST(req: Request) {
  try {
    const { topic, spreadType, question, drawnCards } = await req.json();

    let prompt = `Bạn là một Tarot reader chuyên nghiệp với hơn 15 năm kinh nghiệm. Bạn không chỉ giải nghĩa lá bài mà còn giúp người hỏi hiểu rõ vấn đề và đưa ra định hướng cụ thể.
Điều quan trọng nhất:
👉 Mọi phân tích phải bám chặt vào câu hỏi của người dùng
👉 Không được nói chung chung
👉 Phải trả lời đúng “vấn đề họ đang cần quyết định”

INPUT
• Chủ đề: ${topic}
• Câu hỏi: ${question || 'Hãy cho tôi một thông điệp tổng quan năng lượng hiện tại.'}
• Trải bài: ${spreadType} lá
• Các lá bài:
`;

    drawnCards.forEach((c: any, index: number) => {
        prompt += `- Lá thứ ${index + 1}: ${c.name_vn} (${c.name_en}). Chiều bốc được: ${c.isReversed ? 'Ngược (Reversed)' : 'Xuôi (Upright)'}.
Ý nghĩa: ${c.isReversed ? c.reversedMeaning : c.uprightMeaning}
Story: ${c.description}

`;
    });

    prompt += `NGUYÊN TẮC CỐT LÕI
• Mỗi ý nghĩa lá bài đều phải liên hệ trực tiếp đến câu hỏi
• Không giải nghĩa theo kiểu sách vở chung chung
• Luôn đặt câu hỏi: “Điều này ảnh hưởng gì đến quyết định của người hỏi?”

YÊU CẦU PHÂN TÍCH
1. Tổng quan: Nêu rõ tình huống hiện tại liên quan trực tiếp đến câu hỏi.
2. Phân tích từng lá: Giải thích CỤ THỂ sự ảnh hưởng của nó tới bối cảnh câu hỏi.
3. Cốt truyện: Làm rõ vì sao họ phân vân, rào cản là gì, động lực là gì.
4. Trả lời rực diện: Nếu YES/NO thì phải nói rõ Nên / Không nên / Chưa nên. Không mập mờ.
5. Giải thích lý do rõ ràng.
6. Lời khuyên hành động rấp cụ thể (Nếu hành động thì lưu ý gì, nếu chưa thì chuẩn bị gì).

BẮT BUỘC TRẢ VỀ CHÍNH XÁC ĐỊNH DẠNG JSON SAU (Không kèm markdown code block text nào khác):
{
  "hookInsight": "2-3 câu Tổng quan (Hook). Nêu rõ tình huống và gợi mở hướng đi.",
  "fullStory": "Phân tích cụ thể TỪNG LÁ BÀI gắn với câu hỏi, sau đó diễn giải toàn bộ trải bài thành một CÂU CHUYỆN THỰC TẾ logic.",
  "conclusion": "Trả lời TRỰC DIỆN câu hỏi (Nên/Không nên...) và Giải thích LÝ DO.",
  "advice": "Lời khuyên hành động RẤT CỤ THỂ."
}`;

    let data;
    try {
        const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile", // Use the powerful model as primary
        temperature: 0.7,
        max_tokens: 2500,
        response_format: { type: "json_object" },
        });

        let aiContent = chatCompletion.choices[0]?.message?.content || "{}";
        data = JSON.parse(aiContent);
    } catch (groqError: any) {
        console.warn("Groq failed (likely quota), falling back to Gemini...", groqError?.message);
        try {
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.0-flash",
                generationConfig: { responseMimeType: "application/json" }
            });
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            data = JSON.parse(responseText);
        } catch (geminiError: any) {
            console.error("Gemini fallback also failed:", geminiError);
            return NextResponse.json({ error: "Lỗi kết nối vũ trụ từ cả 2 ngọn tháp, vui lòng thử lại sau!" }, { status: 500 });
        }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Tarot AI Error:", error);
    return NextResponse.json({ error: "Lỗi kết nối hệ thống, vui lòng thử lại!" }, { status: 500 });
  }
}
