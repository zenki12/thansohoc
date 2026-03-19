"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { calculateMatrixDestiny, MatrixDestinyStats } from "@/lib/matrixHelper";
import { ArrowLeft, Sparkles, Loader2, Star, Hexagon, Compass, Moon, Download, ArrowUp } from "lucide-react";
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

  if (!stats) return <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] text-gray-800"><Loader2 className="animate-spin w-8 h-8 text-cyan-500" /></div>;

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-gray-800 selection:bg-cyan-200 font-sans pb-20 relative">
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-cyan-100/50 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center print:hidden relative z-50">
        <button onClick={() => router.push("/")} className="text-gray-500 hover:text-cyan-600 flex items-center gap-2 transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" /> Trở Về Trang Chủ
        </button>
        <button onClick={() => window.print()} className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 px-4 py-2 rounded-xl transition-colors flex items-center gap-2 font-bold shadow-sm">
          <Download className="w-4 h-4" /> Lưu PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl overflow-hidden relative shadow-2xl rounded-3xl border border-gray-100 my-4 md:my-8">
        
        {/* Header Section */}
        <header className="px-6 py-12 text-center bg-gradient-to-br from-cyan-50 to-white relative border-b border-cyan-100/50">
          <div className="flex justify-center mb-6 relative z-10">
             <Star className="w-12 h-12 text-cyan-400 fill-cyan-200 drop-shadow-sm" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 drop-shadow-sm relative z-10">
            Ma Trận Định Mệnh
          </h1>
          
          <div className="inline-flex flex-col items-center justify-center border border-gray-200 bg-white/60 px-10 py-5 rounded-2xl relative shadow-sm z-10 backdrop-blur-md">
            <h2 className="text-2xl font-black text-gray-800 mb-1 tracking-widest uppercase">{name}</h2>
            <p className="text-gray-500 font-bold tracking-widest text-sm uppercase">{dob}</p>
          </div>
        </header>

        {/* Matrix Visualization */}
        <section className="px-6 py-16 bg-white relative">
           <h3 className="text-center text-xs font-bold tracking-[0.4em] text-gray-400 mb-16 uppercase after:content-[''] after:block after:w-16 after:h-[2px] after:bg-cyan-200 after:mx-auto after:mt-4">
             Bản Đồ Năng Lượng
           </h3>
           
           <div className="relative w-full max-w-[600px] mx-auto aspect-square flex items-center justify-center">
             
             {/* Background Magic Circle */}
             <div className="absolute inset-4 border-[2px] border-emerald-500/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
             <div className="absolute inset-16 border-[2px] border-teal-500/30 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
             <div className="absolute inset-32 border-[2px] border-cyan-500/40 rounded-full border-dashed animate-[spin_30s_linear_infinite]"></div>
             
             {/* Cross connecting lines */}
             <div className="absolute top-12 bottom-12 left-1/2 w-[2px] bg-gradient-to-b from-teal-500/0 via-teal-500/50 to-teal-500/0"></div>
             <div className="absolute left-12 right-12 top-1/2 h-[2px] bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0"></div>

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
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-4 border-cyan-200 rounded-full flex flex-col items-center justify-center shadow-[0_15px_40px_rgba(6,182,212,0.2)] backdrop-blur-xl relative z-20 transition-transform group-hover:scale-105">
                    <span className="text-[10px] md:text-xs text-cyan-600 font-bold uppercase tracking-[0.2em] mb-1">Tâm Hồn</span>
                    <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-600">{stats.center}</span>
                    <span className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">{stats.purpose} Mục Đích</span>
                  </div>
                </div>
             </div>
           </div>

           {/* Additional lines info */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto">
             <InfoCard title="Đuôi Nghiệp Quả" value={stats.karmicTail} icon={<Moon className="w-5 h-5 text-rose-500" />} color="rose" />
             <InfoCard title="Đường Tài Chính" value={stats.moneyLine} icon={<Hexagon className="w-5 h-5 text-amber-500" />} color="amber" />
             <InfoCard title="Đường Tình Yêu" value={stats.loveLine} icon={<Compass className="w-5 h-5 text-pink-500" />} color="pink" />
           </div>

        </section>

        {/* Deep Analysis Text */}
        <section className="px-6 py-16 bg-white border-t border-gray-100">
          <div className="flex items-center justify-center gap-4 mb-10 relative">
            <Sparkles className="text-cyan-500 w-6 h-6" />
            <h3 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 uppercase tracking-widest text-center">
              Thông Điệp Từ Vũ Trụ
            </h3>
            <Sparkles className="text-cyan-500 w-6 h-6" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-80">
              <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
              <p className="text-gray-500 font-bold tracking-widest text-sm uppercase animate-pulse">Đang giải mã ma trận...</p>
            </div>
          ) : (
            <div className="prose prose-lg md:prose-xl max-w-none 
              prose-headings:text-gray-900 prose-h2:border-b-2 prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:mt-12
              prose-h3:text-cyan-600 prose-h3:mt-6
              prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:font-normal
              prose-li:text-gray-700 prose-li:leading-[1.7]
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-a:text-cyan-500 
              break-words relative z-10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report}
              </ReactMarkdown>
            </div>
          )}
          
          <div className="mt-20 text-center border-t border-gray-200 pt-10 pb-6 relative z-10">
             <p className="font-serif text-gray-600 text-xl md:text-2xl italic font-medium">
               "Tận nhân lực, tri thiên mệnh. Sự thành bại cốt yếu tại Tâm."
             </p>
          </div>
        </section>

        <footer className="text-center py-10 text-gray-400 text-xs tracking-widest uppercase font-medium border-t border-gray-100 bg-gray-50">
          <p>Tạo bởi Ma Trận Định Mệnh AI © 2026</p>
        </footer>
      </div>
      {/* Back to Top Floating Button */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_10px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_15px_25px_rgba(6,182,212,0.4)] hover:-translate-y-1 transition-all z-50 flex items-center justify-center group print:hidden"
        aria-label="Trở về đầu trang"
        title="Trở về đầu trang"
      >
        <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
      </button>
    </div>
  );
}

// ---------------- UI COMPONENTS ----------------

const MatrixNode = ({ label, value, color, detail }: { label: string, value: number, color: 'emerald'|'rose'|'cyan'|'amber', detail: string }) => {
  const colorMap = {
    emerald: 'border-emerald-200 text-emerald-600 bg-emerald-50 shadow-emerald-500/10',
    rose: 'border-rose-200 text-rose-600 bg-rose-50 shadow-rose-500/10',
    cyan: 'border-cyan-200 text-cyan-600 bg-cyan-50 shadow-cyan-500/10',
    amber: 'border-amber-200 text-amber-600 bg-amber-50 shadow-amber-500/10',
  };

  const style = colorMap[color];

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 w-24 h-24 md:w-32 md:h-32 rounded-full border-2 ${style} backdrop-blur-md shadow-lg group hover:scale-105 transition-transform cursor-default z-20`}>
      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 text-center leading-tight">{label}</span>
      <span className="text-2xl md:text-3xl font-black drop-shadow-sm">{value}</span>
      <span className="text-[8px] md:text-[9px] font-bold opacity-50 uppercase tracking-widest mt-1">{detail}</span>
    </div>
  );
};

const InfoCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 p-3 rounded-full bg-gray-50 border border-gray-100">{icon}</div>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{title}</span>
      <span className="text-xl md:text-2xl font-black text-gray-800 tracking-widest drop-shadow-sm">{value}</span>
    </div>
  );
};

export default function MatrixResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] text-gray-800">
        <Loader2 className="animate-spin w-8 h-8 text-cyan-500" />
      </div>
    }>
      <MatrixResultContent />
    </Suspense>
  );
}
