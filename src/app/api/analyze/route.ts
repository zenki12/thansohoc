import { NextResponse } from "next/server";
import { calculateNumerology, generatePromptForAI } from "@/lib/numerologyHelper";
import { generateMockReport } from "@/lib/mockData";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

    let finalResponseText = "";

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      finalResponseText = result.response.text();
    } catch (geminiError: any) {
      console.warn("Gemini failed (Numerology), falling back to Groq...", geminiError?.message);

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey || apiKey === "undefined") {
        throw new Error("Không có API Key của cả Gemini và Groq");
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 3000
        })
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Groq API Error: ${response.status} - ${errBody}`);
      }

      const result = await response.json();
      finalResponseText = result.choices?.[0]?.message?.content || "";
    }

    if (!finalResponseText) {
      throw new Error("AI returned empty response");
    }

    return NextResponse.json({ text: finalResponseText });
  } catch (error: any) {
    console.error("AI Error:", error);
    if (!stats) stats = calculateNumerology(name, dob);
    return NextResponse.json({ text: `**[HỆ THỐNG GHI NHẬN LỖI TỪ AI:** ${error?.message || "Lỗi không xác định"}]**\n\n*(Dưới đây là phần luận giải cơ bản dự phòng)*\n\n${generateMockReport(name, stats)}` });
  }
}
