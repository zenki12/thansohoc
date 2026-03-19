"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { calculateMatrixDestiny, MatrixDestinyStats } from "@/lib/matrixHelper";
import { ArrowLeft, Sparkles, Loader2, Star, Hexagon, Compass, Moon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MatrixResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "";
  const dob = searchParams.get("dob") || "";

  const [stats, setStats] = useState<MatrixDestinyStats | null>(null);
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name || !dob) {
      router.push("/");
      return;
    }

    const calculatedStats = calculateMatrixDestiny(name, dob);
    setStats(calculatedStats);

    fetch("/api/matrix", {
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

  if (!stats) return <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white"><Loader2 className="animate-spin w-8 h-8 text-emerald-500" /></div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30 font-sans pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center print:hidden relative z-50">
        <button onClick={() => router.push("/")} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Quay lại
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-[#020617] overflow-hidden relative">
        
        {/* Header Section */}
        <header className="px-6 py-12 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[400px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-center mb-4 relative">
             <Star className="w-10 h-10 text-teal-400 fill-teal-400/20 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)] animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-500 drop-shadow-lg relative">
            Ma Trận Định Mệnh
          </h1>
          
          <div className="inline-flex flex-col items-center justify-center border border-white/10 bg-white/5 backdrop-blur-md px-10 py-5 rounded-3xl relative shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-widest mb-1">{name.toUpperCase()}</h2>
            <p className="text-emerald-300 font-medium tracking-[0.2em]">{dob}</p>
          </div>
        </header>

        {/* Matrix Visualization */}
        <section className="px-6 py-16 relative">
           <h3 className="text-center text-xs font-bold tracking-[0.4em] text-white/40 mb-16 uppercase after:content-[''] after:block after:w-16 after:h-[1px] after:bg-emerald-500/50 after:mx-auto after:mt-4">
             Bản Đồ Năng Lượng
           </h3>
           
           <div className="relative w-full max-w-[600px] mx-auto aspect-square flex items-center justify-center">
             
             {/* Background Magic Circle */}
             <div className="absolute inset-4 border-[1px] border-emerald-500/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
             <div className="absolute inset-16 border-[1px] border-teal-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
             <div className="absolute inset-32 border-[1px] border-cyan-500/30 rounded-full border-dashed animate-[spin_30s_linear_infinite]"></div>
             
             {/* Cross connecting lines */}
             <div className="absolute top-12 bottom-12 left-1/2 w-[1px] bg-gradient-to-b from-teal-500/0 via-teal-500/50 to-teal-500/0"></div>
             <div className="absolute left-12 right-12 top-1/2 h-[1px] bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0"></div>

             {/* Top Point */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <MatrixNode label="Thiên Phú" value={stats.top} color="emerald" detail="Tháng Sinh" />
             </div>

             {/* Bottom Point */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                <MatrixNode label="Nghiệp Quả" value={stats.bottom} color="rose" detail="Karma" />
             </div>

             {/* Left Point */}
             <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2">
                <MatrixNode label="Mặt Nạ" value={stats.left} color="cyan" detail="Ngày Sinh" />
             </div>

             {/* Right Point */}
             <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2">
                <MatrixNode label="Khát Vọng" value={stats.right} color="amber" detail="Tổng Năm" />
             </div>

             {/* Center Point */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-4 bg-emerald-500/30 blur-2xl rounded-full group-hover:bg-emerald-400/50 transition-all duration-500"></div>
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-emerald-900 via-[#020617] to-teal-900 border-2 border-emerald-400/50 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] backdrop-blur-xl relative z-20">
                    <span className="text-[10px] md:text-xs text-emerald-300/70 font-bold uppercase tracking-[0.2em] mb-1">Tâm Hồn</span>
                    <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-teal-600 drop-shadow-lg">{stats.center}</span>
                    <span className="text-[8px] md:text-[10px] text-white/40 uppercase tracking-widest mt-2">{stats.purpose} Mục Đích</span>
                  </div>
                </div>
             </div>
           </div>

           {/* Additional lines info */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto">
             <InfoCard title="Đuôi Nghiệp Quả" value={stats.karmicTail} icon={<Moon className="w-5 h-5 text-rose-400" />} color="rose" />
             <InfoCard title="Đường Tài Chính" value={stats.moneyLine} icon={<Hexagon className="w-5 h-5 text-amber-400" />} color="amber" />
             <InfoCard title="Đường Tình Yêu" value={stats.loveLine} icon={<Compass className="w-5 h-5 text-pink-400" />} color="pink" />
           </div>

        </section>

        {/* Deep Analysis Text */}
        <section className="px-6 py-16">
          <div className="flex items-center justify-center gap-4 mb-16 relative">
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent top-1/2 -translate-y-1/2 -z-10"></div>
            <Sparkles className="text-teal-400 w-6 h-6 bg-[#020617] px-1" />
            <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-500 uppercase tracking-widest bg-[#020617] px-4 text-center">
              Thông Điệp Từ Vũ Trụ
            </h3>
            <Sparkles className="text-teal-400 w-6 h-6 bg-[#020617] px-1" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 opacity-80">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                <Loader2 className="w-12 h-12 text-emerald-400 animate-spin relative z-10" />
              </div>
              <p className="text-emerald-400/80 font-medium tracking-widest text-sm uppercase animate-pulse">Đang giải mã ma trận...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
              prose-headings:text-emerald-300 prose-h2:border-b-2 prose-h2:border-emerald-500/30 prose-h2:pb-4 prose-h2:mt-16
              prose-h3:text-teal-300 prose-h3:mt-8
              prose-p:text-white/80 prose-p:leading-[1.8] prose-p:font-light
              prose-li:text-white/80 prose-li:leading-[1.7]
              prose-strong:text-white prose-strong:font-bold
              prose-a:text-teal-400 
              break-words relative z-10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report}
              </ReactMarkdown>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center py-12 text-emerald-500/30 text-xs tracking-widest uppercase font-medium border-t border-white/5">
          <p>Tạo bởi Công cụ Ma Trận Định Mệnh AI © 2026</p>
        </footer>
      </div>
    </div>
  );
}

// ---------------- UI COMPONENTS ----------------

const MatrixNode = ({ label, value, color, detail }: { label: string, value: number, color: 'emerald'|'rose'|'cyan'|'amber', detail: string }) => {
  const colorMap = {
    emerald: 'from-emerald-400 to-teal-500 shadow-emerald-500/20 text-emerald-300 border-emerald-500/30',
    rose: 'from-rose-400 to-pink-500 shadow-rose-500/20 text-rose-300 border-rose-500/30',
    cyan: 'from-cyan-400 to-blue-500 shadow-cyan-500/20 text-cyan-300 border-cyan-500/30',
    amber: 'from-amber-400 to-orange-500 shadow-amber-500/20 text-amber-300 border-amber-500/30',
  };

  const bgGradient = colorMap[color].split(' ')[0] + ' ' + colorMap[color].split(' ')[1];
  const shadow = colorMap[color].split(' ')[2];
  const textColor = colorMap[color].split(' ')[3];
  const border = colorMap[color].split(' ')[4];

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 w-24 h-24 md:w-32 md:h-32 rounded-full border ${border} bg-[#020617]/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] group hover:scale-105 transition-transform cursor-default z-20`}>
      <div className={`absolute inset-0 bg-gradient-to-b ${bgGradient} opacity-10 rounded-full group-hover:opacity-20 transition-opacity`}></div>
      <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${textColor} mb-1 text-center leading-tight`}>{label}</span>
      <span className="text-2xl md:text-3xl font-black text-white drop-shadow-md">{value}</span>
      <span className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2">{detail}</span>
    </div>
  );
};

const InfoCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => {
  const colorStyles: Record<string, string> = {
    rose: 'border-rose-500/20 hover:border-rose-500/40 via-rose-900/10',
    amber: 'border-amber-500/20 hover:border-amber-500/40 via-amber-900/10',
    pink: 'border-pink-500/20 hover:border-pink-500/40 via-pink-900/10',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-white/5 ${colorStyles[color]} to-[#020617] border backdrop-blur-md shadow-lg transition-all`}>
      <div className="mb-3 p-3 rounded-full bg-white/5 border border-white/10">{icon}</div>
      <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">{title}</span>
      <span className="text-xl md:text-2xl font-black text-white tracking-widest drop-shadow-md">{value}</span>
    </div>
  );
};

export default function MatrixResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <Loader2 className="animate-spin w-8 h-8 text-emerald-500" />
      </div>
    }>
      <MatrixResultContent />
    </Suspense>
  );
}
