import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { topic, spreadType, question, drawnCards } = await req.json();

    let prompt = `Bạn là một Reader Tarot huyền bí, thấu cảm và có kết nối tâm linh sâu sắc. Khách hàng đang băn khoăn về chủ đề: "${topic}".
Câu hỏi cụ thể của họ (nếu có): "${question || 'Hãy cho tôi một thông điệp tổng quan năng lượng hiện tại.'}"
Họ đã bốc trải bài ${spreadType} lá.
Các lá bài vũ trụ đã gửi gắm cho họ:
`;

    drawnCards.forEach((c: any, index: number) => {
        prompt += `- Lá thứ ${index + 1}: ${c.name_vn} (${c.name_en}). Chiều bốc được: ${c.isReversed ? 'Ngược (Reversed)' : 'Xuôi (Upright)'}.
Ý nghĩa cốt lõi của lá này: ${c.isReversed ? c.reversedMeaning : c.uprightMeaning}
Mô tả ảnh: ${c.description}

`;
    });

    prompt += `
Nhiệm vụ của bạn:
Dựa vào ý nghĩa cốt gốc của các lá bài trên, hãy phân tích, tổng hợp và "kể một câu chuyện" luận giải bằng **Tiếng Việt** mượt mà, huyền bí, mang tính xoa dịu và chữa lành. KHÔNG dùng tiếng Anh. Phân tích sự liên kết giữa các lá bài (nếu >1 lá).

BẮT BUỘC trả về ĐÚNG định dạng JSON nguyên bản như sau (không kèm text nào khác ngoài JSON):
{
  "hookInsight": "2-3 câu hội tụ tinh hoa trải bài, cực kỳ 'trúng tim đen', khơi gợi sự tò mò mạnh. Hiển thị ở phần Free để mồi.",
  "fullStory": "Phân tích cụ thể từng lá bài khớp với bối cảnh câu hỏi, kết nối chúng thành câu chuyện diễn biến tâm lý/sự việc sâu sắc.",
  "conclusion": "Kết luận tổng thể chốt gọn vấn đề.",
  "advice": "Lời khuyên hành động chân thành, thực tế giúp họ vượt qua khó khăn."
}
Đảm bảo bạn format JSON chuẩn.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2500,
      response_format: { type: "json_object" },
    });

    let aiContent = chatCompletion.choices[0]?.message?.content || "{}";
    const data = JSON.parse(aiContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Tarot AI Error:", error);
    return NextResponse.json({ error: "Lỗi kết nối vũ trụ, vui lòng thử lại!" }, { status: 500 });
  }
}
