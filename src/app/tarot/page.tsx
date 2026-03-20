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
  const [shuffledDeck, setShuffledDeck] = useState<number[]>([]);
  const [selectedDeckIndexes, setSelectedDeckIndexes] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Helper to prevent React crashes if AI returns an Array/Object instead of a String
  const safeRender = (val: any) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return JSON.stringify(val);
  };

  const startDrawing = (selectedTopic: string, selectedSpread: number) => {
    setTopic(selectedTopic);
    setSpread(selectedSpread);
    setQuestion("");
    setLoadingText("");

    // Create 78-card deck and Shuffle
    const newDeck = Array.from({ length: 78 }, (_, i) => i);
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    setShuffledDeck(newDeck);
    setSelectedDeckIndexes([]);
    setDrawnCards([]); // Clear previous draws
    
    setStep(1); // Start drawing
  };

  const handlePickCard = (deckIndex: number) => {
    if (selectedDeckIndexes.length < spread && !selectedDeckIndexes.includes(deckIndex)) {
      const newSelection = [...selectedDeckIndexes, deckIndex];
      setSelectedDeckIndexes(newSelection);
      
      if (newSelection.length === spread) {
        // Finalize drawing: map to actual tarot data with random reversed logic
        const finalCards = newSelection.map(idx => {
          const actualCardIndex = shuffledDeck[idx];
          return {
            ...tarotDeck[actualCardIndex],
            isReversed: Math.random() > 0.5
          };
        });
        setDrawnCards(finalCards);
      }
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
                <button onClick={() => startDrawing("Phân tích chuyên sâu", 5)} className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl shadow-xl ">
                  <Send className="w-5 h-5" /> Gửi Câu Hỏi Lên Vũ Trụ
                </button>
            </div>
          </div>
        )}

        {/* STEP 1: DRAW CARDS (FANNED DECK) */}
        {step === 1 && (
          <div className="w-full mx-auto text-center space-y-12 animate-in fade-in duration-700">
             <button onClick={()=>setStep(0)} className="text-gray-400 hover:text-orange-500 font-bold flex items-center gap-2 justify-center mx-auto mb-4 transition-colors"><ArrowLeft className="w-4 h-4"/> Rút lại từ đầu</button>
             
             <div className="space-y-4 max-w-4xl mx-auto px-4">
               <h1 className="text-3xl md:text-5xl font-black text-gray-800">
                 Trực giác vẫy gọi
               </h1>
               <p className="text-gray-500 font-medium text-lg">
                 Hãy nhắm mắt, nhẩm trong đầu câu hỏi và <span className="text-orange-500 font-bold">chọn {spread} lá bài</span> thu hút bạn nhất ({selectedDeckIndexes.length}/{spread})
               </p>
            </div>
            
            {/* TRAY FOR SELECTED CARDS (SLOTS) */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 min-h-[300px] md:min-h-[360px] px-4 max-w-5xl mx-auto">
               {Array.from({ length: spread }).map((_, idx) => {
                  const pickedDeckIndex = selectedDeckIndexes[idx];
                  const hasPicked = pickedDeckIndex !== undefined;
                  const isAllPicked = selectedDeckIndexes.length === spread;
                  const cardData = isAllPicked ? drawnCards[idx] : null;

                  return (
                     <div key={`slot-${idx}`} className="relative w-32 h-[220px] md:w-48 md:h-[330px] perspective-[1200px]">
                        {hasPicked ? (
                           <div className="w-full h-full relative shadow-xl rounded-2xl transition-all duration-1000 ease-in-out" 
                                style={{ transformStyle: 'preserve-3d', transform: isAllPicked ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                              
                              {/* Slot Card Back (Waiting) */}
                              <div className="absolute inset-0 w-full h-full rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-900 to-purple-900 overflow-hidden flex flex-col items-center justify-center animate-in zoom-in-50 duration-500" style={{ backfaceVisibility: 'hidden' }}>
                                 <div className="absolute inset-2 border border-indigo-300/30 rounded-xl"></div>
                                 <Sparkles className="w-8 h-8 text-indigo-300/80 mb-4" />
                                 <span className="text-indigo-100 font-black tracking-widest text-[10px] uppercase">Đã Chọn</span>
                              </div>

                              {/* Slot Card Front (Revealed) */}
                              {isAllPicked && cardData && (
                                <div className="absolute inset-0 w-full h-full rounded-2xl bg-white overflow-hidden flex flex-col shadow-inner border border-gray-100" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                  <div className={`flex-1 relative overflow-hidden bg-gray-50 p-2 md:p-3 ${cardData.isReversed ? 'rotate-180' : ''}`}>
                                    <div className="w-full h-full relative rounded-xl overflow-hidden border border-gray-200">
                                      <img src={cardData.image} alt={cardData.name_vn} className="absolute inset-0 w-full h-full object-cover" />
                                    </div>
                                  </div>
                                  <div className="h-16 bg-white border-t border-gray-100 flex flex-col items-center justify-center shrink-0 w-full px-2">
                                    <p className="font-bold text-gray-800 text-sm center line-clamp-1 truncate w-full">{cardData.name_vn}</p>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${cardData.isReversed ? 'text-rose-500' : 'text-emerald-600'}`}>
                                       {cardData.isReversed ? 'Ngược (R)' : 'Xuôi (U)'}
                                    </p>
                                  </div>
                                </div>
                              )}
                           </div>
                        ) : (
                           // Empty Slot
                           <div className="w-full h-full rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 flex flex-col items-center justify-center text-gray-300">
                              <span className="font-medium text-sm uppercase tracking-widest mb-2">Lá thứ {idx + 1}</span>
                              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center animate-pulse">
                                 <Sparkles className="w-5 h-5 text-gray-300" />
                              </div>
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>

            {/* BUTTON: READ SPREAD */}
            {selectedDeckIndexes.length === spread && (
              <div className="pt-8 pb-12 animate-in slide-in-from-bottom duration-500 max-w-lg mx-auto px-4">
                 <button onClick={submitToAI} className="w-full py-5 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black rounded-2xl shadow-2xl hover:shadow-orange-500/30 transition-all text-xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
                   <Sparkles className="w-6 h-6 animate-pulse" /> Luận Giải Tương Lai
                 </button>
              </div>
            )}

            {/* FANNED DECK AREA (78 CARDS) */}
            {selectedDeckIndexes.length < spread && (
               <div className="w-full relative mt-16 pb-24 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-50/80 to-transparent pointer-events-none z-10" />
                  
                  {/* Horizontally scrollable fanned section */}
                  <div className="flex flex-nowrap overflow-x-auto pb-12 pt-16 px-[10vw] md:px-[25vw] scroll-smooth hide-scrollbar snap-x">
                     <div className="flex items-center min-w-max pb-8 px-8">
                        {shuffledDeck.map((_, idx) => {
                           const isPicked = selectedDeckIndexes.includes(idx);
                           
                           // If picked, it becomes an invisible space preserver
                           if (isPicked) {
                              return <div key={idx} className={`w-14 h-24 md:w-20 md:h-32 shrink-0 ${idx > 0 ? '-ml-8 md:-ml-12' : ''}`} />;
                           }
                           
                           return (
                              <div 
                                 key={idx} 
                                 onClick={() => handlePickCard(idx)}
                                 className={`
                                    w-14 h-24 md:w-20 md:h-32 shrink-0 cursor-pointer 
                                    rounded-lg md:rounded-xl overflow-hidden border border-indigo-300 shadow-md
                                    bg-gradient-to-br from-indigo-800 to-purple-900
                                    transition-all duration-300 ease-out origin-bottom
                                    hover:-translate-y-8 hover:!scale-125 hover:z-50 hover:shadow-2xl hover:border-orange-300
                                    ${idx > 0 ? '-ml-8 md:-ml-12 hover:ml-4' : ''}
                                    group relative
                                 `}
                                 style={{ zIndex: 10 + idx }}
                              >
                                 <div className="absolute inset-1 border border-indigo-400/30 rounded-md md:rounded-lg"></div>
                                 {/* Optional pattern to make it look like a deck back */}
                                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-400 via-transparent to-transparent"></div>
                              </div>
                           );
                        })}
                     </div>
                  </div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-widest absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Vuốt ngang để chọn bài <ArrowRight className="w-4 h-4" />
                  </p>
               </div>
            )}

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
                "{safeRender(result.hook)}"
              </p>
            </div>

            {/* Paywall Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white border border-gray-200 shadow-md">
              <div className={`p-8 md:p-12 space-y-12 transition-all duration-1000 ${!isUnlocked ? 'blur-md opacity-30 select-none pointer-events-none max-h-[400px]' : 'max-h-[5000px]'}`}>
                
                {/* 2. Phân Tích Từng Lá Bài */}
                <div>
                  <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 font-black mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Atom className="w-6 h-6 text-orange-500" /> Giải Mã Chi Tiết
                  </h3>
                  <div className="space-y-4 mb-8">
                    {Array.isArray(result.cardAnalysis) ? (
                      result.cardAnalysis.map((item: any, idx: number) => (
                        <div key={idx} className="text-gray-700 leading-loose text-lg">
                          <span className="font-black text-gray-900">• {item.cardName}: </span>
                          <span className="font-medium">{item.analysis}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-700 leading-loose text-lg whitespace-pre-line font-medium">{safeRender(result.cardAnalysis)}</p>
                    )}
                  </div>
                </div>

                {/* 3. Cốt Truyện Gắn Kết */}
                <div className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100/50">
                  <h3 className="text-lg text-orange-800 font-black mb-4 uppercase tracking-wider">Bức Tranh Toàn Cảnh</h3>
                  <p className="text-gray-800 leading-relaxed font-medium whitespace-pre-line">{safeRender(result.story)}</p>
                </div>
                
                {/* 4 & 5. Kết Luận Trực Diện + Lý Do */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <h3 className="text-lg text-gray-800 font-black mb-4 uppercase tracking-wider">Chốt Lại (Kết luận)</h3>
                    <p className="text-rose-600 text-xl font-black mb-4 uppercase">{safeRender(result.directAnswer)}</p>
                    <p className="text-gray-600 leading-relaxed font-medium">{safeRender(result.reasoning)}</p>
                  </div>
                  
                  {/* 6. Lời khuyên hành động */}
                  <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                    <h3 className="text-lg text-indigo-800 font-black mb-4 uppercase tracking-wider">Hành động cần làm</h3>
                    <p className="text-indigo-900/80 leading-relaxed font-bold whitespace-pre-line">{safeRender(result.action)}</p>
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
