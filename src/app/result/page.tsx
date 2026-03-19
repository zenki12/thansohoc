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
  const handlePrint = useReactToPrint({ contentRef });

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
    <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30">
      {/* Top Navbar */}
      <div className="max-w-3xl mx-auto px-6 py-8 flex justify-between items-center print:hidden">
        <button onClick={() => router.push("/")} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Quay lại
        </button>
        <button onClick={() => handlePrint()} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-full font-medium shadow-lg shadow-purple-600/20 active:scale-95 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" /> Tải về PDF
        </button>
      </div>

      <div ref={contentRef} className="max-w-3xl mx-auto bg-[#020617] print:p-8 print:w-[800px] overflow-hidden">
        
        {/* Header Section */}
        <header className="px-6 py-10 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="flex justify-center mb-6 relative">
             <Star className="w-8 h-8 text-yellow-500 fill-yellow-500/20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest mb-6 gold-gradient-text drop-shadow-sm relative">
            Bản Đồ Thần Số Học
          </h1>
          <div className="inline-block border border-purple-500/30 bg-purple-900/10 px-8 py-4 rounded-2xl backdrop-blur-sm relative">
            <h2 className="text-2xl font-bold text-white tracking-wide">{name.toUpperCase()}</h2>
            <p className="text-purple-300 mt-1 font-medium tracking-widest">{dob}</p>
          </div>
        </header>

        {/* Core Numbers Overview (Flowing style, not boxes) */}
        <section className="px-6 py-10 border-t border-b border-white/5 relative">
           <h3 className="text-center text-sm font-semibold tracking-[0.3em] text-white/40 mb-10 uppercase">Hệ Thống Chỉ Số Cốt Lõi</h3>
           
           <div className="space-y-6">
             <CoreNumberRow label="Đường Đời" value={stats.lifePath} isPrimary />
             <CoreNumberRow label="Sứ Mệnh" value={stats.destiny} isPrimary />
             <CoreNumberRow label="Linh Hồn" value={stats.soulUrge} isPrimary />
             
             <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <SmallNumberCard label="Ngày Sinh" value={stats.birthDay} />
                <SmallNumberCard label="Thái Độ" value={stats.attitude} />
                <SmallNumberCard label="Nhân Cách" value={stats.personality} />
                <SmallNumberCard label="Trưởng Thành" value={stats.maturity} />
             </div>
           </div>
        </section>

        {/* Charts Section */}
        <section className="px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-center text-lg font-bold text-purple-300 mb-8 tracking-widest uppercase">Biểu Đồ Ngày Sinh</h3>
              <GridChart chart={stats.birthChart} />
            </div>
            <div>
              <h3 className="text-center text-lg font-bold text-purple-300 mb-8 tracking-widest uppercase">Biểu Đồ Tên</h3>
              <GridChart chart={stats.nameChart} />
            </div>
          </div>
        </section>

        {/* Pinnacles Section */}
        <section className="px-6 py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>
          <h3 className="text-center text-lg font-bold text-purple-300 mb-10 tracking-widest uppercase relative z-10">Tháp 4 Đỉnh Cao</h3>
          <div className="flex justify-center items-end gap-2 md:gap-6 h-40 relative z-10">
            <PyramidPeak stage="Đỉnh 1" year={stats.pinnacles.year1} peak={stats.pinnacles.peak1} h="h-24" />
            <PyramidPeak stage="Đỉnh 2" year={stats.pinnacles.year2} peak={stats.pinnacles.peak2} h="h-32" />
            <PyramidPeak stage="Đỉnh 3" year={stats.pinnacles.year3} peak={stats.pinnacles.peak3} h="h-40" />
            <PyramidPeak stage="Đỉnh 4" year={stats.pinnacles.year4} peak={stats.pinnacles.peak4} h="h-32" />
          </div>
        </section>

        {/* Deep Analysis Text */}
        <section className="px-6 py-16">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Sparkles className="text-yellow-500 w-6 h-6" />
            <h3 className="text-2xl md:text-3xl font-bold gold-gradient-text uppercase tracking-wider text-center">Luận Giải Chuyên Sâu</h3>
            <Sparkles className="text-yellow-500 w-6 h-6" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-70">
              <Loader2 className="w-10 h-10 text-purple-400 animate-spin mb-4" />
              <p className="text-white/60 font-medium tracking-wide">Trí tuệ nhân tạo đang kết nối tần số của bạn...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-purple-300 prose-h2:border-b prose-h2:border-purple-500/20 prose-h2:pb-3 prose-p:text-white/80 prose-li:text-white/80 prose-strong:text-white prose-a:text-purple-400 break-words print:text-black print:prose-headings:text-black print:prose-p:text-black print:prose-strong:text-black relative z-10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report}
              </ReactMarkdown>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center py-10 text-white/30 text-sm border-t border-white/5">
          <p>Tạo bởi Công cụ Thần Số Học AI © 2026</p>
        </footer>
      </div>
    </div>
  );
}

// Custom specialized components matching the original image's smooth vibe

const CoreNumberRow = ({ label, value, isPrimary }: { label: string, value: number, isPrimary?: boolean }) => (
  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
    <div className="flex items-center gap-4">
      <div className="w-2 h-8 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <span className="text-lg md:text-xl font-medium text-white/90">{label}</span>
    </div>
    <div className="text-3xl md:text-5xl font-bold gold-gradient-text drop-shadow-md">
      {value}
    </div>
  </div>
);

const SmallNumberCard = ({ label, value }: { label: string, value: number }) => (
  <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5">
    <span className="text-xs text-white/50 uppercase tracking-wider mb-2">{label}</span>
    <span className="text-2xl font-bold text-white">{value}</span>
  </div>
);

const GridChart = ({ chart }: { chart: Record<number, number> }) => {
  // 3x3 array layout from bottom-left to top-right
  const cells = [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7]
  ];

  return (
    <div className="w-[200px] h-[200px] mx-auto relative">
      {/* Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
        <div className="border-r border-b border-purple-500/30"></div>
        <div className="border-r border-b border-purple-500/30"></div>
        <div className="border-b border-purple-500/30"></div>
        <div className="border-r border-b border-purple-500/30"></div>
        <div className="border-r border-b border-purple-500/30"></div>
        <div className="border-b border-purple-500/30"></div>
        <div className="border-r border-purple-500/30"></div>
        <div className="border-r border-purple-500/30"></div>
        <div className=""></div>
      </div>
      
      {/* Numbers */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        {cells.flat().map((num, i) => {
          const count = chart[num] || 0;
          return (
            <div key={i} className="flex items-center justify-center text-xl font-bold relative z-10">
              {count > 0 ? (
                <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-widest bg-black/50 w-full h-full flex items-center justify-center rounded-lg">
                  {Array(count).fill(num).join("")}
                </span>
              ) : (
                <span className="text-white/10 w-full h-full flex items-center justify-center">-</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

const PyramidPeak = ({ stage, year, peak, h }: { stage: string, year: number, peak: number, h: string }) => (
  <div className={`relative flex flex-col items-center justify-end w-20 md:w-28 ${h} border-b border-purple-500/50`}>
    <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-purple-500/20 to-transparent -z-10 rounded-t-xl" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
    
    <div className="absolute -top-6 text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">{peak}</div>
    <div className="mb-2 text-[10px] sm:text-xs text-purple-300 font-medium uppercase tracking-widest">{stage}</div>
    <div className="text-[10px] text-white/50 mb-1">Tuổi {year}</div>
  </div>
);

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
