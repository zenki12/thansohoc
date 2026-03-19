"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Compass, Moon, Star, Sun, User, Clock } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'thansohoc' | 'tuvi' | 'matrix'>('thansohoc');
  
  // Shared state
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  
  // Tu Vi specific state
  const [birthTime, setBirthTime] = useState("");
  const [gender, setGender] = useState("nam");
  
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob) return;
    
    if (activeTab === 'thansohoc') {
      const params = new URLSearchParams({ name, dob });
      router.push(`/result?${params.toString()}`);
    } else if (activeTab === 'matrix') {
      const params = new URLSearchParams({ name, dob });
      router.push(`/matrix/result?${params.toString()}`);
    } else {
      if (!birthTime) return;
      const params = new URLSearchParams({ name, dob, time: birthTime, gender });
      router.push(`/tuvi/result?${params.toString()}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden bg-[#020617] font-sans selection:bg-purple-500/30">
      
      {/* Dynamic Cosmic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '3s' }}></div>
         <div className="absolute top-[40%] left-[60%] w-[40vw] h-[40vw] bg-rose-900/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '5s' }}></div>
         
         <Star className="absolute top-[15%] left-[15%] w-6 h-6 text-white/10 animate-pulse" />
         <Star className="absolute top-[25%] right-[20%] w-8 h-8 text-yellow-100/10 animate-pulse" style={{ animationDelay: '1s' }} />
         <Star className="absolute bottom-[20%] left-[25%] w-5 h-5 text-purple-200/10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="z-10 w-full max-w-xl mx-auto mt-8">
        
        {/* Tab Selector */}
        <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1.5 mb-8 border border-white/10 shadow-lg max-w-lg mx-auto relative z-20">
          <button 
            type="button"
            onClick={() => setActiveTab('thansohoc')}
            className={`flex-1 py-3 px-2 sm:px-4 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1 sm:gap-2 ${activeTab === 'thansohoc' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-white/50 hover:text-white/80'}`}
          >
            <Compass className="w-3 sm:w-4 h-3 sm:h-4" /> <span className="hidden sm:inline">Thần Số Học</span><span className="sm:hidden">Thần Số</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('tuvi')}
            className={`flex-1 py-3 px-2 sm:px-4 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1 sm:gap-2 ${activeTab === 'tuvi' ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md' : 'text-white/50 hover:text-white/80'}`}
          >
            <Sun className="w-3 sm:w-4 h-3 sm:h-4" /> <span className="hidden sm:inline">Lá Số Tử Vi</span><span className="sm:hidden">Tử Vi</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`flex-1 py-3 px-2 sm:px-4 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1 sm:gap-2 ${activeTab === 'matrix' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-white/50 hover:text-white/80'}`}
          >
            <Star className="w-3 sm:w-4 h-3 sm:h-4" /> <span className="hidden sm:inline">Ma Trận CĐ</span><span className="sm:hidden">Ma Trận</span>
          </button>
        </div>

        <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[2.5rem]"></div>
          
          <div className="relative px-8 py-10 sm:px-14 sm:py-14 rounded-[2.5rem] bg-gradient-to-br from-black/20 to-black/60 shadow-inner">
            
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-black mb-3 tracking-widest uppercase text-white drop-shadow-lg leading-tight">
                {activeTab === 'thansohoc' ? (
                  <>Bản Đồ <br/><span className="gold-gradient-text">Thần Số Học</span></>
                ) : activeTab === 'tuvi' ? (
                  <>Giải Mã <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-500 to-orange-500">Lá Số Tử Vi</span></>
                ) : (
                  <>Ma Trận <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-500">Định Mệnh</span></>
                )}
              </h1>
              <p className="text-white/60 text-xs sm:text-sm tracking-[0.2em] font-medium uppercase">
                {activeTab === 'thansohoc' ? "Khám phá thiết kế linh hồn" : activeTab === 'tuvi' ? "Bình giải vận mệnh trọn đời" : "Đánh thức tiềm năng ẩn sâu"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2 relative group">
                <label className="block text-xs font-bold text-white/50 tracking-[0.2em] uppercase ml-2 transition-colors group-focus-within:text-white/90">
                  Họ và tên <span className="text-red-400/80">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: NGUYỄN VĂN A"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-white/50 focus:bg-white/10 text-white placeholder-white/20 transition-all outline-none font-bold text-base shadow-inner uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="block text-xs font-bold text-white/50 tracking-[0.2em] uppercase ml-2 transition-colors group-focus-within:text-white/90">
                  Ngày sinh dương lịch <span className="text-red-400/80">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-white/50 focus:bg-white/10 text-white placeholder-white/20 transition-all outline-none font-bold text-base appearance-none shadow-inner tracking-widest uppercase"
                    style={{ colorScheme: "dark" }}
                  />
                </div>
              </div>

              {activeTab === 'tuvi' && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="space-y-2 relative group">
                    <label className="block text-xs font-bold text-white/50 tracking-[0.2em] uppercase ml-2 transition-colors group-focus-within:text-white/90">
                      Giới tính <span className="text-red-400/80">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-amber-500 focus:bg-white/10 text-white transition-all outline-none font-bold text-base shadow-inner uppercase appearance-none"
                      >
                        <option value="nam" className="bg-slate-900">Nam Mệnh</option>
                        <option value="nu" className="bg-slate-900">Nữ Mệnh</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 relative group">
                    <label className="block text-xs font-bold text-white/50 tracking-[0.2em] uppercase ml-2 transition-colors group-focus-within:text-white/90">
                      Giờ sinh <span className="text-red-400/80">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        required={activeTab === 'tuvi'}
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-amber-500 focus:bg-white/10 text-white transition-all outline-none font-bold text-base shadow-inner uppercase appearance-none"
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  className={`w-full py-5 px-6 rounded-2xl font-black text-lg transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 group border border-white/20 tracking-wider text-white ${
                    activeTab === 'thansohoc' 
                      ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-500 hover:from-purple-500 hover:via-fuchsia-500 hover:to-orange-400 shadow-[0_0_30px_rgba(192,132,252,0.4)]'
                      : activeTab === 'tuvi'
                      ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]'
                      : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 shadow-[0_0_30px_rgba(20,184,166,0.4)]'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-yellow-200" />
                  {activeTab === 'thansohoc' ? 'GIẢI MÃ BẢN MỆNH' : activeTab === 'tuvi' ? 'LẬP LÁ SỐ TỬ VI' : 'MỞ KHÓA MA TRẬN'}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
