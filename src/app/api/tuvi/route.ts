import { NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "undefined") {
      return NextResponse.json({ text: generateTuViMock(inputData) });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Tắt các bộ lọc an toàn vì Tử Vi/Huyền học hay có các cung Tật Ách, Tử Tức, Nô Bộc dễ bị nhận diện nhầm là "Harassment" hoặc "Dangerous Content"
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 8192 }
    });

    const responseText = result.response.text();
    const finishReason = result.response.candidates?.[0]?.finishReason;

    if (finishReason && finishReason !== 'STOP') {
      return NextResponse.json({ text: responseText + `\n\n*(Hệ thống: AI đã ngừng tạo văn bản giữa chừng. Lý do: ${finishReason} - Vui lòng thử lại)*` });
    }

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("AI Error in TuVi:", error);
    // Trả về kèm LỖI THỰC TẾ để dễ debug nếu nó vẫn fail, cộng theo mock report để dự phòng
    return NextResponse.json({ text: `**[HỆ THỐNG GHI NHẬN LỖI TỪ AI:** ${error?.message || "Lỗi không xác định"}]**\n\n*(Dưới đây là phần luận giải cơ bản dự phòng)*\n\n${generateTuViMock(inputData)}` });
  }
}
