"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Compass, Sun, Moon } from "lucide-react";
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
        
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error("Lỗi gọi API Gemini");
        }

        const data = await response.json();
        setReport(data.text);
      } catch (error) {
        console.error("Lỗi phân tích Tử Vi:", error);
        setReport(generateTuViMock(inputData));
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [name, dob, time, gender, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
        {/* Tu vi theme animation: Amber / Red / Gold */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-orange-900/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-red-900/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex flex-col items-center">
           <div className="w-24 h-24 mb-8 relative flex items-center justify-center" style={{ animation: "spin 5s linear infinite" }}>
              <div className="absolute inset-0 border-4 border-amber-500/30 rounded-full border-t-amber-500"></div>
              <Compass className="w-8 h-8 text-amber-400 rotate-45" />
           </div>
           
           <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-orange-500 mb-4 tracking-widest uppercase text-center shadow-black drop-shadow-lg">
             Đang Lập Lá Số...
           </h2>
           <p className="text-amber-200/60 font-medium text-center">Xin chờ, các tinh tú đang dịch cung hoán số...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 pb-24 relative font-sans">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-amber-900/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-red-900/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6 relative z-20 flex justify-between items-center">
        <button onClick={() => router.push("/")} className="text-white/60 hover:text-amber-400 flex items-center gap-2 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Trở Về
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-[#050505]/40 backdrop-blur-sm overflow-hidden relative border border-white/5 rounded-3xl">
        
        <header className="px-6 py-12 text-center relative border-b border-white/5 bg-gradient-to-b from-amber-900/10 to-transparent">
          <div className="flex justify-center mb-10">
            {/* SVG Bát Quái Mockup */}
            <div className="relative w-48 h-48 md:w-56 md:h-56">
                <div className="absolute inset-0 bg-yellow-600/20 rounded-full filter blur-xl animate-pulse"></div>
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(217,119,6,0.3)]" style={{ animation: "spin 20s linear infinite" }}>
                    <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" strokeDasharray="4 6" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(251, 191, 36, 0.6)" strokeWidth="2" />
                    <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(251, 191, 36, 0.8)" strokeWidth="1" />
                    <circle cx="100" cy="100" r="35" fill="none" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" />
                    
                    {/* Bát Quái Lines */}
                    <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" />
                    <line x1="43" y1="43" x2="157" y2="157" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" />
                    <line x1="43" y1="157" x2="157" y2="43" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" />
                    
                    {/* Yin Yang Center */}
                    <circle cx="100" cy="100" r="25" fill="#1e1e1e" />
                    <path d="M 100 75 A 25 25 0 0 1 100 125 A 12.5 12.5 0 0 0 100 75 Z" fill="#fbbf24" />
                    <path d="M 100 75 A 12.5 12.5 0 0 1 100 125 A 25 25 0 0 0 100 75 Z" fill="#1e1e1e" />
                    <circle cx="100" cy="87.5" r="3" fill="#1e1e1e" />
                    <circle cx="100" cy="112.5" r="3" fill="#fbbf24" />
                </svg>
            </div>
          </div>

          <p className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 flex items-center justify-center gap-2">
            <Sun className="w-4 h-4" /> BÌNH GIẢI CHÂN MỆNH <Moon className="w-4 h-4" />
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-8 uppercase text-white drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] tracking-widest">
            LÁ SỐ TỬ VI
          </h1>
          
          <div className="inline-block bg-[#0f0f0f] border border-amber-500/20 px-8 py-5 rounded-2xl shadow-xl shadow-black/50">
            <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 mb-3 uppercase tracking-widest leading-relaxed">
              {name}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-amber-100/60 uppercase tracking-widest">
               <span className="bg-white/5 py-1 px-3 rounded-full">{dob}</span>
               <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></span>
               <span className="bg-white/5 py-1 px-3 rounded-full">{time}</span>
               <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></span>
               <span className="bg-white/5 py-1 px-3 rounded-full text-amber-400">{gender === 'nam' ? 'Nam Mạng' : 'Nữ Mạng'}</span>
            </div>
          </div>
        </header>

        <section className="px-6 sm:px-10 py-12 relative z-10 w-full min-h-[500px]">
            <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
              prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-amber-300 prose-headings:to-orange-500
              prose-h2:text-3xl prose-h2:font-black prose-h2:mt-14 prose-h2:mb-6 prose-h2:border-b prose-h2:border-amber-500/20 prose-h2:pb-4 prose-h2:uppercase prose-h2:tracking-wider
              prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-amber-200
              prose-p:text-amber-50/80 prose-p:leading-relaxed prose-p:mb-6
              prose-li:text-amber-50/80 prose-li:leading-[1.8]
              prose-strong:text-amber-200 prose-strong:font-extrabold
              prose-a:text-orange-400 
              break-words relative z-10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report}
              </ReactMarkdown>
            </div>
            
            <div className="mt-20 text-center border-t border-amber-500/20 pt-10 pb-6">
               <p className="text-amber-500/40 text-xs tracking-[0.3em] font-medium uppercase italic">
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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    }>
      <TuViResultContent />
    </Suspense>
  );
}
