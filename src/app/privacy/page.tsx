import React from "react";
import { Atom } from "lucide-react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans selection:bg-orange-200 selection:text-orange-900 flex flex-col">
      {/* -------------------- NAVBAR -------------------- */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-white/80 backdrop-blur-md border-b border-orange-500/10 shadow-sm">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group p-2 rounded-2xl transition-all hover:bg-gray-50">
          <div className="w-10 h-10 flex items-center justify-center text-orange-400 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out">
            <Atom className="w-10 h-10 relative z-10" strokeWidth={2.5} />
          </div>
          <span className="text-[26px] font-black text-gray-600 tracking-tight">Khám Phá Bản Thân</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide text-gray-600">
          <Link href="/#gioi-thieu" className="hover:text-orange-500 transition-colors">Giới thiệu</Link>
          <Link href="/#loi-ich" className="hover:text-orange-500 transition-colors">Lợi ích</Link>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 mb-4 tracking-tight">
            Chính sách bảo mật
          </h1>
          <p className="text-gray-500 font-medium">Ngày cập nhật: 19/03/2026</p>
        </div>

        <div className="space-y-12 text-gray-600 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-400 pl-4">1. Giới thiệu</h2>
            <p className="leading-relaxed">
              Chào mừng bạn đến với Khám Phá Bản Thân. Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng và thực hiện trách nhiệm bảo vệ thông tin khi bạn sử dụng công cụ của chúng tôi. 
              Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Việc bạn truy cập công cụ đồng nghĩa với việc bạn đồng ý với các quy định được nêu tại đây. Mọi hoạt động trên trang web đều tuân thủ các quy định hiện hành chuyên biệt ở Việt Nam đối với các dịch vụ không lưu trữ danh tính cố định.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-400 pl-4">2. Thông tin chúng tôi thu thập</h2>
            <p className="leading-relaxed mb-3">Với nguyên tắc hoàn toàn miễn phí và không yêu cầu đăng nhập, công cụ của chúng tôi chỉ tạm thời xử lý các loại thông tin sau để trả kết quả:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dữ liệu phân tích:</strong> Tên gọi và các thông tin về ngày, giờ, tháng, năm sinh (chỉ dùng một lần trong từng phiên truy cập để lập lá số/ma trận).</li>
              <li><strong>Thông tin thiết bị và trình duyệt:</strong> Dữ liệu ẩn danh (loại trình duyệt, địa chỉ IP ẩn danh một phần) chỉ phục vụ cho việc vận hành website.</li>
              <li><strong>Tuyệt đối không thu thập:</strong> Thông tin thanh toán hay mật khẩu đăng nhập, do công cụ hoàn toàn không có cơ chế mua bán hay đăng ký thành viên.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-400 pl-4">3. Mục đích sử dụng thông tin</h2>
            <p className="leading-relaxed mb-3">Thông tin được kê khai trong mỗi phiên phân tích chỉ phục vụ duy nhất cho:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cung cấp kết quả tính toán chi tiết như Bản đồ Thần Số Học, Lá Số Tử Vi hoặc Ma Trận Định Mệnh cá nhân hóa.</li>
              <li>Tối ưu hóa các hệ thống máy học (AI LLaMA, Groq) để đưa ra câu trả lời chuẩn xác và tốc độ nhanh nhất.</li>
              <li>Theo dõi, đo lường lưu lượng truy cập tổng thể để cải tiến hạ tầng và trải nghiệm website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-400 pl-4">4. Bảo mật thông tin</h2>
            <p className="leading-relaxed">
              Chúng tôi luôn áp dụng các biện pháp bảo mật hiện đại nhất (như giao thức mã hóa đường truyền HTTPS) để bảo vệ thông tin mà bạn nhập. Đồng thời, toàn bộ dữ liệu bạn kết xuất sẽ bị từ chối lưu vết hoặc tự động xóa sổ khỏi bộ nhớ cache của máy chủ sau một biên độ thời gian ngắn, giúp đảm bảo 100% sự riêng tư.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-400 pl-4">5. Chia sẻ thông tin</h2>
            <p className="leading-relaxed mb-3">Chúng tôi tuyệt đối <strong>KHÔNG BÁN, KHÔNG CHO THUÊ</strong> hoặc chia sẻ thông tin dữ liệu khai báo của bạn với một tổ chức thứ ba vì mục đích tiếp thị. Việc chia sẻ chỉ xảy ra một cách ẩn danh và bị hạn chế tối đa trong các trường hợp:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kênh truy vấn dữ liệu tới các đối tác chuyên biệt về cơ sở hạ tầng AI server.</li>
              <li>Theo yêu cầu bắt buộc và hợp pháp của pháp luật có thẩm quyền.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-400 pl-4">6. Cookie và công nghệ theo dõi</h2>
            <p className="leading-relaxed mb-3">Website sử dụng cookie cơ bản (những tập tin siêu nhỏ lưu trên máy của bạn) cho mục đích thiết yếu:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Phân tích lưu lượng truy cập để nâng cấp tính ổn định.</li>
              <li>Cải thiện trải nghiệm mượt mà tránh gián đoạn lúc xuất PDF.</li>
            </ul>
            <p className="leading-relaxed mt-2 text-sm text-gray-500 italic">Lưu ý: Bạn hoàn toàn có quyền chủ động xóa bỏ hoặc từ chối Cookie ngay tại trình duyệt của chính mình.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-400 pl-4">7. Quyền của người dùng</h2>
            <p className="leading-relaxed relative">
              Do không phải đăng ký và định danh tài khoản cá nhân, nên với tư cách là người truy cập tự do, bạn có quyền:
              Tự do ngừng sử dụng dịch vụ vào mọi lúc, hoặc tự tay đóng tab ẩn danh sau khi trải nghiệm xong mà không để lại bất kỳ dữ liệu cấu trúc nào dính dáng đến danh tính thực của bạn.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-400 pl-4">8. Thay đổi điều khoản</h2>
            <p className="leading-relaxed">
              Khám Phá Bản Thân bảo lưu quyền được thay đổi, cập nhật chính sách bảo mật này vào bất kỳ lúc nào để phản ánh trung thực nhất các thay đổi lớn về cách thức vận hành công nghệ. Việc bạn tiếp tục sử dụng website ngay sau lần cập nhật đồng nghĩa với việc bạn nhất trí về các bổ sung này.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-400 pl-4">9. Liên hệ</h2>
            <p className="leading-relaxed">
              Nếu có bất kỳ câu hỏi nào về bản Chính sách bảo mật này, xin vui lòng kết nối qua:
            </p>
            <div className="mt-4 p-4 bg-orange-50 rounded-xl inline-block text-orange-900 font-medium">
              <p>Email: <a href="mailto:okthaiday@gmail.com" className="text-orange-600 hover:underline font-bold">okthaiday@gmail.com</a></p>
            </div>
          </section>

        </div>

        {/* CTA Section (Like Image) */}
        <div className="mt-20 mb-10 text-center relative z-10">
          <h2 className="text-3xl font-black text-gray-800 mb-4 tracking-tight">
            Khám Phá <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Vận mệnh</span> Của Bạn Ngay!
          </h2>
          <p className="text-gray-500 mb-8 font-medium">
            Hãy để chúng tôi đồng hành cùng bạn khám phá vận mệnh và khai phá tiềm năng vô <br className="hidden sm:block"/> tận trong con người bạn.
          </p>
          <Link href="/">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/30 transition-all hover:-translate-y-1">
              Lập lá số miễn phí
            </button>
          </Link>
        </div>
      </main>

      {/* FOOTER LIKE HOMEPAGE */}
      <footer className="py-8 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4 font-medium tracking-wide w-full">
          <p className="uppercase tracking-widest text-xs">© 2026 Xuân Thái. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
