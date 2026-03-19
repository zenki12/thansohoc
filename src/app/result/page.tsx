"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { calculateNumerology, NumerologyAnalysis } from "@/lib/numerologyHelper";
import { ArrowLeft, Sparkles, Loader2, Download, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useReactToPrint } from "react-to-print";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "";
  const dob = searchParams.get("dob") || "";

  const [stats, setStats] = useState<NumerologyAnalysis | null>(null);
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef, documentTitle: `ThanSoHoc_${name}` });

  useEffect(() => {
    if (!name || !dob) {
      router.push("/");
      return;
    }

    const calculatedStats = calculateNumerology(name, dob);
    setStats(calculatedStats);

    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dob }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.text) setReport(data.text);
        else if (data.error) setReport(`Lỗi: ${data.error}`);
      })
      .catch(() => setReport("Đã xảy ra lỗi mạng khi kết nối đến AI."))
      .finally(() => setLoading(false));

  }, [name, dob, router]);

  if (!stats) return <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white"><Loader2 className="animate-spin w-8 h-8 text-purple-500" /></div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30 font-sans pb-20">
      <div className="max-w-3xl mx-auto px-6 py-8 flex justify-between items-center print:hidden relative z-50">
        <button onClick={() => router.push("/")} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Quay lại
        </button>
        <button onClick={() => handlePrint()} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-purple-600/30 active:scale-95 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" /> Tải về PDF
        </button>
      </div>

      <div ref={contentRef} className="max-w-3xl mx-auto bg-[#020617] print:p-8 print:w-[800px] overflow-hidden relative">
        
        {/* Header Section */}
        <header className="px-6 py-12 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-center mb-4 relative">
             <Star className="w-10 h-10 text-yellow-400 fill-yellow-400/20 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-8 gold-gradient-text drop-shadow-lg relative">
            Bản Đồ Thần Số Học
          </h1>
          
          <div className="inline-flex flex-col items-center justify-center border border-white/10 bg-white/5 backdrop-blur-md px-10 py-5 rounded-3xl relative shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-widest mb-1">{name.toUpperCase()}</h2>
            <p className="text-purple-300 font-medium tracking-[0.2em]">{dob}</p>
          </div>
        </header>

        {/* Core Numbers Overview */}
        <section className="px-6 py-10 relative">
           <h3 className="text-center text-xs font-bold tracking-[0.4em] text-white/40 mb-10 uppercase after:content-[''] after:block after:w-16 after:h-[1px] after:bg-purple-500/50 after:mx-auto after:mt-4">
             Hệ Thống Chỉ Số Cốt Lõi
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <CoreNumberCard label="Đường Đời" value={stats.lifePath} color="from-yellow-400 to-orange-500" shadowColor="shadow-orange-500/20" />
             <CoreNumberCard label="Sứ Mệnh" value={stats.destiny} color="from-purple-400 to-indigo-500" shadowColor="shadow-purple-500/20" />
             <CoreNumberCard label="Linh Hồn" value={stats.soulUrge} color="from-pink-400 to-rose-500" shadowColor="shadow-pink-500/20" />
           </div>
             
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SmallNumberCard label="Ngày Sinh" value={stats.birthDay} />
              <SmallNumberCard label="Thái Độ" value={stats.attitude} />
              <SmallNumberCard label="Nhân Cách" value={stats.personality} />
              <SmallNumberCard label="Trưởng Thành" value={stats.maturity} />
           </div>
        </section>

        {/* Charts Section */}
        <section className="px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-center text-sm font-bold text-purple-300 mb-8 tracking-[0.2em] uppercase">Biểu Đồ Ngày Sinh</h3>
              <GridChart chart={stats.birthChart} />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-center text-sm font-bold text-purple-300 mb-8 tracking-[0.2em] uppercase">Biểu Đồ Tên</h3>
              <GridChart chart={stats.nameChart} />
            </div>
          </div>
        </section>

        {/* Pinnacles Section */}
        <section className="px-6 py-16 relative">
          <h3 className="text-center text-sm font-bold tracking-[0.4em] text-white/40 mb-12 uppercase after:content-[''] after:block after:w-16 after:h-[1px] after:bg-purple-500/50 after:mx-auto after:mt-4">
            Tháp 4 Đỉnh Cao
          </h3>
          <PinnacleSVG stats={stats} />
        </section>

        {/* Deep Analysis Text */}
        <section className="px-6 py-16">
          <div className="flex items-center justify-center gap-4 mb-16 relative">
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent top-1/2 -translate-y-1/2 -z-10"></div>
            <Sparkles className="text-yellow-500 w-6 h-6 bg-[#020617] px-1" />
            <h3 className="text-2xl md:text-3xl font-black gold-gradient-text uppercase tracking-widest bg-[#020617] px-4 text-center">
              Luận Giải Chuyên Sâu
            </h3>
            <Sparkles className="text-yellow-500 w-6 h-6 bg-[#020617] px-1" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 opacity-80">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin relative z-10" />
              </div>
              <p className="text-white/60 font-medium tracking-widest text-sm uppercase animate-pulse">Trí tuệ nhân tạo đang kết nối tần số...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
              prose-headings:text-purple-300 prose-h2:border-b-2 prose-h2:border-purple-500/30 prose-h2:pb-4 prose-h2:mt-16
              prose-h3:text-sky-300 prose-h3:mt-8
              prose-p:text-white/80 prose-p:leading-[1.8] prose-p:font-light
              prose-li:text-white/80 prose-li:leading-[1.7]
              prose-strong:text-white prose-strong:font-bold
              prose-a:text-purple-400 
              break-words relative z-10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report}
              </ReactMarkdown>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center py-12 text-white/20 text-xs tracking-widest uppercase font-medium border-t border-white/5">
          <p>Tạo bởi Công cụ Thần Số Học AI © 2026</p>
        </footer>
      </div>
    </div>
  );
}

// ---------------- UI COMPONENTS ----------------

const CoreNumberCard = ({ label, value, color, shadowColor }: { label: string, value: number, color: string, shadowColor: string }) => (
  <div className={`relative overflow-hidden p-6 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl group flex flex-col items-center justify-center text-center shadow-2xl ${shadowColor} transition-all hover:-translate-y-1 hover:border-white/20`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500`}></div>
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">{label}</span>
    <span className={`text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br ${color} drop-shadow-sm`}>
      {value}
    </span>
  </div>
);

const SmallNumberCard = ({ label, value }: { label: string, value: number }) => (
  <div className="flex flex-col items-center p-4 rounded-2xl bg-[#0f172a]/50 border border-white/5 shadow-inner backdrop-blur-md">
    <span className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.1em] mb-2 text-center h-6 flex items-center">{label}</span>
    <span className="text-3xl font-bold text-white/90 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{value}</span>
  </div>
);

const GridChart = ({ chart }: { chart: Record<number, number> }) => {
  const cells = [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7]
  ];

  return (
    <div className="w-[200px] h-[200px] grid grid-cols-3 grid-rows-3 gap-1 p-3 bg-[#1e1b4b]/30 rounded-3xl border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.05)] backdrop-blur-xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl pointer-events-none"></div>
      {cells.flat().map((num, i) => {
        const count = chart[num] || 0;
        return (
          <div key={i} className="flex items-center justify-center text-xl font-bold bg-[#020617]/60 rounded-xl relative overflow-hidden">
            {count > 0 ? (
              <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] tracking-widest text-2xl z-10">
                {Array(count).fill(num).join("")}
              </span>
            ) : (
              <span className="text-white/5 z-10">-</span>
            )}
            {/* Subtle glow for filled cells */}
            {count > 0 && <div className="absolute inset-0 bg-purple-500/20 blur-md"></div>}
          </div>
        )
      })}
    </div>
  );
};

const PinnacleSVG = ({ stats }: { stats: any }) => {
  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-[4/3] md:aspect-[3/2] flex items-center justify-center">
       <svg viewBox="0 0 300 220" className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.2)] overflow-visible">
         <defs>
           <linearGradient id="pyrGrad" x1="0" y1="1" x2="0" y2="0">
             <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.05"/>
             <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4"/>
           </linearGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="3" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
           </filter>
         </defs>

         {/* Base Pyramid Triangle */}
         <polygon points="150,30 270,180 30,180" fill="url(#pyrGrad)" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.5" />
         
         {/* Inner skeletal lines */}
         <line x1="90" y1="105" x2="210" y2="105" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.4" />
         <line x1="150" y1="30" x2="150" y2="180" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 4" />
         <line x1="150" y1="105" x2="90" y2="180" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.2" />
         <line x1="150" y1="105" x2="210" y2="180" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.2" />

         {/* Peak 4 (Top) */}
         <circle cx="150" cy="30" r="16" fill="#020617" stroke="#fbbf24" strokeWidth="2" filter="url(#glow)"/>
         <text x="150" y="35" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">{stats.pinnacles.peak4}</text>

         {/* Peak 3 (Center) */}
         <circle cx="150" cy="105" r="16" fill="#020617" stroke="#f472b6" strokeWidth="2" filter="url(#glow)"/>
         <text x="150" y="110" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">{stats.pinnacles.peak3}</text>

         {/* Peak 1 (Left) */}
         <circle cx="90" cy="180" r="16" fill="#020617" stroke="#38bdf8" strokeWidth="2" filter="url(#glow)"/>
         <text x="90" y="185" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">{stats.pinnacles.peak1}</text>

         {/* Peak 2 (Right) */}
         <circle cx="210" cy="180" r="16" fill="#020617" stroke="#38bdf8" strokeWidth="2" filter="url(#glow)"/>
         <text x="210" y="185" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">{stats.pinnacles.peak2}</text>

       </svg>
       
       {/* Labels positioned via absolute CSS relative to the container */}
       <div className="absolute top-[0%] left-1/2 -ml-16 w-32 text-center">
         <div className="text-[10px] md:text-xs text-yellow-400 font-bold tracking-widest uppercase">Đỉnh 4</div>
         <div className="text-[10px] text-white/40">Tuổi {stats.pinnacles.year4}</div>
       </div>
       
       <div className="absolute top-[40%] left-1/2 ml-10 w-24 text-left">
         <div className="text-[10px] md:text-xs text-pink-400 font-bold tracking-widest uppercase">Đỉnh 3</div>
         <div className="text-[10px] text-white/40">Tuổi {stats.pinnacles.year3}</div>
       </div>

       <div className="absolute top-[85%] left-[25%] -ml-10 w-20 text-center">
         <div className="text-[10px] md:text-xs text-sky-400 font-bold tracking-widest uppercase">Đỉnh 1</div>
         <div className="text-[10px] text-white/40">Tuổi {stats.pinnacles.year1}</div>
       </div>

       <div className="absolute top-[85%] right-[25%] -mr-10 w-20 text-center">
         <div className="text-[10px] md:text-xs text-sky-400 font-bold tracking-widest uppercase">Đỉnh 2</div>
         <div className="text-[10px] text-white/40">Tuổi {stats.pinnacles.year2}</div>
       </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <Loader2 className="animate-spin w-8 h-8 text-purple-500" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
