import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateNumerology, generatePromptForAI } from "@/lib/numerologyHelper";

// Cho phép Vercel tự động đặt API key thông qua biến môi trường
export const maxDuration = 60; // Max duration for Vercel functions (Pro tier up to 300, Hobby up to 60s)

export async function POST(req: Request) {
  try {
    const { name, dob } = await req.json();
    if (!name || !dob) {
      return NextResponse.json({ error: "Thiếu thông tin người dùng" }, { status: 400 });
    }

    const stats = calculateNumerology(name, dob);
    const prompt = generatePromptForAI(name, dob, stats);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        text: `### ⚠️ Thiếu API Key\n\nHệ thống chưa được cấu hình biến môi trường \`GEMINI_API_KEY\`.\n\nĐể nội dung tự động sinh ra, vui lòng thêm key vào biến môi trường trên Vercel hoặc \`.env.local\`.\n\n\n*(Dưới đây là một phần mềm ảo hiển thị UI)*\n\n# Lời mở đầu\nChào mừng bạn đến với luận giải Thần số học. Năng lượng của bạn rất đặc biệt...\n\n## Đường Đời của bạn là ${stats.lifePath}\nNó thể hiện bài học về...`
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Tùy chọn cấu hình model
    const generationConfig = {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 2500,
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig
    });

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Lỗi tạo luận giải từ AI." }, { status: 500 });
  }
}
