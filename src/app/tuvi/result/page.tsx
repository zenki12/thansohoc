"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Compass, Sun, Moon, Loader2, Download, Sparkles, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateTuViAIPrompt, generateTuViMock, TuViInput } from "@/lib/tuviHelper";

function TuViResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const name = searchParams.get("name") || "";
  const dob = searchParams.get("dob") || "";
  const time = searchParams.get("time") || "";
  const gender = searchParams.get("gender") || "nam";

  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name || !dob || !time) {
      router.push("/");
      return;
    }

    const inputData: TuViInput = { name, dob, time, gender };

    const fetchAnalysis = async () => {
      try {
        const prompt = generateTuViAIPrompt(inputData);
        
        const response = await fetch("/api/tuvi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, name, dob, time, gender }),
        });

        if (!response.ok) {
          throw new Error("Lỗi gọi API");
        }

        const data = await response.json();
        setReport(data.text);
      } catch (error: any) {
        console.error("Lỗi phân tích Tử Vi:", error);
        setReport(`**[LỖI MẠNG / TIMEOUT TỪ TRÌNH DUYỆT]:** ${error.message || "Lỗi không xác định"}\nCó thể yêu cầu phản hồi quá dài khiến trình duyệt chặn hoặc vượt quá thời gian chờ (Timeout) của Vercel/NextJS.\n\n*(Dưới đây là phần luận giải cơ bản dự phòng)*\n\n${generateTuViMock(inputData)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [name, dob, time, gender, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-gray-800 relative overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-orange-300/30 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-rose-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex flex-col items-center">
           <div className="w-24 h-24 mb-8 relative flex items-center justify-center" style={{ animation: "spin 5s linear infinite" }}>
              <div className="absolute inset-0 border-4 border-orange-200 rounded-full border-t-orange-500"></div>
              <Compass className="w-8 h-8 text-orange-500 rotate-45" />
           </div>
           
           <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500 mb-4 tracking-widest uppercase text-center drop-shadow-sm">
             Đang Lập Lá Số...
           </h2>
           <p className="text-gray-500 font-medium text-center">Xin chờ, các tinh tú đang dịch cung hoán số...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-800 selection:bg-orange-200/80 pb-24 relative font-sans">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-orange-100/50 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-rose-50/50 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 relative z-20 flex justify-between items-center print:hidden">
        <button onClick={() => router.push("/")} className="text-gray-500 hover:text-orange-500 flex items-center gap-2 transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" /> Trở Về Trang Chủ
        </button>
        <button onClick={() => window.print()} className="bg-orange-100 hover:bg-orange-200 text-orange-600 px-4 py-2 rounded-xl transition-colors flex items-center gap-2 font-bold shadow-sm">
          <Download className="w-4 h-4" /> Lưu PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl overflow-hidden relative shadow-2xl rounded-3xl border border-gray-100 my-4 md:my-8">
        
        <header className="px-6 py-12 text-center bg-gradient-to-br from-orange-50/50 to-white relative border-b border-orange-100/50">
          <div className="flex justify-center mb-6 relative z-10">
             <Star className="w-12 h-12 text-orange-400 fill-orange-200 drop-shadow-sm" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-6 text-gray-800 drop-shadow-sm relative z-10">
            Lá Số Tử Vi
          </h1>
          
          <div className="inline-flex flex-col items-center justify-center border border-gray-200 bg-white/60 px-10 py-5 rounded-2xl relative shadow-sm z-10 backdrop-blur-md">
            <h2 className="text-2xl font-black text-gray-800 mb-1 tracking-widest uppercase">{name}</h2>
            <p className="text-gray-500 font-bold tracking-widest text-sm uppercase">
              {gender === 'nam' ? 'Nam Mạng' : 'Nữ Mạng'} • {dob} {time ? `• ${time}` : ''}
            </p>
          </div>
        </header>

        <section className="px-6 md:px-12 py-16 bg-white relative">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Sparkles className="text-orange-400 w-5 h-5" />
            <h3 className="text-xl font-bold text-gray-800 uppercase tracking-widest text-center">
              Cẩm Nang Mệnh Lý
            </h3>
            <Sparkles className="text-orange-400 w-5 h-5" />
          </div>
          
          <div className="prose prose-lg md:prose-xl max-w-none 
            prose-headings:text-gray-900 prose-h2:border-b-2 prose-h2:border-orange-200 prose-h2:pb-3 prose-h2:mt-12
            prose-h3:text-orange-600 prose-h3:mt-6
            prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:font-normal
            prose-li:text-gray-700 prose-li:leading-[1.7]
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-a:text-orange-500 
            break-words">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {report}
            </ReactMarkdown>
          </div>
          
          <div className="mt-20 text-center border-t border-gray-100 pt-10 pb-6">
             <p className="text-gray-400 text-xs tracking-[0.3em] font-bold uppercase italic">
               "Tận nhân lực, tri thiên mệnh. Sự thành bại cốt yếu tại Tâm."
             </p>
          </div>
        </section>

      </div>
    </main>
  );
}

export default function TuViResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center">
         <Loader2 className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    }>
      <TuViResultContent />
    </Suspense>
  );
}
