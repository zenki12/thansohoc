"use client";
import { useState, useEffect } from "react";
import { tarotDeck, TarotCard } from "@/lib/tarotData";
import { Atom, Sparkles, Lock, ArrowRight, ArrowLeft, Heart, Briefcase, Eye, Send, Home, DollarSign, Activity } from "lucide-react";
import Link from "next/link";

const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

export default function TarotPage() {
  const [step, setStep] = useState(0);
  
  const [topic, setTopic] = useState("Thông điệp vũ trụ");
  const [spread, setSpread] = useState(1);
  const [question, setQuestion] = useState("");
  
  const [quickTopics, setQuickTopics] = useState<string[]>([]);
  
  const [drawnCards, setDrawnCards] = useState<(TarotCard & { isReversed: boolean })[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [loadingText, setLoadingText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const startDrawing = (selectedTopic: string, selectedSpread: number) => {
    setTopic(selectedTopic);
    setSpread(selectedSpread);
    setDrawnCards([]);
    setFlippedIndexes([]);
    setStep(1); // Go to Draw screen
  };

  useEffect(() => {
    if (step === 1 && drawnCards.length === 0) {
      const shuffled = shuffle([...tarotDeck]).slice(0, spread);
      const cardsObj = shuffled.map(c => ({
         ...c,
         isReversed: Math.random() > 0.6
      }));
      setDrawnCards(cardsObj);
    }
  }, [step, spread, drawnCards]);

  const handleFlip = (idx: number) => {
    if (!flippedIndexes.includes(idx)) {
      setFlippedIndexes([...flippedIndexes, idx]);
    }
  };

  const submitToAI = async () => {
    setStep(2); // Loading
    try {
      const intervals = [
        "Đang kết nối năng lượng...",
        "Các lá bài đang định hình câu chuyện...",
        "Vũ trụ đang truyền tải thông điệp..."
      ];
      let i = 0;
      setLoadingText(intervals[0]);
      const intId = setInterval(() => {
        i++;
        setLoadingText(intervals[i % intervals.length]);
      }, 2000);

      const res = await fetch("/api/tarot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          spreadType: spread,
          question,
          drawnCards
        })
      });
      clearInterval(intId);
      
      const data = await res.json();
      
      if (!res.ok || data.error) {
         throw new Error(data.error || "Lỗi server");
      }
      
      setResult(data);
      setStep(3); // Result
    } catch (e: any) {
      alert("Năng lượng bị gián đoạn: " + (e.message || "Vui lòng thử lại."));
      setStep(1); // Back to draw
    }
  };

  const availableQuickTopics = [
    { label: "Tổng Quan", icon: <Eye />, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Tình Cảm", icon: <Heart />, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Công Việc", icon: <Briefcase />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Tài Chính", icon: <DollarSign />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Gia Đình", icon: <Home />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Sức Khỏe", icon: <Activity />, color: "text-teal-600", bg: "bg-teal-50" }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D3748] font-sans selection:bg-orange-200 relative overflow-hidden flex flex-col items-center">
      
      {/* Background blobs matching Homepage */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-orange-300/20 rounded-full blur-[100px] animate-blob mix-blend-multiply"></div>
        <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-200/30 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
      </div>

      <nav className="relative z-50 w-full max-w-7xl mx-auto flex items-center px-6 md:px-12 py-6">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-orange-500 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Trở về trang chủ
        </Link>
      </nav>

      <main className="relative z-10 w-full flex-1 pb-24 px-4 md:px-8 flex flex-col justify-center max-w-5xl mx-auto">
        
        {/* DASHBOARD */}
        {step === 0 && (
          <div className="w-full space-y-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                Lắng Nghe Vũ Trụ
              </h1>
              <p className="text-gray-500 font-medium">Khám phá thông điệp ẩn giấu qua những lá bài chuẩn xác nhất.</p>
            </div>

            {/* Quick 1-Card Draw */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(99,102,241,0.3)] transition-all group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Sparkles className="w-32 h-32" />
               </div>
               <h2 className="text-3xl font-black mb-3">Thông Điệp Hôm Nay</h2>
               <p className="text-indigo-200 mb-8 max-w-md mx-auto">Một lá bài mang năng lượng chủ đạo trong ngày, giúp bạn định hướng tâm trí.</p>
               <button onClick={() => startDrawing("Thông điệp ngày mới", 1)} className="px-10 py-4 bg-white text-indigo-900 font-black rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto relative z-10">
                  <Atom className="w-5 h-5" /> Rút 1 Lá Ngay
               </button>
            </div>

            {/* 3-Card Thematic Spreads */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="flex items-center gap-4 w-full">
                 <h3 className="text-2xl font-black text-gray-800">Trải Bài Nhanh (3 Lá)</h3>
                 <div className="flex-1 h-[1px] bg-gray-200"></div>
                 <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${quickTopics.length === 3 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                    Đã chọn ({quickTopics.length}/3)
                 </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
                {availableQuickTopics.map(t => {
                  const isSelected = quickTopics.includes(t.label);
                  const isMax = quickTopics.length >= 3;
                  const isDisabled = !isSelected && isMax;
                  return (
                    <button key={t.label} 
                      onClick={() => {
                        if(isSelected) setQuickTopics(quickTopics.filter(x => x !== t.label));
                        else if(!isMax) setQuickTopics([...quickTopics, t.label]);
                      }}
                      disabled={isDisabled}
                      className={`p-6 md:p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 group 
                        ${isSelected ? 'bg-orange-50 border-orange-400 shadow-[0_10px_20px_rgba(249,115,22,0.15)] ring-4 ring-orange-100' : 'bg-white border-gray-100 hover:border-orange-200'}
                        ${isDisabled ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-lg'}
                      `}>
                      <div className={`w-14 h-14 rounded-full ${t.bg} ${t.color} flex items-center justify-center`}>
                         {t.icon}
                      </div>
                      <span className={`text-lg md:text-xl font-bold ${isSelected ? 'text-orange-900' : 'text-gray-800'}`}>{t.label}</span>
                      {isSelected && <div className="absolute inset-0 border-2 border-orange-400 rounded-[2rem] pointer-events-none"></div>}
                    </button>
                  );
                })}
              </div>
              
              <div className={`transition-all duration-500 w-full pt-4 ${quickTopics.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <button onClick={() => startDrawing(quickTopics.join(" - "), 3)} className="px-12 py-5 bg-gray-900 border-2 border-transparent text-white font-black rounded-full shadow-xl hover:bg-orange-600 transition-all text-lg flex items-center gap-3 mx-auto">
                   Bắt Đầu Rút 3 Lá <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Specific Question / 5 Cards */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border-2 border-orange-100 shadow-sm relative">
               <div className="absolute top-4 right-6">
                  <Lock className="w-5 h-5 text-gray-300" />
               </div>
               <h3 className="text-2xl font-black text-gray-800 mb-2">Tư Vấn Theo Yêu Cầu (5 Lá)</h3>
               <p className="text-gray-500 mb-6">Trải bài sâu sắc nhất để giải phẫu gốc rễ vấn đề bạn đang gặp phải.</p>
               <textarea 
                  className="w-full bg-gray-50 border-2 border-gray-200 focus:border-orange-500 rounded-2xl p-6 h-32 text-gray-800 outline-none transition-colors resize-none mb-6 font-medium"
                  placeholder="Ghi rõ điều bạn đang trăn trở... (Ví dụ: Tôi có nên đầu tư dự án này không?)"
                  value={question} onChange={(e) => setQuestion(e.target.value)}
                />
                <button onClick={() => startDrawing("Phân tích chuyên sâu", 5)} className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl shadow-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Gửi Câu Hỏi Lên Vũ Trụ
                </button>
            </div>
          </div>
        )}

        {/* STEP 1: DRAW CARDS */}
        {step === 1 && (
          <div className="w-full max-w-5xl mx-auto text-center space-y-12 animate-in fade-in duration-700">
             <button onClick={()=>setStep(0)} className="text-gray-400 hover:text-orange-500 font-bold flex items-center gap-2 justify-center mx-auto mb-4 transition-colors"><ArrowLeft className="w-4 h-4"/> Rút lại từ đầu</button>
             
             <div className="space-y-4">
               <h1 className="text-3xl md:text-5xl font-black text-gray-800">
                 Năng lượng của bạn đang hội tụ
               </h1>
               <p className="text-gray-500 font-medium text-lg px-4">
                 Hãy dùng trực giác, <span className="text-orange-500 font-bold">click vào lá bài</span> thu hút bạn nhất ({flippedIndexes.length}/{spread})
               </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {drawnCards.map((card, idx) => {
                const isFlipped = flippedIndexes.includes(idx);
                return (
                  <div key={idx} onClick={() => handleFlip(idx)} className="relative w-40 h-[260px] md:w-56 md:h-[350px] cursor-pointer group" style={{ perspective: '1200px' }}>
                    <div className="w-full h-full relative shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-2" style={{ transformStyle: 'preserve-3d', transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                      
                      {/* Back of Card - Light theme mystical back */}
                      <div className="absolute inset-0 w-full h-full rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-900 to-purple-900 overflow-hidden flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                         <div className="absolute inset-2 border border-indigo-300/30 rounded-xl"></div>
                         <Sparkles className="w-8 h-8 text-indigo-300/80 mb-6" />
                         <span className="text-indigo-100 font-black tracking-widest text-sm">BẤM ĐỂ RÚT</span>
                         <span className="text-indigo-300/70 font-bold tracking-[0.2em] text-[8px] mt-2 uppercase">Giữ nhịp thở</span>
                      </div>
                      
                      {/* Front of Card */}
                      <div className="absolute inset-0 w-full h-full rounded-2xl bg-white overflow-hidden flex flex-col shadow-inner border border-gray-100" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <div className={`flex-1 relative overflow-hidden bg-gray-50 p-2 md:p-3 ${card.isReversed ? 'rotate-180' : ''}`}>
                           <div className="w-full h-full relative rounded-xl overflow-hidden border border-gray-200">
                             <img src={card.image} alt={card.name_vn} className="absolute inset-0 w-full h-full object-cover" />
                           </div>
                        </div>
                        <div className="h-16 bg-white border-t border-gray-100 flex flex-col items-center justify-center shrink-0 w-full px-2">
                          <p className="font-bold text-gray-800 text-sm center line-clamp-1 truncate w-full">{card.name_vn}</p>
                          <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest mt-0.5">{card.isReversed ? 'Ngược (Reversed)' : 'Xuôi (Upright)'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`transition-all duration-700 pt-8 ${flippedIndexes.length === spread ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
               <button onClick={submitToAI} className="px-12 py-5 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black rounded-full shadow-[0_10px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.6)] hover:-translate-y-1 transition-all text-xl flex items-center justify-center gap-3 mx-auto">
                 <Sparkles className="w-6 h-6 animate-pulse" /> Luận Giải Bối Cảnh Này
               </button>
            </div>
          </div>
        )}

        {/* STEP 2: LOADING */}
        {step === 2 && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-500">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-orange-200 rounded-full animate-ping opacity-30"></div>
              <div className="absolute inset-2 bg-gradient-to-tr from-orange-500 to-rose-500 rounded-full animate-[spin_3s_linear_infinite] opacity-40 blur-xl"></div>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-inner z-10 border border-gray-50">
                 <Atom className="w-10 h-10 text-orange-600 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight transition-all text-center">{loadingText}</h2>
          </div>
        )}

        {/* STEP 3: RESULT */}
        {step === 3 && result && (
          <div className="w-full max-w-4xl mx-auto animate-in slide-in-from-bottom-12 duration-1000 space-y-12">
            <div className="text-center space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-orange-100 shadow-sm text-sm font-bold text-orange-600 uppercase tracking-widest mx-auto">
                 <Sparkles className="w-4 h-4" /> Chủ đề: {topic}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-800">Thông Điệp Vũ Trụ</h1>
            </div>

            {/* Displaying drawn cards */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-4 pb-8">
               {drawnCards.map((card, idx) => (
                 <div key={idx} className="flex flex-col items-center gap-4 w-full max-w-[14rem]">
                    <div className="w-48 h-[330px] p-2 bg-white rounded-2xl shadow-xl border border-gray-100">
                      <div className={`w-full h-full relative rounded-xl overflow-hidden ${card.isReversed ? 'rotate-180' : ''}`}>
                         <img src={card.image} alt={card.name_vn} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 text-gray-800 text-sm font-black uppercase">
                        <span>✦</span> {card.name_vn} <span>✦</span>
                      </div>
                      <div className={`inline-block px-3 py-0.5 border text-[10px] font-bold uppercase rounded-full ${card.isReversed ? 'border-red-200 bg-red-50 text-red-600' : 'border-green-200 bg-green-50 text-green-600'}`}>
                         {card.isReversed ? 'Ngược' : 'Xuôi'}
                      </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* The Hook (Free Tier Focus) */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border-2 border-orange-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Sparkles className="w-40 h-40 text-orange-500" />
              </div>
              <p className="text-2xl md:text-3xl text-gray-800 font-sans leading-relaxed font-bold relative z-10 text-center">
                "{result.hookInsight}"
              </p>
            </div>

            {/* Paywall Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white border border-gray-200 shadow-md">
              <div className={`p-8 md:p-12 space-y-12 transition-all duration-1000 ${!isUnlocked ? 'blur-md opacity-30 select-none pointer-events-none max-h-[400px]' : 'max-h-[5000px]'}`}>
                <div>
                  <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 font-black mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Atom className="w-6 h-6 text-orange-500" /> Bức Tranh Toàn Cảnh
                  </h3>
                  <p className="text-gray-700 leading-loose text-lg whitespace-pre-line font-medium">{result.fullStory}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <h3 className="text-lg text-gray-800 font-black mb-4 uppercase tracking-wider">Kết luận ngắn gọn</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">{result.conclusion}</p>
                  </div>
                  <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                    <h3 className="text-lg text-orange-800 font-black mb-4 uppercase tracking-wider">Hành động cần làm</h3>
                    <p className="text-orange-900/80 leading-relaxed font-bold">{result.advice}</p>
                  </div>
                </div>
              </div>

              {!isUnlocked && (
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent flex flex-col items-center justify-end pb-12 pt-32 px-6">
                  <div className="bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-2xl border border-orange-100 text-center max-w-lg w-full">
                     <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Lock className="w-8 h-8 text-rose-600" />
                     </div>
                     <h4 className="text-2xl font-black text-gray-800 mb-3">Giải mã trọn vẹn 100%</h4>
                     <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                       Các lá bài còn cất giấu lời khuyên cụ thể cho riêng bạn ở phía sau, hãy mở khóa để xem tiếp.
                     </p>
                     <button onClick={() => setIsUnlocked(true)} className="w-full py-5 bg-gray-900 hover:bg-black text-white font-black rounded-2xl shadow-xl transition-all text-lg flex items-center justify-center gap-2">
                       MỞ KHÓA BÀI LUẬN <ArrowRight className="w-5 h-5 text-gray-400" />
                     </button>
                  </div>
                </div>
              )}
            </div>

            {isUnlocked && (
               <div className="pt-16 text-center animate-in fade-in duration-1000">
                 <button onClick={() => { setStep(0); setQuestion(""); setDrawnCards([]); setFlippedIndexes([]); setResult(null); setIsUnlocked(false); }} 
                    className="px-10 py-4 bg-white border-2 border-gray-200 text-gray-800 font-black rounded-full hover:border-gray-800 hover:bg-gray-50 transition-colors shadow-sm">
                    Rút Một Quẻ Mới
                 </button>
               </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
