import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "undefined") {
      return NextResponse.json({ text: generateMatrixMockReport(name, stats) });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Increased maxOutputTokens to ensure deep analysis fits
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, topP: 0.9, maxOutputTokens: 3500 }
    });

    return NextResponse.json({ text: result.response.text() });
  } catch (error) {
    console.error("AI Error:", error);
    if (!stats) stats = calculateMatrixDestiny(name, dob);
    return NextResponse.json({ text: generateMatrixMockReport(name, stats) });
  }
}
