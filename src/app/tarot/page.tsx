"use client";
import { useState, useEffect } from "react";
import { tarotDeck, TarotCard } from "@/lib/tarotData";
import { Atom, Sparkles, Lock, ArrowRight, ArrowLeft, Eye, Heart, Diamond, Star } from "lucide-react";
import Link from "next/link";

const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

export default function TarotPage() {
  const [step, setStep] = useState(0);
  
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const topics = [
    { id: "Tổng quan", label: "Tổng quan", icon: <Eye strokeWidth={1.5} /> },
    { id: "Tình cảm", label: "Tình cảm", icon: <Heart strokeWidth={1.5} /> },
    { id: "Công việc", label: "Công việc", icon: <Diamond strokeWidth={1.5} /> },
    { id: "Quyết định", label: "Quyết định A/B", icon: <Atom strokeWidth={1.5} /> },
    { id: "Tiền bạc", label: "Tài chính", icon: <Star strokeWidth={1.5} /> },
    { id: "Thông điệp", label: "Thông điệp vũ trụ", icon: <Sparkles strokeWidth={1.5} /> }
  ];
  
  const [spread, setSpread] = useState(3);
  const spreads = [
    { label: "Trải Bài Nhanh", value: 1, desc: "Nhận câu trả lời tức thì. 30 Điểm/Lần" },
    { label: "Thông Điệp Hôm Nay", value: 3, desc: "Góc nhìn 3 chiều sâu sắc. Miễn phí hôm nay" },
    { label: "Tư Vấn Theo Yêu Cầu", value: 5, desc: "Phân tích 5 thẻ bối cảnh.", locked: true }
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
    setStep(4);
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
    <div className="min-h-screen bg-[#04100C] text-[#D5E0D8] font-serif selection:bg-[#F2D794]/30 relative overflow-hidden flex flex-col items-center">
      
      {/* Mystical Background Grid & Starry Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#0A261C] rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#0A261C] rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2D794]/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen"></div>
      </div>

      <nav className="relative z-50 w-full max-w-7xl mx-auto flex items-center px-6 md:px-12 py-8 border-b border-[#F2D794]/10">
        <Link href="/" className="flex items-center gap-3 text-[#B4CFC3] hover:text-[#F2D794] font-medium transition-colors tracking-widest text-sm uppercase">
          <ArrowLeft className="w-4 h-4" /> TRỞ VỀ DỮ LIỆU CỐT
        </Link>
      </nav>

      <main className="relative z-10 w-full flex-1 pb-24 px-6 md:px-12 flex flex-col justify-center max-w-6xl mx-auto pt-8">
        
        {step === 0 && (
          <div className="w-full text-center space-y-16 animate-in fade-in zoom-in-95 duration-700">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-medium text-[#F2D794] tracking-tight font-serif drop-shadow-[0_0_20px_rgba(242,215,148,0.2)]">
                Digesty Tarot
              </h1>
              <p className="text-[#84A999] text-lg font-sans tracking-wide">Bậc Thầy Tối Ưu Giải Mã Vận Mệnh</p>
              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#F2D794]/30 to-transparent mx-auto"></div>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-medium text-[#D5E0D8] mb-2 font-serif">Bạn Đang Băn Khoăn Điều Gì?</h2>
                <p className="text-[#84A999] text-sm font-sans tracking-wider uppercase">Chọn tối đa 3 lĩnh vực ({selectedTopics.length}/3)</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {topics.map(t => {
                  const isSelected = selectedTopics.includes(t.id);
                  const isMax = selectedTopics.length >= 3;
                  const isDisabled = !isSelected && isMax;
                  return (
                    <button key={t.id} 
                      onClick={() => {
                        if (isSelected) setSelectedTopics(selectedTopics.filter(x => x !== t.id));
                        else if (!isMax) setSelectedTopics([...selectedTopics, t.id]);
                      }} 
                      disabled={isDisabled}
                      className={`relative overflow-hidden group p-8 rounded-xl font-medium transition-all duration-300 border bg-[#061812]
                        ${isSelected ? 'border-[#F2D794] shadow-[0_0_15px_rgba(242,215,148,0.1)] text-[#F2D794]' : 'border-[#123124] text-[#84A999] hover:border-[#1F4A38]'} 
                        ${isDisabled ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:-translate-y-1'}
                      `}>
                      <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-colors ${isSelected ? 'bg-[#123124] border-[#F2D794]/30 text-[#F2D794]' : 'bg-[#0A1F17] border-[#123124] text-[#55826A]'}`}>
                           {t.icon}
                        </div>
                        <span className="text-lg tracking-wider font-sans">{t.label}</span>
                      </div>
                      {isSelected && <div className="absolute inset-0 bg-gradient-to-t from-[#F2D794]/5 to-transparent"></div>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`transition-all duration-700 ${selectedTopics.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              <button onClick={() => setStep(1)} className="px-16 py-5 bg-gradient-to-r from-[#123828] to-[#0A261C] border border-[#F2D794]/40 text-[#F2D794] font-medium tracking-widest uppercase rounded-full shadow-[0_5px_30px_rgba(242,215,148,0.15)] hover:shadow-[0_10px_40px_rgba(242,215,148,0.2)] hover:-translate-y-1 transition-all text-sm font-sans flex items-center gap-3 mx-auto">
                Tiếp Theo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="w-full max-w-4xl mx-auto text-center space-y-16 animate-in slide-in-from-right-10 duration-700">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 text-[#F2D794]/50 text-xs tracking-[0.2em] uppercase font-sans mb-4">
                <span>✦</span><span>Trải Bài</span><span>✦</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-medium text-[#D5E0D8]">Định Dạng Mức Độ</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left font-sans">
              {spreads.map(s => (
                <button key={s.label} onClick={() => { if(!s.locked){ setSpread(s.value); setStep(2); } }} 
                  className={`relative p-8 rounded-2xl border transition-all flex flex-col bg-[#061812]
                    ${s.value === 3 ? 'border-[#F2D794]/70 shadow-[0_0_20px_rgba(242,215,148,0.1)] -translate-y-2 transform' : 'border-[#123124] hover:border-[#F2D794]/30 hover:-translate-y-1'} 
                    ${s.locked ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {s.locked && <Lock className="absolute top-6 right-6 w-5 h-5 text-[#84A999]" />}
                  <h3 className={`text-xl font-serif mb-3 ${s.value === 3 ? 'text-[#F2D794]' : 'text-[#D5E0D8]'}`}>{s.label}</h3>
                  <p className="text-[#84A999] text-sm leading-relaxed">{s.desc}</p>
                </button>
              ))}
            </div>
            
            <button onClick={()=>setStep(0)} className="text-[#84A999] hover:text-[#F2D794] text-xs font-sans tracking-widest uppercase flex items-center gap-2 justify-center mx-auto transition-colors">
              <ArrowLeft className="w-4 h-4"/> Dừng & Chọn Lại Chủ Đề
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-3xl mx-auto text-center space-y-12 animate-in zoom-in-95 duration-700">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-medium text-[#F2D794]">Vũ Trụ Đang Lắng Nghe</h1>
              <p className="text-[#84A999] text-lg font-sans">Hãy tĩnh tâm và nhập điều bạn đang thắc mắc...</p>
            </div>
            <div className="text-left relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#123828] via-[#F2D794]/20 to-[#123828] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <textarea 
                className="relative w-full bg-[#061812] border border-[#1A4533] focus:border-[#F2D794]/50 rounded-2xl p-8 h-48 text-lg md:text-xl text-[#D5E0D8] outline-none transition-all resize-none font-serif placeholder:text-[#385949]"
                placeholder="Ví dụ: Người này có thực sự nghiêm túc với tôi không?..."
                value={question} onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 font-sans">
              <button onClick={() => setStep(3)} className="px-12 py-5 bg-[#F2D794] text-[#04100C] font-bold tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(242,215,148,0.3)] hover:shadow-[0_0_30px_rgba(242,215,148,0.5)] transition-all text-sm flex items-center justify-center gap-3 w-full sm:w-auto">
                Kết Nối & Rút Bài <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => { setQuestion(""); setStep(3); }} className="text-xs font-bold text-[#84A999] hover:text-[#F2D794] transition-colors uppercase tracking-[0.1em] underline underline-offset-4 decoration-[#84A999]/30">
                Bỏ Qua Nhập Cụ Thể
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-5xl mx-auto text-center space-y-16 animate-in fade-in duration-1000">
            <div className="space-y-6">
               <h1 className="text-3xl md:text-5xl font-medium text-[#F2D794] drop-shadow-sm">Thông Điệp Hôm Nay</h1>
               <p className="text-[#84A999] font-sans text-sm md:text-base tracking-widest uppercase">
                 Bấm Để Rút. Giữ Nhịp Thở Đều ({flippedIndexes.length}/{spread})
               </p>
               <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#F2D794]/20 to-transparent mx-auto"></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {drawnCards.map((card, idx) => {
                const isFlipped = flippedIndexes.includes(idx);
                return (
                  <div key={idx} onClick={() => handleFlip(idx)} className="relative w-44 h-[300px] md:w-56 md:h-[380px] cursor-pointer group" style={{ perspective: '1200px' }}>
                    <div className="w-full h-full relative rounded-xl hover:-translate-y-2" style={{ transformStyle: 'preserve-3d', transition: 'all 0.9s cubic-bezier(0.23, 1, 0.32, 1)', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                      
                      {/* Cổ điển: Card Back Style */}
                      <div className="absolute inset-0 w-full h-full rounded-xl border border-[#F2D794]/40 bg-[#061812] shadow-[0_0_30px_rgba(10,38,28,0.8)] overflow-hidden flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                         <div className="absolute inset-2 border border-[#1A4533] rounded-lg"></div>
                         <div className="absolute inset-5 border border-[#1A4533]/50 border-dashed rounded-md"></div>
                         <Star className="w-6 h-6 text-[#F2D794]/60 mb-8" />
                         <span className="text-[#F2D794] font-serif tracking-[0.2em] font-medium text-sm">BẤM ĐỂ RÚT</span>
                         <span className="text-[#55826A] font-sans tracking-[0.1em] text-[10px] mt-2">GIỮ NHỊP THỞ</span>
                         <Star className="w-6 h-6 text-[#F2D794]/60 mt-8" />
                         
                         {/* Card Glow Effect */}
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F2D794]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      
                      {/* Card Front */}
                      <div className="absolute inset-0 w-full h-full rounded-xl bg-white overflow-hidden shadow-2xl border-2 border-[#F2D794]/20 p-2" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                         <div className={`w-full h-full relative overflow-hidden rounded bg-[#03110A] border border-gray-200 ${card.isReversed ? 'rotate-180' : ''}`}>
                           <img src={card.image} alt={card.name_vn} className="absolute inset-0 w-full h-full object-cover" />
                           {/* Add a subtle overlay so images align with dark theme slightly */}
                           <div className="absolute inset-0 bg-[#062017] mix-blend-multiply opacity-20 pointer-events-none"></div>
                         </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`transition-all duration-1000 pt-8 ${flippedIndexes.length === spread ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
               <button onClick={submitToAI} className="px-12 py-5 bg-transparent border border-[#F2D794]/50 text-[#F2D794] font-sans text-sm tracking-[0.2em] uppercase rounded-full hover:bg-[#F2D794] hover:text-[#04100C] transition-all flex items-center justify-center gap-3 mx-auto shadow-[0_0_20px_rgba(242,215,148,0.1)] hover:shadow-[0_0_30px_rgba(242,215,148,0.3)]">
                 Luận Giải Lá Bài Lưỡng Nghĩa
               </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="w-full flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-1000 min-h-[50vh]">
            <div className="relative flex items-center justify-center w-32 h-32">
              <div className="absolute inset-0 border-[2px] border-[#1A4533] rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-[#F2D794]/30 border-dashed rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
              <Sparkles className="w-8 h-8 text-[#F2D794] animate-pulse" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif text-[#D5E0D8] tracking-widest text-center px-4 uppercase">{loadingText}</h2>
          </div>
        )}

        {step === 5 && result && (
          <div className="w-full max-w-3xl mx-auto animate-in slide-in-from-bottom-12 duration-1000 space-y-16">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-medium text-[#F2D794]">Thông Điệp Hôm Nay</h1>
              <p className="text-[#84A999] font-sans text-sm tracking-[0.2em] uppercase">Mở ra những năng lượng tiềm ẩn</p>
              <div className="w-32 h-[1px] bg-[#1A4533] mx-auto mt-6"></div>
            </div>

            {/* Displaying drawn cards as a mystic display */}
            <div className="flex flex-col items-center gap-12 pt-8">
               {drawnCards.map((card, idx) => (
                 <div key={idx} className="flex flex-col items-center gap-6 w-full max-w-sm">
                    {/* The Card */}
                    <div className="w-56 h-[380px] p-2 bg-white rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border-2 border-[#F2D794]/20">
                      <div className={`w-full h-full relative rounded overflow-hidden ${card.isReversed ? 'rotate-180' : ''}`}>
                         <img src={card.image} alt={card.name_vn} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    {/* The Mystic Label */}
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center gap-4 text-[#F2D794] text-xs font-serif tracking-[0.2em] uppercase">
                        <span>✦</span> <span className="text-[14px] md:text-base font-bold">{card.name_vn}</span> <span>✦</span>
                      </div>
                      <div className="inline-block px-3 py-0.5 border border-[#8B2C2C] bg-[#8B2C2C]/10 text-[#E26B6B] text-[10px] font-sans font-bold uppercase rounded-full">
                         {card.isReversed ? 'Ngược' : 'Xuôi'}
                      </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* The Hook (Free Tier Focus) */}
            <div className="py-12 border-y border-[#1A4533] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Sparkles className="w-32 h-32 text-[#F2D794]" />
              </div>
              <p className="text-2xl md:text-3xl text-[#D5E0D8] font-serif leading-relaxed text-balance relative z-10 px-6">
                "{result.hookInsight}"
              </p>
              <div className="flex items-center justify-center gap-3 mt-8">
                <span className="w-2 h-2 rotate-45 bg-[#F2D794]/50"></span>
                <span className="text-[#84A999] font-sans text-xs tracking-widest uppercase">#ThongDiepVip</span>
                <span className="w-2 h-2 rotate-45 bg-[#F2D794]/50"></span>
              </div>
            </div>

            {/* Paywall Container */}
            <div className="relative rounded-2xl overflow-hidden bg-[#061812] border border-[#1A4533]">
              
              {/* Blurred Secret Content */}
              <div className={`p-8 md:p-12 space-y-12 transition-all duration-1000 ${!isUnlocked ? 'blur-md opacity-30 select-none pointer-events-none max-h-[400px]' : 'max-h-[5000px]'}`}>
                <div>
                  <h3 className="text-sm text-[#F2D794] font-sans tracking-[0.2em] font-bold mb-6 uppercase flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#F2D794]/50"></span> Giải mã năng lượng
                  </h3>
                  <p className="text-[#B4CFC3] leading-loose text-lg whitespace-pre-line font-serif">{result.fullStory}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-10">
                  <div>
                    <h3 className="text-sm text-[#F2D794] font-sans tracking-[0.2em] font-bold mb-4 uppercase flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-[#F2D794]/50"></span> Nhận định
                    </h3>
                    <p className="text-[#D5E0D8] leading-relaxed font-serif text-lg">{result.conclusion}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#F2D794] font-sans tracking-[0.2em] font-bold mb-4 uppercase flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-[#F2D794]/50"></span> Lời khuyên
                    </h3>
                    <p className="text-[#D5E0D8] leading-relaxed font-serif text-lg">{result.advice}</p>
                  </div>
                </div>
              </div>

              {/* Velvet Paywall Overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#04100C] via-[#04100C]/80 to-transparent flex flex-col items-center justify-end pb-16 px-6">
                  <div className="bg-[#0A261C]/90 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-[#F2D794]/20 text-center max-w-md w-full">
                     <Lock className="w-8 h-8 text-[#F2D794] mx-auto mb-6 opacity-80" />
                     <h4 className="text-xl font-serif text-[#D5E0D8] mb-3 tracking-wide">Giải mã sâu cặn kẽ 100%</h4>
                     <p className="text-[#84A999] mb-8 font-sans text-sm leading-relaxed">
                       Vũ trụ còn nhiều thông điệp chi tiết muốn gửi gắm rành rọt nhất dành riêng cho năng lượng của bạn lúc này.
                     </p>
                     
                     <button onClick={() => setIsUnlocked(true)} className="w-full py-4 border border-[#F2D794] text-[#F2D794] hover:bg-[#F2D794] hover:text-[#04100C] font-sans text-sm tracking-widest uppercase font-bold rounded-full transition-all flex items-center justify-center gap-3">
                       MỞ KHÓA BÀI LUẬN <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              )}
            </div>

            {isUnlocked && (
               <div className="pt-16 text-center animate-in fade-in duration-1000">
                 <button onClick={() => { setStep(0); setDrawnCards([]); setFlippedIndexes([]); setResult(null); setIsUnlocked(false); }} 
                    className="text-[#84A999] hover:text-[#F2D794] font-sans text-xs tracking-[0.2em] font-bold uppercase underline underline-offset-8 decoration-[#84A999]/30 transition-colors">
                    Hoàn tất quá trình & Đặt câu hỏi mới
                 </button>
               </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
