"use client";
import { useState, useEffect } from "react";
import { tarotDeck, TarotCard } from "@/lib/tarotData";
import { Atom, Sparkles, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

export default function TarotPage() {
  const [step, setStep] = useState(0);
  
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const topics = ["❤️ Tình yêu", "💼 Công việc", "💰 Tiền bạc", "👨‍👩‍👧 Gia đình", "🧠 Tâm trạng", "🔮 Thông điệp"];
  
  const [spread, setSpread] = useState(3);
  const spreads = [
    { label: "Nhanh (1 lá)", value: 1, desc: "Thông điệp chớp nhoáng" },
    { label: "Cơ bản (3 lá)", value: 3, desc: "Quá khứ - Hiện tại - Tương lai" },
    { label: "Chi tiết (5 lá)", value: 5, desc: "Phân tích điểm chạm sâu nhất", locked: true }
  ];

  const [question, setQuestion] = useState("");
  
  const [drawnCards, setDrawnCards] = useState<(TarotCard & { isReversed: boolean })[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  
  const [loadingText, setLoadingText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (step === 3 && drawnCards.length === 0) {
      const shuffled = shuffle([...tarotDeck]).slice(0, spread);
      const cardsObj = shuffled.map(c => ({
         ...c,
         isReversed: Math.random() > 0.6 // 40% reversed chance
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
    setStep(4);
    try {
      const intervals = [
        "Đang kết nối năng lượng Tarot...",
        "Các lá bài đang tiết lộ câu chuyện...",
        "Chúng tôi đang giải mã thông điệp tâm linh..."
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
          topic: selectedTopics.join(", "),
          spreadType: spread,
          question,
          drawnCards
        })
      });
      clearInterval(intId);
      const data = await res.json();
      setResult(data);
      setStep(5);
    } catch (e) {
      alert("Năng lượng bị gián đoạn, vui lòng thử lại.");
      setStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-gray-800 font-sans selection:bg-orange-200">
      
      {/* Mạng lưới hạt sương mù BG */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-50 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      <nav className="relative z-50 flex items-center px-8 py-6">
        <Link href="/" className="flex items-center gap-3 text-gray-500 hover:text-gray-800 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Trở về trang chủ
        </Link>
      </nav>

      <main className="relative z-10 pt-10 pb-20 px-6 min-h-[80vh] flex flex-col justify-center">
        
        {step === 0 && (
          <div className="max-w-4xl mx-auto text-center space-y-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm tracking-wide border border-indigo-100">
              <Sparkles className="w-4 h-4" /> Bói Bài Tarot Trí Tuệ Nhân Tạo
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#1A202C] tracking-tight leading-tight">
              Bạn đang băn khoăn <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">điều gì lúc này?</span>
            </h1>
            <p className="text-gray-500 font-medium text-lg">Bạn có thể chọn tối đa 3 chủ đề ({selectedTopics.length}/3)</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {topics.map(t => {
                const isSelected = selectedTopics.includes(t);
                const isMax = selectedTopics.length >= 3;
                const isDisabled = !isSelected && isMax;
                return (
                  <button key={t} 
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTopics(selectedTopics.filter(x => x !== t));
                      } else if (!isMax) {
                        setSelectedTopics([...selectedTopics, t]);
                      }
                    }} 
                    disabled={isDisabled}
                    className={`p-6 md:p-8 rounded-[2rem] shadow-sm text-lg md:text-xl font-bold transition-all border-2 
                      ${isSelected ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md ring-4 ring-indigo-500/20' : 'bg-white border-gray-100 text-gray-700 hover:border-indigo-300'} 
                      ${isDisabled ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:-translate-y-1'}
                    `}>
                    {t}
                  </button>
                );
              })}
            </div>
            <div className={`transition-all duration-500 ${selectedTopics.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              <button onClick={() => setStep(1)} className="px-12 py-4 bg-gray-900 text-white font-black rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-xl">
                Tiếp Tục 
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="max-w-4xl mx-auto text-center space-y-12 animate-in slide-in-from-right-10 duration-500">
             <button onClick={()=>setStep(0)} className="text-gray-400 hover:text-gray-800 font-bold flex items-center gap-2 justify-center mx-auto mb-4 transition-colors"><ArrowLeft className="w-4 h-4"/> Chọn lại chủ đề</button>
             <h1 className="text-4xl md:text-5xl font-black text-[#1A202C] tracking-tight">Trải Bài Nào <br/> Hợp Với Bạn?</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {spreads.map(s => (
                <button key={s.label} onClick={() => { if(!s.locked){ setSpread(s.value); setStep(2); } }} 
                  className={`relative p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center ${s.value === 3 ? 'border-purple-500 shadow-xl shadow-purple-500/10 bg-purple-50/50 -translate-y-2' : 'border-gray-100 bg-white hover:border-purple-300 hover:shadow-md'} ${s.locked ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'}`}>
                  {s.locked && <Lock className="absolute top-6 right-6 w-5 h-5 text-gray-400" />}
                  {s.value === 3 && <div className="absolute -top-4 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg">Khuyên dùng</div>}
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-black text-gray-800 mb-6 shadow-sm border border-gray-100">{s.value}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{s.label}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto text-center space-y-10 animate-in zoom-in-95 duration-500">
            <button onClick={()=>setStep(1)} className="text-gray-400 hover:text-gray-800 font-bold flex items-center gap-2 justify-center mx-auto mb-4 transition-colors"><ArrowLeft className="w-4 h-4"/> Chọn lại trải bài</button>
            <h1 className="text-4xl md:text-5xl font-black text-[#1A202C] tracking-tight">Vũ trụ đang lắng nghe</h1>
            <p className="text-gray-500 text-lg font-medium">Hãy nhắm mắt, hít một hơi thật sâu và viết ra điều bạn trăn trở nhất vào lúc này...</p>
            <div className="text-left relative">
              <textarea 
                className="w-full bg-white border-2 border-indigo-100 focus:border-indigo-500 rounded-[2rem] p-8 h-48 text-xl text-gray-800 outline-none transition-all resize-none shadow-sm placeholder:text-gray-300"
                placeholder="Ví dụ: Người này có thực sự nghiêm túc với tôi không? Tôi có nên chuyển việc vào lúc này?..."
                value={question} onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <button onClick={() => setStep(3)} className="w-full sm:w-auto px-12 py-5 bg-gray-900 text-white font-black rounded-full shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-2">
                Bắt Đầu Rút Bài <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
              <button onClick={() => { setQuestion(""); setStep(3); }} className="text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors uppercase tracking-wider">
                Rút bài tự do (Bỏ qua)
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-6xl mx-auto text-center space-y-16 animate-in fade-in duration-700">
            <div className="space-y-4">
               <h1 className="text-3xl md:text-5xl font-black text-[#1A202C] tracking-tight">
                 Năng lượng của bạn đang hội tụ
               </h1>
               <p className="text-gray-500 font-medium text-lg px-4">
                 Hãy dùng trực giác, <span className="text-indigo-600 font-bold">click vào lá bài</span> thu hút bạn nhất ({flippedIndexes.length}/{spread})
               </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {drawnCards.map((card, idx) => {
                const isFlipped = flippedIndexes.includes(idx);
                return (
                  <div key={idx} onClick={() => handleFlip(idx)} className="relative w-40 h-[260px] md:w-56 md:h-[350px] cursor-pointer group" style={{ perspective: '1200px' }}>
                    <div className="w-full h-full relative shadow-2xl rounded-2xl md:rounded-3xl hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)] hover:-translate-y-2" style={{ transformStyle: 'preserve-3d', transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                      
                      {/* Back of Card */}
                      <div className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl border-[3px] border-indigo-300/30 bg-gradient-to-b from-[#1a1c29] to-[#2d3748] overflow-hidden flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none mix-blend-overlay"></div>
                         <div className="absolute inset-3 border border-indigo-400/20 rounded-xl md:rounded-2xl"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-indigo-500/20 blur-2xl rounded-full"></div>
                         <Atom className="w-16 h-16 text-indigo-300/40 relative z-10 animate-pulse-slow" />
                      </div>
                      
                      {/* Front of Card */}
                      <div className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl bg-white overflow-hidden flex flex-col shadow-inner border border-gray-100" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <div className={`flex-1 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 p-4 border-b border-gray-100 flex flex-col items-center justify-center ${card.isReversed ? 'rotate-180' : ''}`}>
                           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
                           <Atom className="w-16 h-16 text-indigo-400 mb-4 opacity-50 relative z-10" />
                           <p className="text-lg md:text-xl font-black text-indigo-900 text-center uppercase tracking-widest relative z-10">{card.name_vn}</p>
                           <p className="text-xs font-bold text-indigo-400 mt-2 relative z-10">T.A.R.O.T</p>
                        </div>
                        <div className="h-16 md:h-20 bg-white flex flex-col items-center justify-center shrink-0 w-full px-2">
                          <p className="font-bold text-gray-800 text-sm md:text-base text-center line-clamp-1 truncate w-full">{card.name_vn}</p>
                          <p className="text-[10px] md:text-xs text-indigo-500 font-black uppercase tracking-widest mt-0.5">{card.isReversed ? 'NGƯỢC (REVERSED)' : 'XUÔI (UPRIGHT)'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`transition-all duration-700 pt-8 ${flippedIndexes.length === spread ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
               <button onClick={submitToAI} className="px-12 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-black rounded-full shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.6)] hover:-translate-y-2 transition-all text-xl md:text-2xl flex items-center justify-center gap-3 mx-auto w-full md:w-auto">
                 <Sparkles className="w-6 h-6 animate-pulse" /> Luận Giải Ngay Bối Cảnh Này
               </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-500">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 bg-indigo-200 rounded-full animate-ping opacity-30"></div>
              <div className="absolute inset-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full animate-[spin_3s_linear_infinite] opacity-40 blur-xl"></div>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-inner z-10 border border-gray-50">
                 <Atom className="w-12 h-12 text-indigo-600 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight transition-all text-center px-4 leading-relaxed">{loadingText}</h2>
          </div>
        )}

        {step === 5 && result && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in slide-in-from-bottom-10 duration-700">
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-bold text-gray-500 uppercase tracking-widest mx-auto flex-wrap justify-center">
                 <Sparkles className="w-4 h-4 text-purple-500" /> Chủ đề: {selectedTopics.join(", ")}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#1A202C]">Bản Thông Điệp Vũ Trụ</h1>
            </div>

            {/* The Hook (Free Tier) */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-indigo-50 relative overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                 <Sparkles className="w-40 h-40" />
              </div>
              <p className="text-2xl md:text-3xl text-gray-800 font-sans leading-relaxed font-bold relative z-10 text-center">"{result.hookInsight}"</p>
            </div>

            {/* Paywall Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 shadow-md">
              {/* Blurred Content */}
              <div className={`p-8 md:p-12 space-y-10 transition-all duration-1000 ${!isUnlocked ? 'blur-[6px] opacity-40 select-none pointer-events-none max-h-[500px]' : 'max-h-[5000px]'}`}>
                <div>
                  <h3 className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 font-black mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Atom className="w-6 h-6 text-indigo-500" /> Bức Tranh Toàn Cảnh
                  </h3>
                  <p className="text-gray-700 leading-loose text-lg whitespace-pre-line font-medium">{result.fullStory}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-3xl">
                    <h3 className="text-xl text-gray-800 font-bold mb-4 uppercase tracking-wider">Kết luận ngắn gọn</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">{result.conclusion}</p>
                  </div>
                  <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                    <h3 className="text-xl text-indigo-800 font-bold mb-4 uppercase tracking-wider">Hành động cần làm</h3>
                    <p className="text-indigo-900/80 leading-relaxed font-medium">{result.advice}</p>
                  </div>
                </div>
              </div>

              {/* Paywall Overlay CTA */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent flex flex-col items-center justify-end pb-12 pt-32 px-6">
                  <div className="bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-100 text-center max-w-lg w-full transform transition-transform hover:scale-105">
                     <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Lock className="w-8 h-8 text-purple-600" />
                     </div>
                     <h4 className="text-2xl font-black text-gray-800 mb-3">Chưa Dừng Lại Ở Đó</h4>
                     <p className="text-gray-500 mb-8 font-medium leading-relaxed">Vũ trụ còn nhiều thông điệp chi tiết muốn gửi gắm, phơi bày gốc rễ vấn đề và hướng dẫn bạn cách vượt qua chông gai.</p>
                     
                     <button onClick={() => setIsUnlocked(true)} className="w-full py-5 bg-gray-900 hover:bg-black text-white font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-2">
                       <Lock className="w-5 h-5 text-gray-400" /> MỞ KHÓA TOÀN BỘ LUẬN GIẢI
                     </button>
                     <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">(Trải nghiệm miễn phí hôm nay)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Upsell CTA */}
            {isUnlocked && (
               <div className="text-center p-12 bg-[#F8FAFC] rounded-[2.5rem] border-2 border-dashed border-gray-200 animate-in fade-in duration-500 mt-12">
                 <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Sparkles className="w-10 h-10 text-amber-500" />
                 </div>
                 <h3 className="text-3xl font-black text-[#1A202C] mb-4">Mọi chuyện đã sáng tỏ?</h3>
                 <p className="text-gray-500 font-medium text-lg max-w-xl mx-auto mb-8">Nếu vẫn còn những vấn vương trong lòng, bạn có thể thực hiện một lần gieo quẻ mới hoặc thay đổi chủ đề trải bài.</p>
                 <button onClick={() => { setStep(0); setDrawnCards([]); setFlippedIndexes([]); setResult(null); setIsUnlocked(false); }} 
                    className="px-10 py-4 bg-white border-2 border-gray-200 text-gray-800 font-black rounded-full hover:border-gray-800 hover:bg-gray-50 transition-colors shadow-sm">
                    Gieo Quẻ Trải Bài Mới
                 </button>
               </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
