"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Telescope, BrainCircuit, RotateCw, Fingerprint, Network, Target, Compass, Zap, Heart, Anchor, Scale, Shield, ArrowUp, Atom, X } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [gender, setGender] = useState("nam");
  const [selectedFeature, setSelectedFeature] = useState<"tuvi" | "numerology" | "matrix">("tuvi");

  // State cho Modal Liên Hệ
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleNavigate = () => {
    if (!name || !dob) {
      alert("Vui lòng nhập đầy đủ Họ tên và Ngày sinh!");
      return;
    }
    const params = new URLSearchParams({ name, dob });
    if (time) params.append("time", time);
    params.append("gender", gender);
    
    if (selectedFeature === "tuvi") router.push(`/tuvi/result?${params.toString()}`);
    else if (selectedFeature === "numerology") router.push(`/result?${params.toString()}`);
    else if (selectedFeature === "matrix") router.push(`/matrix/result?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D3748] font-sans overflow-hidden relative selection:bg-orange-200">
      
      {/* -------------------- BACKGROUND EFFECTS -------------------- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Top Right Orange Blob */}
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-orange-300/20 rounded-full blur-[100px] animate-blob mix-blend-multiply"></div>
        {/* Top Left Peach Blob - Delayed */}
        <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-200/30 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
        {/* Center Yellow Blob - Delayed */}
        <div className="absolute top-[40%] left-[30%] w-[60vw] h-[60vw] bg-amber-100/40 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
        
        {/* Top Abstract Wave */}
        <svg className="absolute top-0 w-full text-orange-50/50 drop-shadow-md" viewBox="0 0 1440 320" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,154.7C672,128,768,96,864,101.3C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      {/* -------------------- NAVBAR -------------------- */}
      <nav className="relative z-50 flex items-center justify-between px-8 md:px-16 py-6 backdrop-blur-sm border-b border-orange-500/10">
        <div className="flex items-center gap-3 cursor-pointer group group-hover:bg-gray-50 p-2 rounded-2xl transition-all">
          <div className="w-10 h-10 flex items-center justify-center text-orange-400 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out">
            <Atom className="w-10 h-10 relative z-10" strokeWidth={2.5} />
          </div>
          <span className="text-[26px] font-black text-gray-600 tracking-tight">Khám Phá Bản Thân</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide text-gray-600">
          <a href="#gioi-thieu" className="hover:text-orange-500 transition-colors">Giới thiệu</a>
          <a href="#loi-ich" className="hover:text-orange-500 transition-colors">Lợi ích</a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* -------------------- HERO SECTION -------------------- */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          {/* Left Column: Form Setup */}
          <div className="space-y-8 relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-200 shadow-sm text-sm text-orange-600 font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-orange-500" /> Bản Cập Nhật AI 2026
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black leading-[1.15] text-[#1A202C] tracking-tight">
              Khám phá <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 drop-shadow-sm">bản thân</span><br/>
              qua lăng kính <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Trí tuệ Nhân tạo</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg font-medium">
              Bạn luôn tò mò về tương lai?
              Chúng tôi mang đến trải nghiệm giải đoán vận mệnh hoàn toàn mới, 
              kết hợp tinh hoa Cổ học và sức mạnh AI hiện đại.
            </p>

            {/* Glassmorphic Form Container */}
            <div className="glass-card p-8 rounded-3xl relative shadow-[0_20px_60px_-15px_rgba(249,115,22,0.15)] block">
              {/* Form Glow */}
              <div className="absolute inset-0 bg-white/60 rounded-3xl pointer-events-none"></div>
              
              <div className="relative z-10 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Họ và Tên</label>
                    <input 
                      type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập họ tên đầy đủ..."
                      className="w-full bg-white/70 border border-gray-200 text-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all shadow-inner font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Giới tính</label>
                    <select 
                      value={gender} onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-white/70 border border-gray-200 text-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all shadow-inner font-medium cursor-pointer"
                    >
                      <option value="nam">Nam giới</option>
                      <option value="nu">Nữ giới</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Ngày sinh (Dương)</label>
                    <input 
                      type="date" value={dob} onChange={(e) => setDob(e.target.value)}
                      className="w-full bg-white/70 border border-gray-200 text-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all shadow-inner font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Giờ sinh (Có thể bỏ)</label>
                    <input 
                      type="time" value={time} onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-white/70 border border-gray-200 text-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all shadow-inner font-medium"
                    />
                  </div>
                </div>

                {/* Feature Selector */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Bạn muốn xem gì?</label>
                  <div className="grid grid-cols-3 gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200">
                    <button onClick={() => setSelectedFeature("tuvi")} className={`py-3 rounded-xl font-bold transition-all text-sm md:text-base ${selectedFeature === 'tuvi' ? 'bg-white text-orange-600 shadow-md ring-1 ring-orange-500/20' : 'text-gray-500 hover:text-gray-800'}`}>Lá Số Tử Vi</button>
                    <button onClick={() => setSelectedFeature("numerology")} className={`py-3 rounded-xl font-bold transition-all text-sm md:text-base ${selectedFeature === 'numerology' ? 'bg-white text-amber-600 shadow-md ring-1 ring-amber-500/20' : 'text-gray-500 hover:text-gray-800'}`}>Thần Số Học</button>
                    <button onClick={() => setSelectedFeature("matrix")} className={`py-3 rounded-xl font-bold transition-all text-sm md:text-base ${selectedFeature === 'matrix' ? 'bg-white text-cyan-600 shadow-md ring-1 ring-cyan-500/20' : 'text-gray-500 hover:text-gray-800'}`}>Ma Trận Định Mệnh</button>
                  </div>
                </div>

                {/* Single Submit Button */}
                <div className="pt-2">
                  <button onClick={handleNavigate} className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_25px_rgba(249,115,22,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg">
                    <Sparkles className="w-5 h-5" />
                    Bắt Đầu Giải Mã
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 12 Zodiac Orbit Illustration */}
          <div className="relative h-[600px] w-full hidden lg:block">
            {/* Center Main Circular Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-gradient-to-tr from-orange-200/40 to-rose-200/40 rounded-full border border-white/60 shadow-[0_0_80px_rgba(249,115,22,0.2)] backdrop-blur-3xl flex flex-col items-center justify-center z-10 animate-pulse-slow">
               <Sparkles className="w-10 h-10 text-orange-500 mb-2" />
               <h3 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500 uppercase tracking-widest text-center px-4">Đại Chu Kỳ<br/>Vận Mệnh</h3>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-orange-300/30 rounded-full animate-[spin_30s_linear_infinite] border-dashed z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-rose-200/20 rounded-full z-0"></div>

            {/* Rotating 12 Zodiacs */}
            <div className="absolute top-1/2 left-1/2 w-[520px] h-[520px] -ml-[260px] -mt-[260px] animate-[spin_60s_linear_infinite] z-20 pointer-events-none">
              {["🐭 Tý", "🐃 Sửu", "🐯 Dần", "🐱 Mão", "🐲 Thìn", "🐍 Tỵ", "🐴 Ngọ", "🐐 Mùi", "🐵 Thân", "🐔 Dậu", "🐶 Tuất", "🐷 Hợi"].map((zodiac, i) => {
                const angle = (i * 360) / 12;
                return (
                  <div 
                    key={i}
                    className="absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10"
                    style={{ transform: `rotate(${angle}deg) translateY(-260px)` }}
                  >
                     <div 
                       className="w-full h-full bg-white/90 backdrop-blur-md border border-orange-100 shadow-xl rounded-2xl flex flex-col items-center justify-center animate-[spin_60s_linear_infinite_reverse]"
                     >
                       <span className="text-3xl drop-shadow-sm">{zodiac.split(' ')[0]}</span>
                       <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase mt-1">{zodiac.split(' ')[1]}</span>
                     </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* -------------------- KHOA HỌC TRONG LUẬN GIẢI -------------------- */}
        <section id="gioi-thieu" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#1A202C] mb-6 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Khoa Học</span> trong giải mã vận mệnh
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                Chúng tôi cốt lõi hóa một tuần hoàn tinh hoa vạn năm, kết hợp kiến thức truyền thống với siêu năng lực phân tích dữ liệu khổng lồ của AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 border border-orange-200 group-hover:bg-orange-500 transition-colors">
                  <Telescope className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Tam Hợp Phái</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Luận giải dựa trên sự kết hợp giữa các nguyên lý Tứ Trụ, Tam Hợp Phái mang đến những góc nhìn đa chiều về cục diện Tử vi.</p>
              </div>
              {/* Card 2 */}
              <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300 lg:col-span-2 bg-gradient-to-br from-white/80 to-orange-50/80 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
                  <BrainCircuit className="w-64 h-64 text-orange-500" />
                </div>
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 border border-rose-200 group-hover:bg-rose-500 transition-colors relative z-10">
                  <BrainCircuit className="w-7 h-7 text-rose-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 relative z-10">Công Nghệ Siêu AI LLaMA 3.3</h3>
                <p className="text-gray-500 text-md leading-relaxed relative z-10 max-w-sm">Hệ thống phân tích hàng triệu mô hình tâm lý ngôn ngữ bằng Groq AI siêu tốc để đưa ra lời bình sắc sảo, có chiều sâu nhất thay vì những khuôn mẫu vô hồn.</p>
              </div>
              {/* Card 3 */}
              <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 border border-amber-200 group-hover:bg-amber-500 transition-colors">
                  <RotateCw className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Tự Động Cập Nhật</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Liên tục tối ưu hóa thuật toán sau mỗi lần cập nhật API AI để đảm bảo phản hồi tức thì và chính xác hiện đại.</p>
              </div>
              {/* Card 4 */}
              <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300 lg:col-span-2 bg-gradient-to-bl from-white/80 to-rose-50/80">
                <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 border border-cyan-200 group-hover:bg-cyan-500 transition-colors">
                  <Fingerprint className="w-7 h-7 text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Cá Nhân Hóa Độc Nhất</h3>
                <p className="text-gray-500 text-md leading-relaxed max-w-md">Mỗi cá thể là một vũ trụ duy nhất. Trí tuệ AI của chúng tôi sinh ra những bản giải dành riêng duy nhất chỉ phù hợp với chính sinh mệnh của bạn.</p>
              </div>
              {/* Card 5 */}
              <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300 lg:col-span-2 relative overflow-hidden bg-[#1A202C] text-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                  <Network className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Kết Hợp Đột Phá Đa Chiều</h3>
                <p className="text-gray-400 text-md leading-relaxed max-w-sm">Không gò bó trong một hệ quy chiếu. Bạn vừa có Tử Vi, Thần Số, và Ma Trận, nhìn bao quát mọi khía cạnh bản thân, loại bỏ rào cản tôn giáo, triết lý.</p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------- SMART ANALYTICS NETWORK (Sơ Đồ Thông Minh) -------------------- */}
        <section className="py-24 relative overflow-hidden bg-orange-50/30">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-16 relative z-10">
             <div>
               <h2 className="text-3xl md:text-5xl font-black text-[#1A202C] mb-4">
                 Luận Giải Trực Tiếp <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Thông Minh</span>
               </h2>
               <p className="text-gray-500 text-lg">AI sẽ phân tích lá số để gom nối dữ liệu tinh hoa truyền thống vào một mạng lưới logic chặt chẽ.</p>
             </div>
             
             {/* Beautiful Animated SVG Node Diagram */}
             <div className="relative w-full aspect-[2/1] md:aspect-[3/1] max-w-4xl mx-auto glass-card rounded-3xl flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#f97316" stopOpacity="0.2"/>
                       <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8"/>
                    </linearGradient>
                    <filter id="glowSVG" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Lines radiating from center */}
                  <g className="animate-pulse">
                    <line x1="400" y1="150" x2="200" y2="80" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="5,5" />
                    <line x1="400" y1="150" x2="600" y2="80" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="5,5" />
                    <line x1="400" y1="150" x2="150" y2="220" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="5,5" />
                    <line x1="400" y1="150" x2="650" y2="220" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="5,5" />
                  </g>

                  {/* Outer Nodes */}
                  <circle cx="200" cy="80" r="25" fill="#fff" stroke="#f97316" strokeWidth="4" filter="url(#glowSVG)"/>
                  <text x="200" y="85" textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="bold">Tình Yêu</text>

                  <circle cx="600" cy="80" r="25" fill="#fff" stroke="#f43f5e" strokeWidth="4" filter="url(#glowSVG)"/>
                  <text x="600" y="85" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="bold">Sự Nghiệp</text>

                  <circle cx="150" cy="220" r="25" fill="#fff" stroke="#06b6d4" strokeWidth="4" filter="url(#glowSVG)"/>
                  <text x="150" y="225" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">Sức Khỏe</text>

                  <circle cx="650" cy="220" r="25" fill="#fff" stroke="#8b5cf6" strokeWidth="4" filter="url(#glowSVG)"/>
                  <text x="650" y="225" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Bản Ngã</text>

                  {/* Center Node */}
                  <circle cx="400" cy="150" r="50" fill="#fff" stroke="url(#lineGrad)" strokeWidth="8" filter="url(#glowSVG)"/>
                  <text x="400" y="155" textAnchor="middle" fill="#1A202C" fontSize="18" fontWeight="900">AI CORE</text>
                </svg>
             </div>
          </div>
        </section>

        {/* -------------------- BENEFITS GRID -------------------- */}
        <section id="loi-ich" className="py-24 bg-white relative">
          <div className="absolute left-0 bottom-0 w-full h-[500px] bg-gradient-to-t from-orange-50/50 to-transparent pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
             <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-black text-[#1A202C] mb-4">
                 Khám phá <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Bản Thân</span> - Tự tin <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 border-b-4 border-orange-400">Tương Lai</span>
               </h2>
               <p className="text-gray-500 font-medium">Kết hợp tinh hoa Huyền Học & Trí Tuệ Nhân Tạo để vạch đường dẫn lối trọn đời.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <BenefitCard icon={<Zap/>} color="orange" title="Hiểu Rõ Bản Thân" desc="Phân tích sâu sắc nhân cách, năng lực tiềm ẩn và điểm mạnh yếu của bạn." />
               <BenefitCard icon={<Target/>} color="rose" title="Định Hướng Tương Lai" desc="Nhận được bản báo cáo đường tài lộc, công danh 10 năm tới sắc nét và rõ ràng." />
               <BenefitCard icon={<Compass/>} color="amber" title="Phát Triển Tiềm Năng" desc="Làm bệ phóng để tìm ra phương pháp tu dưỡng khai thác mạnh mẽ vận hạn vàng." />
               
               <BenefitCard icon={<Shield/>} color="emerald" title="Tăng Cường Nội Lực" desc="Lấy lại sự tin rẽ lối con đường, vượt qua rắc rối, nâng cấp nhân sinh quan, trí huệ." />
               <BenefitCard icon={<Heart/>} color="pink" title="Cải Thiện Mối Quan Hệ" desc="Thấu hiểu lý do sự kết nối với người đời, mở rộng lòng bao dung, thâu tóm tâm lý đối phương." />
               <BenefitCard icon={<Scale/>} color="blue" title="Cân Bằng Cuộc Sống" desc="Tìm phương án hài hòa giữa sự nghiệp, gia đình, tinh thần tâm linh." />
             </div>
          </div>
        </section>

        {/* -------------------- CTA & FOOTER -------------------- */}
        <section className="py-32 relative text-center">
            {/* Background Blob for CTA */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-orange-200/40 rounded-full blur-[150px] pointer-events-none mix-blend-multiply z-0"></div>

            <div className="relative z-10 max-w-2xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-black text-[#1A202C] mb-8 tracking-tight">
                Khám Phá <span className="text-orange-500">Vận Mệnh</span> Của Bạn Ngay!
              </h2>
              <p className="text-gray-600 text-lg mb-10 font-medium font-sans">
                Hãy để AI thắp sáng góc khuất, giải phẫu bản thể và hé lộ triết lý tối thượng của đời bạn chỉ trong vài giây gõ phím.
              </p>
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="px-10 py-5 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xl font-bold rounded-full shadow-[0_20px_40px_rgba(249,115,22,0.4)] hover:shadow-[0_25px_50px_rgba(249,115,22,0.5)] hover:-translate-y-2 transition-all group">
                Lên Đỉnh Vận Mệnh! 🚀
                <span className="block text-xs font-normal opacity-80 mt-1 uppercase tracking-widest">(Trở lên Form Nhập Liệu)</span>
              </button>
            </div>
        </section>

      </main>

        {/* -------------------- FOOTER -------------------- */}
        <footer className="py-12 bg-gray-50/50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
            
            <div className="text-center space-y-3 mb-4">
              <p className="text-gray-600 font-medium">✨ Khám phá bản thân hoàn toàn <span className="text-orange-500 font-bold uppercase">Miễn Phí</span></p>
              <div className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
                <p>Sứ mệnh của công cụ này là mang đến một góc nhìn tham khảo hữu ích, giúp bạn có thêm nguồn động lực tích cực và vạch ra những định hướng mới cho tương lai.</p>
                <p className="mt-2 text-gray-600 font-medium">Hãy luôn nhớ rằng: Lộ trình cuộc đời bạn nằm chính trong tay của bạn.</p>
              </div>
              <p className="text-orange-500 italic text-lg md:text-xl mt-4 font-bold tracking-wide drop-shadow-sm">
                "Đức năng thắng số..."
              </p>
            </div>

            <div className="w-16 h-[1px] bg-gray-200"></div>

            <div className="flex items-center gap-2 text-gray-500 font-medium text-sm md:text-base bg-white px-6 py-2 rounded-full border border-gray-100 shadow-sm mt-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>by</span>
              <span className="text-gray-800 font-bold ml-1">Xuân Thái</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-medium tracking-wide">
              <span onClick={() => router.push('/privacy')} className="hover:text-orange-500 transition-colors cursor-pointer">Chính sách bảo mật</span>
              <span className="text-gray-300 hidden md:inline">•</span>
              <span onClick={() => setIsContactModalOpen(true)} className="hover:text-orange-500 transition-colors cursor-pointer">Liên hệ</span>
            </div>
            
            <p className="text-gray-400 text-xs text-center mt-2 uppercase tracking-widest font-medium">© 2026 Xuân Thái. All rights reserved.</p>
          </div>
        </footer>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsContactModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-orange-400 to-rose-500 p-6 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mx-auto flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <span className="text-4xl text-white font-serif">XT</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">Nông Xuân Thái</h3>
              <p className="text-orange-100 text-sm mt-1 font-medium">Tác giả & Phát triển</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0"><span className="font-bold text-xs">Zalo</span></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Zalo</p>
                  <p className="font-bold text-gray-800">0969 504 696</p>
                </div>
              </div>
              
              <a href="https://www.facebook.com/okthaiday/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <div className="flex-1 truncate">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Facebook</p>
                  <p className="font-bold text-gray-800 truncate group-hover:text-[#1877F2] transition-colors">/okthaiday</p>
                </div>
              </a>

              <a href="mailto:okthaiday@gmail.com" className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="flex-1 truncate">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</p>
                  <p className="font-bold text-gray-800 truncate group-hover:text-rose-500 transition-colors">okthaiday@gmail.com</p>
                </div>
              </a>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-center">
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Floating Button */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_25px_rgba(249,115,22,0.4)] hover:-translate-y-1 transition-all z-50 flex items-center justify-center group"
        aria-label="Trở về đầu trang"
        title="Trở về đầu trang"
      >
        <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
      </button>
    </div>
  );
}

// -------------------- HELPER COMPONENTS --------------------

function BenefitCard({ title, desc, icon, color }: { title: string, desc: string, icon: any, color: 'orange'|'rose'|'amber'|'emerald'|'pink'|'blue' }) {
  const colorMap = {
    orange: "text-orange-500 bg-orange-50 border-orange-200 group-hover:bg-orange-500 group-hover:text-white",
    rose: "text-rose-500 bg-rose-50 border-rose-200 group-hover:bg-rose-500 group-hover:text-white",
    amber: "text-amber-500 bg-amber-50 border-amber-200 group-hover:bg-amber-500 group-hover:text-white",
    emerald: "text-emerald-500 bg-emerald-50 border-emerald-200 group-hover:bg-emerald-500 group-hover:text-white",
    pink: "text-pink-500 bg-pink-50 border-pink-200 group-hover:bg-pink-500 group-hover:text-white",
    blue: "text-blue-500 bg-blue-50 border-blue-200 group-hover:bg-blue-500 group-hover:text-white",
  };
  const selectedTheme = colorMap[color];

  return (
    <div className="glass-card p-10 rounded-3xl group hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-colors duration-300 ${selectedTheme}`}>
         {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
