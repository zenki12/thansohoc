import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Tăng maxOutputTokens lên cực đại để AI có thể viết phân tích rất dài
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, topP: 0.9, maxOutputTokens: 6000 }
    });

    return NextResponse.json({ text: result.response.text() });
  } catch (error) {
    console.error("AI Error:", error);
    // Nếu có lỗi, tự động trả về Mock Report
    return NextResponse.json({ text: generateTuViMock(inputData) });
  }
}
