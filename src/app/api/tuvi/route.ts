import { NextResponse } from "next/server";
import { generateTuViMock } from "@/lib/tuviHelper";

export const maxDuration = 60;

export async function POST(req: Request) {
  let inputData = { name: "Bạn", dob: "01/01/2000", time: "12:00", gender: "nam" };

  try {
    const body = await req.json();
    const { prompt, name, dob, time, gender } = body;
    
    if (name) inputData = { name, dob, time, gender };

    if (!prompt) {
      return NextResponse.json({ error: "Thiếu prompt phân tích Tử Vi" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === "undefined") {
      return NextResponse.json({ text: generateTuViMock(inputData) });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 6000 // Tối đa để có thể viết cẩm nang rất dài
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Groq API Error: ${response.status} - ${errBody}`);
    }

    const result = await response.json();
    const responseText = result.choices?.[0]?.message?.content;
    const finishReason = result.choices?.[0]?.finish_reason;

    if (finishReason && finishReason !== 'stop' && finishReason !== 'length') {
      return NextResponse.json({ text: responseText + `\n\n*(Hệ thống: AI đã ngừng tạo văn bản giữa chừng. Lý do: ${finishReason} - Vui lòng thử lại)*` });
    }

    if (!responseText) {
      throw new Error("Groq API returned empty response");
    }

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("AI Error in TuVi:", error);
    // Trả về kèm LỖI THỰC TẾ để dễ debug cộng theo mock report để dự phòng
    return NextResponse.json({ text: `**[HỆ THỐNG GHI NHẬN LỖI TỪ AI:** ${error?.message || "Lỗi không xác định"}]**\n\n*(Dưới đây là phần luận giải cơ bản dự phòng)*\n\n${generateTuViMock(inputData)}` });
  }
}
