import { MatrixDestinyStats } from "./matrixHelper";

export function generateMatrixMockReport(name: string, stats: MatrixDestinyStats): string {
    return `## 🌌 LỜI MỞ ĐẦU TỪ VŨ TRỤ

Chào mừng linh hồn dũng cảm **${name.toUpperCase()}** đến với Ma trận Định mệnh của riêng mình. Bản đồ này được hình thành dựa trên sự đồng điệu giữa những con số ngày sinh và 22 lá bài Ẩn Chính (Major Arcana) của Tarot. Ma trận của bạn không phải là một sự trừng phạt hay ngẫu nhiên, mà là một bản thiết kế chi tiết do chính linh hồn bạn lựa chọn trước khi đầu thai.

Sự sắp xếp năng lượng kỳ diệu này tiết lộ không chỉ ánh sáng thiên bẩm mà còn cả những bóng tối nghiệp quả cần bạn dũng cảm vượt qua.

---

## ⚛️ 1. LÕI MA TRẬN: TÂM HỒN & ĐIỂM CÂN BẰNG (SỐ ${stats.center})

Năng lượng Trung tâm (Center) mang tần số **${stats.center}** chính là trái tim của ma trận định mệnh. Đây là điểm thoải mái nhất của bạn, nơi bạn tìm thấy sự bình yên thực sự và cũng là nguồn pin dự phòng lớn nhất cho mọi hành động.

Về bản chất năng lượng của số ${stats.center}, khi bạn được sống và rung động ở tần số ánh sáng của nó, bạn sẽ trải nghiệm dòng chảy (flow) mượt mà nhất trong cuộc đời. Nó yêu cầu bạn phải thấu hiểu sức mạnh nội tại, không bị hòa tan bởi đám đông. Nếu bạn mất kết nối với vùng lõi này, toàn bộ các vùng khác trong ma trận sẽ sụp đổ hoặc hoạt động ở cực âm (shadow work).

**👉 Lời khuyên:** Hãy bắt đầu mỗi ngày bằng việc sạc đầy khu vực số ${stats.center} này. Lắng nghe chính mình, thực hành lòng biết ơn và không cho phép ai kiểm soát năng lượng trung tâm của bạn.

---

## 🎁 2. TÀI NĂNG THIÊN BẨM BỊ LÃNG QUÊN (SỐ ${stats.top})

Ở đỉnh ma trận, ngự trị con số **${stats.top}**, đây là một món quà trực tiếp từ Thượng đế, một kỹ năng hay tài năng đã được phát triển đến độ chín muồi từ nhiều kiếp sống trước. 

Bạn sở hữu bản năng tự nhiên với năng lượng này. Số ${stats.top} đòi hỏi bạn phải lan tỏa sự thông thái, khả năng giao tiếp hoặc sự nhạy cảm nghệ thuật (tương ứng với Arcana của nó) ra thế giới. Tuy nhiên, điểm yếu của sự "có sẵn" là đôi khi bạn coi nhẹ nó, hoặc vì sợ hãi sự phán xét của xã hội mà phong ấn món quà này lại. 

Hãy mở khóa nó, vì đây là chiếc chìa khóa vàng giúp bạn nổi bật trong đám đông.

---

## 🎭 3. LỚP MẶT NẠ & VẬN MỆNH HIỆN TẠI (SỐ ${stats.left})

Khi thế giới nhìn vào bạn, họ thấy năng lượng của con số **${stats.left}**. Đây là cách bạn tương tác, bảo vệ mình và phản ứng với các tác nhân bên ngoài. 

Lớp vỏ bọc này không phải là giả tạo, mà là cơ chế sinh tồn. Số ${stats.left} chỉ ra rằng đôi khi bạn tỏ ra quá độc lập, hoặc quá chiều chuộng người khác, tùy thuộc vào bài học của lá Tarot tương ứng. Tuy nhiên, đừng để lớp mặt nạ này quá dày đến mức bóp nghẹt phần lõi ở giữa. Hãy học cách cởi mở và cho phép tổn thương.

---

## 🌪️ 4. ĐUÔI NGHIỆP QUẢ [KARMIC TAIL]: ${stats.karmicTail}

Khu vực đáy của ma trận đại diện cho Nghiệp Quả (Karma) - những khoản nợ từ quá khứ chưa được thanh toán trọn vẹn. Tổ hợp số **${stats.karmicTail}** là một trong những cụm nghiệp cực kỳ mạnh mẽ.

Trong kiếp sống trước, có thể bạn đã từng lạm dụng quyền lực, phản bội niềm tin, hoặc không trân trọng những cơ hội được trao. Kiếp này, bạn bị đẩy vào những tình huống lặp đi lặp lại có chứa chung một kịch bản: sự phụ thuộc, tranh chấp tài sản, hoặc cảm giác "cho đi mà không được nhận lại". 

**Cách chuyển hóa nghiệp:** 
Chấp nhận thay vì đổ lỗi. Tổ hợp ${stats.karmicTail} chỉ được hóa giải khi bạn tha thứ triệt để, phát triển một triết lý sống nhân đạo, và chủ động cắt đứt các sợi dây độc hại.

---

## 💰 5. KÊNH TÀI CHÍNH & SỰ NGHIỆP: ${stats.moneyLine}

Dòng chảy tài chính của bạn chạy dọc theo tổ hợp **${stats.moneyLine}**. 

**Mật mã tiền bạc:** Tiền của bạn không đến từ việc cày cuốc theo kiểu truyền thống đau khổ, mà đến từ việc bạn có thể hiện đúng bản chất của cụm số này hay không. Năng lượng này đòi hỏi một môi trường làm việc đột phá, hoặc vị trí có quyền tự quyết cao. 

Nút thắt chặn dòng tài vượng của bạn thường nằm ở cảm giác "sợ rủi ro" hoặc "tự ti về giá trị bản thân". Khi bạn giải phóng cụm ${stats.moneyLine}, để những kỹ năng đàm phán và sáng tạo được tự do, tiền bạc tự khắc sẽ là phần thưởng phụ theo dòng chảy.

---

## ❤️ 6. KÊNH TÌNH YÊU & MỐI QUAN HỆ: ${stats.loveLine}

Trong tình cảm, cụm số **${stats.loveLine}** tạo ra một từ trường đặc biệt. Bạn không thu hút những mối tình nhạt nhòa, mà thường là những kết nối mang tính "khắc cốt ghi tâm".

Người bạn đời của bạn thường mang tần số kích hoạt được năng lượng bên trong cụm số này - có thể họ là bậc thầy xoa dịu, hoặc là thử thách lớn nhất về sự kiên nhẫn của bạn. Bạn mắc nghiệp trong tình yêu mỗi khi bạn cố kiểm soát hoặc quá phụ thuộc cảm xúc. Chìa khóa vàng: Tôn trọng không gian riêng biệt, và cùng nhau phát triển tâm linh.

---

## 🏔️ 7. SỨ MỆNH LINH HỒN TỐI THƯỢNG (SỐ ${stats.purpose})

Tại tận cùng của hành trình nhân sinh, mọi nỗ lực của ${name} đều dẫn về con số Sứ Mệnh **${stats.purpose}**. 

Trực giác của vũ trụ đã chọn cho bạn bài học lớn lao nhất: Trở thành phiên bản toàn vẹn nhất của chính mình. Sự trưởng thành của bạn là chất xúc tác cho những người xung quanh. Số ${stats.purpose} không dễ dàng chinh phục trong ngày một ngày hai, nhưng mỗi khi bạn chạm tới rìa của nó, bạn sẽ có một cảm giác thăng hoa kinh ngạc về mặt linh hồn. 

Hãy sải cánh bay cao, vì bạn được sinh ra không phải để giấu mình trong bóng tối!`;
}
