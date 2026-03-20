import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

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
4. Trả lời trực diện: Nếu YES/NO thì phải nói rõ Nên / Không nên / Chưa nên. Không mập mờ.
5. Giải thích lý do rõ ràng.
6. Lời khuyên hành động rất cụ thể (Nếu hành động thì lưu ý gì, nếu chưa thì chuẩn bị gì).

VÍ DỤ ÁP DỤNG (BẮT BUỘC HỌC THEO CÁCH TƯ DUY NÀY)
Ví dụ nếu câu hỏi là: “Tôi có nên chuyển việc không?”
👉 Phân tích của bạn bắt buộc phải bao gồm đủ các góc nhìn sâu sắc sau:
• Nói về công việc hiện tại (đang ổn / bế tắc / áp lực / hay đang học được gì)
• Nói về việc chuyển đi (cơ hội mở ra / rủi ro tiềm ẩn / timing thời điểm đã chín muồi chưa)
• Kết luận rõ: NÊN / CHƯA NÊN / KHÔNG NÊN
• Giải thích cặn kẽ vì sao lại chốt như vậy dựa trên các lá bài đã bốc.

Hãy áp dụng bộ khung tư duy sâu sắc này cho MỌI câu hỏi của khách hàng. Mổ xẻ 2 mặt của vấn đề thực tế chứ không chỉ đọc thơ.

BẮT BUỘC TRẢ VỀ CHÍNH XÁC ĐỊNH DẠNG JSON SAU (Không kèm markdown code block text nào khác):
{
  "hook": "2-3 câu Tổng quan. Nêu rõ tình huống và gợi mở hướng đi.",
  "cardAnalysis": [
    {
      "cardName": "Tên lá bài 1 (Kèm chiều Xuôi/Ngược)",
      "analysis": "Phân tích cụ thể mốc nối lá bài này gắn với câu hỏi / hoàn cảnh."
    }
  ],
  "story": "Kết nối các lá bài thành một CÂU CHUYỆN THỰC TẾ logic. Làm rõ rào cản, động lực.",
  "directAnswer": "Trả lời TRỰC DIỆN câu hỏi (Nên/Không nên / Yes/No). Thật ngắn gọn, dứt khoát.",
  "reasoning": "Giải thích LÝ DO rõ ràng tại sao lại có kết luận đó. Dựa trên yếu tố nào từ bài?",
  "action": "Lời khuyên hành động RẤT CỤ THỂ."
}`;

    let data;
    const cleanJSON = (str: string) => str.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
        // Primary: Gemini 2.0 Flash (Handles complex logic and Vietnamese nuance perfectly)
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash",
            generationConfig: { responseMimeType: "application/json" },
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
            ]
        });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        data = JSON.parse(cleanJSON(responseText));

    } catch (geminiError: any) {
        console.warn("Gemini failed, falling back to Groq Llama...", geminiError?.message);
        try {
            // Fallback: Groq Llama 3.1 8b-instant (70b gets rate-limited easily)
            const chatCompletion = await groq.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "llama-3.1-8b-instant",
                temperature: 0.7,
                max_tokens: 2500,
                response_format: { type: "json_object" },
            });
            let aiContent = chatCompletion.choices[0]?.message?.content || "{}";
            data = JSON.parse(cleanJSON(aiContent));

        } catch (groqError: any) {
            console.error("Groq fallback also failed:", groqError);
            return NextResponse.json({ error: "Lỗi kết nối toàn bộ hệ thống thấu thị, vui lòng thử lại sau!" }, { status: 500 });
        }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Tarot AI Error:", error);
    return NextResponse.json({ error: "Lỗi kết nối hệ thống, vui lòng thử lại!" }, { status: 500 });
  }
}
