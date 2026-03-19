"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Compass, Moon, Star } from "lucide-react";

export default function Home() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob) return;
    const params = new URLSearchParams({ name, dob });
    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden bg-[#020617] font-sans selection:bg-purple-500/30">
      
      {/* Dynamic Cosmic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '3s' }}></div>
         <div className="absolute top-[40%] left-[60%] w-[40vw] h-[40vw] bg-rose-900/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '5s' }}></div>
         
         {/* Subtle Stars */}
         <Star className="absolute top-[15%] left-[15%] w-6 h-6 text-white/10 animate-pulse" />
         <Star className="absolute top-[25%] right-[20%] w-8 h-8 text-yellow-100/10 animate-pulse" style={{ animationDelay: '1s' }} />
         <Star className="absolute bottom-[20%] left-[25%] w-5 h-5 text-purple-200/10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="z-10 w-full max-w-xl mx-auto">
        <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[2.5rem]"></div>
          
          <div className="relative px-8 py-12 sm:px-14 sm:py-16 rounded-[2.5rem] bg-gradient-to-br from-black/20 to-black/60 shadow-inner">
            
            {/* Logo area */}
            <div className="flex justify-center mb-8 relative">
              <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full w-24 h-24 mx-auto"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-900 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-purple-400/30">
                <Compass className="w-12 h-12 text-white drop-shadow-md" />
              </div>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-widest uppercase text-white drop-shadow-lg leading-tight">
                Bản Đồ <br/><span className="gold-gradient-text">Thần Số Học</span>
              </h1>
              <p className="text-purple-200/60 text-xs sm:text-sm tracking-[0.3em] font-bold uppercase">
                Giải mã thiết kế linh hồn
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-3 relative group">
                <label htmlFor="name" className="block text-xs font-bold text-white/50 tracking-[0.2em] uppercase ml-2 transition-colors group-focus-within:text-purple-400">
                  Họ và tên khai sinh <span className="text-red-400/80">*</span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: NGUYỄN VĂN A"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-purple-500 focus:bg-white/10 text-white placeholder-white/20 transition-all outline-none font-bold text-lg shadow-inner uppercase"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>

              <div className="space-y-3 relative group">
                <label htmlFor="dob" className="block text-xs font-bold text-white/50 tracking-[0.2em] uppercase ml-2 transition-colors group-focus-within:text-purple-400">
                  Ngày sinh dương lịch <span className="text-red-400/80">*</span>
                </label>
                <div className="relative">
                  <input
                    id="dob"
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-purple-500 focus:bg-white/10 text-white placeholder-white/20 transition-all outline-none font-bold text-lg appearance-none shadow-inner tracking-widest uppercase"
                    style={{ colorScheme: "dark" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-5 px-6 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-500 hover:from-purple-500 hover:via-fuchsia-500 hover:to-orange-400 text-white rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(192,132,252,0.4)] transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 group border border-white/20 tracking-wider"
                >
                  <Sparkles className="w-5 h-5 text-yellow-200" />
                  GIẢI MÃ BẢN MỆNH
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

            </form>
          </div>
        </div>
        
        <div className="text-center mt-10 text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-2">
           <Moon className="w-3 h-3" /> Năng lượng Pythagoras
        </div>
      </div>
    </main>
  );
}
