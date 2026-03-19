import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateNumerology, generatePromptForAI } from "@/lib/numerologyHelper";
import { generateMockReport } from "@/lib/mockData";

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

    stats = calculateNumerology(name, dob);
    const prompt = generatePromptForAI(name, dob, stats);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "undefined") {
      return NextResponse.json({ text: generateMockReport(name, stats) });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 2500 }
    });

    return NextResponse.json({ text: result.response.text() });
  } catch (error) {
    console.error("AI Error:", error);
    // Nếu có lỗi (như sai Key, timeout), tự động trả về Mock Report chuẩn xác để không bị crash UI.
    if (!stats) stats = calculateNumerology(name, dob);
    return NextResponse.json({ text: generateMockReport(name, stats) });
  }
}
