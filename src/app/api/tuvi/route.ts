import { NextResponse } from "next/server";
import { generateTuViMock } from "@/lib/tuviHelper";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

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

    let finalResponseText = "";

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
      ];
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", safetySettings });
      const result = await model.generateContent(prompt);
      finalResponseText = result.response.text();
    } catch (geminiError: any) {
      console.warn("Gemini failed (TuVi), falling back to Groq...", geminiError?.message);

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey || apiKey === "undefined") {
        throw new Error("Không có API Key của cả Gemini và Groq");
      }

      // Giới hạn siêu ngặt nghèo của Groq free tier là 6000 TPM. 
      // Do đó, nếu rớt đài xuống Groq, ta phải cắt bỏ hoàn toàn file tuviKnowledge.json khổng lồ ra khỏi prompt để cứu vãn.
      let groqPrompt = prompt;
      if (prompt.length > 5000) {
         groqPrompt = `Tưởng tượng bạn là một chuyên gia tử vi lão làng. Dựa vào thông tin khách hàng: Tên ${name}, sinh ngày ${dob} lúc ${time}, giới tính ${gender}. Hãy tự mình luận giải thật chi tiết 12 cung tử vi, không cần đọc sách bí kíp nữa vì hệ thống đang quá tải. Hãy viết khoảng 2000 từ phân tích các cung: Bản Mệnh, Phu Thê, Tài Bạch, Quan Lộc, Phụ Mẫu, vv.`;
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: groqPrompt }],
          temperature: 0.7,
          max_tokens: 2500 // 2500 + prompt tokens <= 6000 TPM
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
    console.error("AI Error in TuVi:", error);
    // Trả về kèm LỖI THỰC TẾ để dễ debug cộng theo mock report để dự phòng
    return NextResponse.json({ text: `**[HỆ THỐNG GHI NHẬN LỖI TỪ AI:** ${error?.message || "Lỗi không xác định"}]**\n\n*(Dưới đây là phần luận giải cơ bản dự phòng)*\n\n${generateTuViMock(inputData)}` });
  }
}
