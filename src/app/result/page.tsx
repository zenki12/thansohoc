"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { calculateNumerology, NumerologyAnalysis } from "@/lib/numerologyHelper";
import { ArrowLeft, Sparkles, Loader2, Star, Download, ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "";
  const dob = searchParams.get("dob") || "";

  const [stats, setStats] = useState<NumerologyAnalysis | null>(null);
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(true);

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

  if (!stats) return <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] text-gray-800"><Loader2 className="animate-spin w-8 h-8 text-amber-500" /></div>;

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-gray-800 selection:bg-amber-200 font-sans pb-20 relative">
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-amber-100/50 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center print:hidden relative z-50">
        <button onClick={() => router.push("/")} className="text-gray-500 hover:text-amber-600 flex items-center gap-2 transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" /> Trở Về Trang Chủ
        </button>
        <button onClick={() => window.print()} className="bg-amber-100 hover:bg-amber-200 text-amber-600 px-4 py-2 rounded-xl transition-colors flex items-center gap-2 font-bold shadow-sm">
          <Download className="w-4 h-4" /> Lưu PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl overflow-hidden relative shadow-2xl rounded-3xl border border-gray-100 my-4 md:my-8">
        
        {/* Header Section */}
        <header className="px-6 py-12 text-center bg-gradient-to-br from-amber-50 to-white relative border-b border-amber-100/50">
          <div className="flex justify-center mb-6 relative z-10">
             <Star className="w-12 h-12 text-amber-400 fill-amber-200 drop-shadow-sm" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-6 text-gray-800 drop-shadow-sm relative z-10">
            Bản Đồ Thần Số Học
          </h1>
          
          <div className="inline-flex flex-col items-center justify-center border border-gray-200 bg-white/60 px-10 py-5 rounded-2xl relative shadow-sm z-10 backdrop-blur-md">
            <h2 className="text-2xl font-black text-gray-800 mb-1 tracking-widest uppercase">{name}</h2>
            <p className="text-gray-500 font-bold tracking-widest text-sm uppercase">{dob}</p>
          </div>
        </header>

        {/* Core Numbers Overview */}
        <section className="px-6 py-12 bg-white relative">
           <h3 className="text-center text-xs font-bold tracking-[0.4em] text-gray-400 mb-10 uppercase after:content-[''] after:block after:w-16 after:h-[2px] after:bg-amber-200 after:mx-auto after:mt-4">
             Hệ Thống Chỉ Số Cốt Lõi
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <CoreNumberCard label="Đường Đời" value={stats.lifePath} color="from-amber-400 to-orange-500" shadowColor="shadow-amber-500/20" />
             <CoreNumberCard label="Sứ Mệnh" value={stats.destiny} color="from-rose-400 to-pink-500" shadowColor="shadow-rose-500/20" />
             <CoreNumberCard label="Linh Hồn" value={stats.soulUrge} color="from-cyan-400 to-blue-500" shadowColor="shadow-cyan-500/20" />
           </div>
             
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SmallNumberCard label="Ngày Sinh" value={stats.birthDay} />
              <SmallNumberCard label="Thái Độ" value={stats.attitude} />
              <SmallNumberCard label="Nhân Cách" value={stats.personality} />
              <SmallNumberCard label="Trưởng Thành" value={stats.maturity} />
           </div>

           {/* Personal Year, Month, Missing Numbers */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm relative overflow-hidden group">
                 <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest mb-2 z-10">Năm Cá Nhân</span>
                 <span className="text-4xl font-black text-gray-800 z-10">{stats.personalYear}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm relative overflow-hidden group">
                 <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest mb-2 z-10">Tháng Cá Nhân</span>
                 <span className="text-4xl font-black text-gray-800 z-10">{stats.personalMonth}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm relative overflow-hidden group">
                 <span className="text-[11px] font-bold text-cyan-500 uppercase tracking-widest mb-2 z-10">Chỉ Số Thiếu</span>
                 <span className="text-2xl font-black text-gray-800 mt-1 z-10 tracking-widest">{stats.missingNumbers.length > 0 ? stats.missingNumbers.join(', ') : 'Không'}</span>
              </div>
           </div>
        </section>

        {/* Charts Section */}
        <section className="px-6 py-12 bg-white">
          <div className="grid md:grid-cols-2 gap-12 md:gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-center text-sm font-bold text-gray-500 mb-8 tracking-[0.2em] uppercase">Biểu Đồ Ngày Sinh</h3>
              <GridChart chart={stats.birthChart} />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-center text-sm font-bold text-gray-500 mb-8 tracking-[0.2em] uppercase">Biểu Đồ Tên</h3>
              <GridChart chart={stats.nameChart} />
            </div>
          </div>
        </section>

        {/* Pinnacles Section */}
        <section className="px-6 py-12 bg-white relative">
          <h3 className="text-center text-xs font-bold tracking-[0.4em] text-gray-400 mb-12 uppercase after:content-[''] after:block after:w-16 after:h-[2px] after:bg-amber-200 after:mx-auto after:mt-4">
            Tháp 4 Đỉnh Cao
          </h3>
          <PinnacleSVG stats={stats} />
        </section>

        {/* Deep Analysis Text */}
        <section className="px-6 py-16 bg-white border-t border-gray-100">
          <div className="flex items-center justify-center gap-4 mb-10 relative">
            <Sparkles className="text-amber-500 w-6 h-6" />
            <h3 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-widest text-center">
              Luận Giải Chuyên Sâu
            </h3>
            <Sparkles className="text-amber-500 w-6 h-6" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-80">
              <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
              <p className="text-gray-500 font-bold tracking-widest text-sm uppercase animate-pulse">Đang kết nối tần số phân tích...</p>
            </div>
          ) : (
            <div className="prose prose-lg md:prose-xl max-w-none 
              prose-headings:text-gray-900 prose-h2:border-b-2 prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:mt-12
              prose-h3:text-amber-600 prose-h3:mt-6
              prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:font-normal
              prose-li:text-gray-700 prose-li:leading-[1.7]
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-a:text-amber-500 
              break-words relative z-10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report}
              </ReactMarkdown>
            </div>
          )}
          
          <div className="mt-20 text-center border-t border-gray-200 pt-10 pb-6 relative z-10">
             <p className="text-gray-700 text-xl md:text-2xl italic font-bold leading-relaxed px-4 drop-shadow-sm">
               "Tận nhân lực, tri thiên mệnh. Sự thành bại cốt yếu tại Tâm."
             </p>
          </div>
        </section>

        <footer className="text-center py-10 text-gray-400 text-xs tracking-widest uppercase font-medium border-t border-gray-100 bg-gray-50">
          <p>Tạo bởi Thần Số Học AI © 2026</p>
        </footer>
      </div>
      {/* Back to Top Floating Button */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_10px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_25px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all z-50 flex items-center justify-center group print:hidden"
        aria-label="Trở về đầu trang"
        title="Trở về đầu trang"
      >
        <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
      </button>
    </div>
  );
}

// ---------------- UI COMPONENTS ----------------

const CoreNumberCard = ({ label, value, color, shadowColor }: { label: string, value: number, color: string, shadowColor: string }) => (
  <div className={`relative overflow-hidden p-6 rounded-[2rem] border border-gray-100 bg-white group flex flex-col items-center justify-center text-center shadow-lg ${shadowColor} transition-transform hover:-translate-y-1`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">{label}</span>
    <span className={`text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br ${color} drop-shadow-sm`}>
      {value}
    </span>
  </div>
);

const SmallNumberCard = ({ label, value }: { label: string, value: number }) => (
  <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 text-center h-6 flex items-center">{label}</span>
    <span className="text-3xl font-black text-gray-800">{value}</span>
  </div>
);

const GridChart = ({ chart }: { chart: Record<number, number> }) => {
  const cells = [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7]
  ];

  return (
    <div className="w-[200px] h-[200px] grid grid-cols-3 grid-rows-3 gap-1 p-3 bg-gray-50 border border-gray-200 rounded-3xl shadow-sm relative">
      {cells.flat().map((num, i) => {
        const count = chart[num] || 0;
        return (
          <div key={i} className="flex items-center justify-center text-xl font-bold bg-white border border-gray-100 rounded-xl relative overflow-hidden shadow-sm">
            {count > 0 ? (
              <span className="text-amber-500 tracking-widest text-2xl z-10 font-black">
                {Array(count).fill(num).join("")}
              </span>
            ) : (
              <span className="text-gray-300 z-10 font-medium">-</span>
            )}
          </div>
        )
      })}
    </div>
  );
};

const PinnacleSVG = ({ stats }: { stats: any }) => {
  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-[4/3] md:aspect-[3/2] flex items-center justify-center">
       <svg viewBox="0 0 300 220" className="w-full h-full overflow-visible">
         <defs>
           <linearGradient id="pyrGrad" x1="0" y1="1" x2="0" y2="0">
             <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1"/>
             <stop offset="100%" stopColor="#d97706" stopOpacity="0.3"/>
           </linearGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="3" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
           </filter>
         </defs>

         {/* Base Pyramid Triangle */}
         <polygon points="150,30 270,180 30,180" fill="url(#pyrGrad)" stroke="#f59e0b" strokeWidth="2" strokeOpacity="1" />
         
         <line x1="90" y1="105" x2="210" y2="105" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.6" />
         <line x1="150" y1="30" x2="150" y2="180" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 4" />
         <line x1="150" y1="105" x2="90" y2="180" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.4" />
         <line x1="150" y1="105" x2="210" y2="180" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.4" />

         <circle cx="150" cy="30" r="16" fill="#fff" stroke="#f59e0b" strokeWidth="3" filter="url(#glow)"/>
         <text x="150" y="35" textAnchor="middle" fill="#d97706" fontSize="14" fontWeight="900">{stats.pinnacles.peak4}</text>

         <circle cx="150" cy="105" r="16" fill="#fff" stroke="#f43f5e" strokeWidth="3" filter="url(#glow)"/>
         <text x="150" y="110" textAnchor="middle" fill="#e11d48" fontSize="14" fontWeight="900">{stats.pinnacles.peak3}</text>

         <circle cx="90" cy="180" r="16" fill="#fff" stroke="#0ea5e9" strokeWidth="3" filter="url(#glow)"/>
         <text x="90" y="185" textAnchor="middle" fill="#0284c7" fontSize="14" fontWeight="900">{stats.pinnacles.peak1}</text>

         <circle cx="210" cy="180" r="16" fill="#fff" stroke="#0ea5e9" strokeWidth="3" filter="url(#glow)"/>
         <text x="210" y="185" textAnchor="middle" fill="#0284c7" fontSize="14" fontWeight="900">{stats.pinnacles.peak2}</text>
       </svg>
       
       <div className="absolute top-[0%] left-1/2 -ml-16 w-32 text-center">
         <div className="text-[10px] md:text-xs text-amber-600 font-bold tracking-widest uppercase">Đỉnh 4</div>
         <div className="text-[10px] text-gray-500 font-bold">Tuổi {stats.pinnacles.year4}</div>
       </div>
       
       <div className="absolute top-[40%] left-1/2 ml-10 w-24 text-left">
         <div className="text-[10px] md:text-xs text-rose-600 font-bold tracking-widest uppercase">Đỉnh 3</div>
         <div className="text-[10px] text-gray-500 font-bold">Tuổi {stats.pinnacles.year3}</div>
       </div>

       <div className="absolute top-[85%] left-[25%] -ml-10 w-20 text-center">
         <div className="text-[10px] md:text-xs text-sky-600 font-bold tracking-widest uppercase">Đỉnh 1</div>
         <div className="text-[10px] text-gray-500 font-bold">Tuổi {stats.pinnacles.year1}</div>
       </div>

       <div className="absolute top-[85%] right-[25%] -mr-10 w-20 text-center">
         <div className="text-[10px] md:text-xs text-sky-600 font-bold tracking-widest uppercase">Đỉnh 2</div>
         <div className="text-[10px] text-gray-500 font-bold">Tuổi {stats.pinnacles.year2}</div>
       </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] text-gray-800">
        <Loader2 className="animate-spin w-8 h-8 text-amber-500" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
