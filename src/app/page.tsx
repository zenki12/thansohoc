"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="z-10 w-full max-w-lg glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl relative border border-white/10 bg-white/5">
        <div className="text-center mb-10">
          <div className="mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 shadow-lg shadow-purple-500/30">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight text-white">
            Bản Đồ <span className="gold-gradient-text">Thần Số Học</span>
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            Khám phá mật ngữ các con số và thấu hiểu bản mệnh
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label htmlFor="name" className="block text-sm font-medium text-white/90">
              Họ và tên khai sinh <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Nguyễn Văn A"
              className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-white/30 transition-all outline-none"
            />
            <p className="text-xs text-white/50">Nhập đúng tên trên CCCD/Giấy khai sinh</p>
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="dob" className="block text-sm font-medium text-white/90">
              Ngày tháng năm sinh dương lịch <span className="text-red-400">*</span>
            </label>
            <input
              id="dob"
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 text-white placeholder-white/30 transition-all outline-none appearance-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow-xl shadow-purple-900/30 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            Bắt đầu Phân tích
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </main>
  );
}
