"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { calculateNumerology, NumerologyAnalysis } from "@/lib/numerologyHelper";
import { ArrowLeft, Sparkles, Loader2, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useReactToPrint } from "react-to-print";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name");
  const dob = searchParams.get("dob");

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

  if (!stats) return <div className="min-h-screen flex items-center justify-center text-white"><Loader2 className="animate-spin w-8 h-8" /></div>;

  return (
    <div className="min-h-screen pb-20 relative">
      {/* Background */}
      <div className="fixed inset-0 z-[-1] bg-black">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </button>

          <button 
            onClick={() => handlePrint()}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl transition-all font-medium shadow-lg shadow-purple-500/20 active:scale-95"
          >
            <Download className="w-4 h-4" /> Tải về / In PDF
          </button>
        </div>

        <div ref={contentRef} className="print:p-8 print:bg-[#020617] print:text-white">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Bản Đồ Thần Số Học
          </h1>
          <div className="inline-block glass-panel px-6 py-3 rounded-full">
            <p className="text-xl font-medium text-white">{name?.toUpperCase()}</p>
            <p className="text-purple-300 text-sm mt-1">{dob}</p>
          </div>
        </header>

        {/* Section 1: Core Numbers */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <NumberCard title="Đường Đời" value={stats.lifePath} highlight />
          <NumberCard title="Sứ Mệnh" value={stats.destiny} highlight />
          <NumberCard title="Linh Hồn" value={stats.soulUrge} />
          <NumberCard title="Nhân Cách" value={stats.personality} />
          <NumberCard title="Ngày Sinh" value={stats.birthDay} />
          <NumberCard title="Thái Độ" value={stats.attitude} />
          <NumberCard title="Trưởng Thành" value={stats.maturity} />
        </section>

        {/* Section 2: Charts (2 columns) */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-xl font-bold text-center mb-6 text-white tracking-wide">Biểu Đồ Ngày Sinh</h3>
            <BirthGrid chart={stats.birthChart} />
          </div>
          <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-xl font-bold text-center mb-6 text-white tracking-wide">Biểu Đồ Tên</h3>
            <BirthGrid chart={stats.nameChart} />
          </div>
        </section>

        {/* Section 3: Pinnacles */}
        <section className="glass-panel p-8 rounded-3xl mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-white tracking-wide">4 Đỉnh Cao Cuộc Đời</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <PinnacleCard stage="Đỉnh 1" year={stats.pinnacles.year1} peak={stats.pinnacles.peak1} />
            <PinnacleCard stage="Đỉnh 2" year={stats.pinnacles.year2} peak={stats.pinnacles.peak2} />
            <PinnacleCard stage="Đỉnh 3" year={stats.pinnacles.year3} peak={stats.pinnacles.peak3} />
            <PinnacleCard stage="Đỉnh 4" year={stats.pinnacles.year4} peak={stats.pinnacles.peak4} />
          </div>
        </section>

        {/* Section 4: AI Analysis */}
        <section className="glass-panel p-8 rounded-3xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <Sparkles className="text-yellow-400 w-6 h-6" />
            <h2 className="text-2xl font-bold gold-gradient-text">Luận Giải Chuyên Sâu</h2>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-70">
              <Loader2 className="w-10 h-10 text-purple-400 animate-spin mb-4" />
              <p className="text-white/80 animate-pulse">Trí tuệ nhân tạo đang phân tích bản đồ của bạn...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-p:text-white/80 prose-headings:text-white max-w-none prose-a:text-purple-400 prose-ul:text-white/80 prose-li:text-white/80 break-words print:text-black print:prose-headings:text-black">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report}
              </ReactMarkdown>
            </div>
          )}
        </section>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="animate-spin w-8 h-8 text-purple-500" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}

// Sub-components
const NumberCard = ({ title, value, highlight = false }: { title: string, value: number, highlight?: boolean }) => (
  <div className={`p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-transform hover:scale-105 ${highlight ? 'bg-gradient-to-br from-indigo-600 to-purple-800 shadow-lg shadow-purple-900/50 border border-purple-400/30' : 'glass-panel'}`}>
    {highlight && <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.svg')] opacity-20 mix-blend-overlay"></div>}
    <div className="text-white/70 text-sm font-medium mb-2 z-10">{title}</div>
    <div className={`font-bold z-10 ${highlight ? 'text-5xl text-white' : 'text-4xl text-purple-300'}`}>
      {value}
    </div>
  </div>
);

const BirthGrid = ({ chart }: { chart: Record<number, number> }) => {
  const cells = [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7]
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-[240px] mx-auto">
      {cells.flat().map((num, i) => {
        const count = chart[num] || 0;
        return (
          <div key={i} className="aspect-square flex items-center justify-center border border-white/20 rounded-xl bg-black/40 text-2xl font-bold shadow-inner">
            {count > 0 ? (
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] tracking-[0.2em] ml-[0.2em]">
                {Array(count).fill(num).join("")}
              </span>
            ) : (
              <span className="opacity-10 text-white">-</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

const PinnacleCard = ({ stage, year, peak }: { stage: string, year: number, peak: number }) => (
  <div className="glass-panel p-4 rounded-2xl flex flex-col items-center">
    <div className="text-xs text-indigo-300 font-semibold mb-1">{stage}</div>
    <div className="text-sm text-white/60 mb-3">Tuổi {year}</div>
    <div className="w-16 h-16 rounded-full bg-black/50 border-2 border-indigo-500/50 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
      <span className="text-xs text-white/50 mb-[-4px]">Số</span>
      <span className="text-2xl font-bold text-white">{peak}</span>
    </div>
  </div>
);
