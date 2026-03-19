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
      return NextResponse.json({ text: generateMatrixMockReport(name, stats) });
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
      throw new Error(`Groq API Error: ${response.status}`);
    }

    const result = await response.json();
    const responseText = result.choices?.[0]?.message?.content;

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("AI Error:", error);
    if (!stats) stats = calculateMatrixDestiny(name, dob);
    return NextResponse.json({ text: generateMatrixMockReport(name, stats) });
  }
}
