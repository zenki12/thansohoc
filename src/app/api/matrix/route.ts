import { NextResponse } from "next/server";
import { calculateMatrixDestiny, generateMatrixPromptForAI } from "@/lib/matrixHelper";
import { generateMatrixMockReport } from "@/lib/matrixMockData";

export const maxDuration = 60;

export async function POST(req: Request) {
  let name = "Bạn";
  let dob = "01/01/2000";
  let stats;

  try {
    const body = await req.json();
    name = body.name || name;
    dob = body.dob || dob;

    if (!body.name || !body.dob) {
      return NextResponse.json({ error: "Thiếu thông tin người dùng" }, { status: 400 });
    }

    stats = calculateMatrixDestiny(name, dob);
    const prompt = generateMatrixPromptForAI(name, dob, stats);

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === "undefined") {
      return NextResponse.json({ text: `**[LỖI HỆ THỐNG]: Không tìm thấy GROQ_API_KEY!**\nTrình duyệt / Server chưa có biến môi trường này.\n\n*(Dưới đây là phần luận giải cơ bản dự phòng)*\n\n${generateMatrixMockReport(name, stats)}` });
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
        temperature: 0.8,
        max_tokens: 3500
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
    console.error("AI Error:", error);
    if (!stats) stats = calculateMatrixDestiny(name, dob);
    return NextResponse.json({ text: `**[HỆ THỐNG GHI NHẬN LỖI TỪ AI:** ${error?.message || "Lỗi không xác định"}]**\n\n*(Dưới đây là phần luận giải cơ bản dự phòng)*\n\n${generateMatrixMockReport(name, stats)}` });
  }
}
