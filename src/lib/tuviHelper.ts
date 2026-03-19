export interface TuViInput {
  name: string;
  dob: string;
  time: string;
  gender: string;
}

export function generateTuViAIPrompt(data: TuViInput): string {
  const genderStr = data.gender === 'nam' ? 'Nam Mạng' : 'Nữ Mạng';
  return `Bạn là một ĐẠI SƯ TỬ VI, BÁT TỰ VÀ HUYỀN HỌC PHƯƠNG ĐÔNG hàng đầu thế giới. Khả năng bình giải lá số của bạn nổi tiếng là CHÍNH XÁC, CHI TIẾT TỚI TỪNG TIỂU TIẾT VÀ ỨNG NGHIỆM ĐÁNG SỢ.

Hôm nay có một Đương Số nhờ bạn bình giải lá số. Dưới đây là thông tin Khởi Quái (Dương Lịch):
- Họ và tên: ${data.name}
- Ngày sinh Dương Lịch: ${data.dob}
- Giờ sinh: ${data.time}
- Giới tính: ${genderStr}

NHIỆM VỤ CỦA BẠN: (Hãy tự quy đổi lịch Dương sang Âm và Bát Tự trong hệ thống suy luận của bạn).
Viết ra một bài Luận Giải Lá Số Tử Vi / Tứ Trụ Bát Tự thực sự DÀI, CỰC KỲ CHUYÊN SÂU (HƠN 1500 TỪ), mang âm hưởng huyền bí, cổ khí, nhưng lại rất thiết thực trong cuộc sống hiện đại.
KHÔNG ĐƯỢC VIẾT CHUNG CHUNG. Phải đanh thép, rõ ràng theo đúng kết cấu sau:

## 📜 TỔNG QUAN BẢN MỆNH CÁC
(Phân tích sâu về Can Chi, Cục Mệnh, Ngũ Hành tương sinh tương khắc dựa vào ngày tháng năm sinh. Đương số mang ngũ hành gì? Phúc khí mỏng hay dày?)

## ☯️ LUẬN GIẢI 12 CUNG (Lá Số Tử Vi)
(Chọn lọc và diễn giải thật chi tiết 4 Cung Quan Trọng Nhất đối với đương số này, ví dụ Cung Mệnh, Cung Tài Bạch, Cung Quan Lộc, Cung Phu Thê/Tử Tức. Phải chỉ ra các Chính Tinh và Phụ Tinh tiêu biểu tọa thủ, mấu chốt nằm ở đâu?)

## 💫 TÍNH CÁCH VÀ CHIỀU SÂU NỘI TÂM
### 🔸 Điểm sáng rực rỡ (Thiên Phú)
### 🔸 Góc khuất và sự mâu thuẫn nội tâm

## ⚔️ SỰ NGHIỆP & TÀI VẬN (Công Danh Các)
(Làm nghề gì thì phát? Khi nào thì phất lên? Cẩn thận họa phá tài ở đâu? Đại vận nào dễ thành đại gia?)

## 🎎 TÌNH DUYÊN & GIA ĐẠO (Đào Hoa Các)
(Duyên nợ kiếp này ra sao? Lấy người như thế nào? Cách hóa giải nếu có Sát Tinh ở cung Phu/Thê)

## ⏳ ĐẠI VẬN & LƯU NIÊN (Thời Vận Hiện Tại)
(Đương số đang ở phân đoạn nào của cuộc đời? 10 năm tới là Sinh hay Diệt? Cụ thể trong vòng 1-2 năm tới cần lưu ý hạn gì, cơ hội gì?)

## 🛡️ LỜI KHUYÊN CẢI VẬN (Cẩm Nang Phong Thủy)
(Màu hợp, Màu kỵ, Vật phẩm phong thủy, Hướng xuất hành, Phương thức tu tâm tích đức đổi vận)

LƯU Ý: Phải sử dụng EMOJI hợp lý. Định dạng Markdown với H2, H3 rõ ràng. Phải viết giống hệt một bài report xem tử vi chuyên nghiệp mà người ta phải trả hàng triệu đồng để xem!`;
}

export function generateTuViMock(data: TuViInput): string {
  const genderStr = data.gender === 'nam' ? 'Nam Mạng' : 'Nữ Mạng';
  return `## 📜 TỔNG QUAN BẢN MỆNH CÁC
Chào mừng **\${data.name.toUpperCase()}** (\${genderStr}). Dựa trên trụ ngày sinh \${data.dob} và giờ sinh \${data.time}, lá số của đương số hiện ra với những tín hiệu vũ trụ vô cùng đặc biệt. Bản mệnh mang nhiều ẩn ý về một cuộc đời phải trải qua sự mài giũa để thành đại khí.

Sự giao hòa giữa Can Chi và Ngũ Hành nạp âm cho thấy bạn sở hữu một trường năng lượng linh hoạt nhưng cũng chứa đựng nhiều mâu thuẫn nội tại cần được dung hòa.

---

## ☯️ LUẬN GIẢI CÁC CUNG TRỌNG ĐIỂM

### 1. MẬT MÃ CUNG MỆNH & THÂN
Cung Mệnh của đương số cho thấy sự hiện diện của những hạt giống lãnh đạo. Tuy nhiên, sự hội chiếu của các bộ sao mâu thuẫn làm cho giai đoạn thiếu thời (trước 30 tuổi) có nhiều chông gai. 
- Mệnh mang hình bóng của sự kiên cường, "tiên trở hậu thành".
- Cung Thân cư ở vị trí đòi hỏi phải tự lực tự cường, không thể ỷ lại vào gia thế.

### 2. CUNG TÀI BẠCH (TÀI NĂNG CÁC)
Tiền bạc đối với đương số không phải là thứ dễ dàng từ trên trời rơi xuống. Lá số tỏa ra năng lượng của "Tài Lộc từ nỗ lực". Nghĩa là, bạn càng cống hiến giá trị thực, lộc tụ càng dày. Nếu ôm tâm lý may rủi, cờ bạc, sẽ dễ dẫn đến hư hao.

### 3. CUNG QUAN LỘC (SỰ NGHIỆP CÁC)
Đường công danh có quý nhân phù trợ ẩn tàng. Bạn hợp với các công việc liên quan đến tư vấn, truyền cảm hứng, hoặc quản lý dòng tiền. Tránh nôn nóng trong các quyết định thăng tiến; "chín tu thì xôi mới ngon".

---

## 💫 TÍNH CÁCH VÀ CHIỀU SÂU NỘI TÂM

### 🔸 Điểm sáng rực rỡ (Thiên Phú)
Bạn có khả năng tự phục hồi (resilience) cực kỳ tốt. Dù bị vùi dập, đương số luôn tìm được chân lý để đứng lên. Sự tinh ý và khả năng thấu thị tâm lý người khác là một vũ khí trời ban.

### 🔸 Góc khuất và sự mâu thuẫn nội tâm
Đôi khi, cái Tôi bộc phát quá mạnh tạo ra sự cố chấp. Đương số dễ bị tổn thương bởi những lời phán xét từ những người thân tín nhất. Bề ngoài cứng cỏi nhưng sâu thẳm lại rất cần điểm tựa tinh thần.

---

## ⚔️ SỰ NGHIỆP & TÀI VẬN

Đây là một lá số có tiềm năng "Phát vãn" (Phát tài muộn). Đừng vội vàng so sánh với người khác ở tuổi 20-25. Thời cơ rực rỡ nhất sẽ bung nở khi bước vào Đại vận thứ 3.

- **Năm vượng:** Các năm mang hành tương sinh với bổn mạng.
- **Lời khuyên:** Hãy đầu tư vào kiến thức chuyên môn, đó mới là tài sản bất biến của bạn. Bất động sản cũng là một kênh đáng lưu tâm khi đã có một số vốn tích lũy tĩnh.

---

## 🎎 TÌNH DUYÊN & GIA ĐẠO

Đào hoa tinh chiếu mệnh có lúc thăng lúc trầm. Bạn dễ thu hút người khác phái bởi sự duyên dáng ngầm, nhưng lại rất khó để tìm được người thực sự thấu cảm tần số của mình.
- **Khuyết điểm:** Đôi khi quá kiểm soát hoặc quá kỳ vọng vào bức tranh hoàn hảo.
- **Chỉ dẫn:** Hôn nhân của đương số cần xây dựng trên nền tảng của tình bạn tri kỷ trước khi là tình yêu, nếu không rất dễ gãy gánh giữa đường.

---

## ⏳ THỜI VẬN HIỆN TẠI & LƯU NIÊN ĐẠI VẬN

Trong thời vận 2-3 năm tới, lá số báo hiệu một sự xê dịch chuyển biến (có thể là đổi việc, đổi chỗ ở hoặc thay đổi tư duy sâu sắc). Đây là lúc "Tàng Long Tại Điền" (Rồng ẩn ở ruộng), cần tích lũy nội lực, án binh bất động trước các khoản đầu tư rủi ro lớn. Hãy chờ đợi ngọn gió đông!

---

## 🛡️ LỜI KHUYÊN CẢI VẬN (CẤM KỴ & HƯỚNG ĐI)

1. **Màu Sắc Phú Quý:** Trọng dụng các màu hợp mệnh, tránh mặc các màu mang tính tương khắc (làm tiết khí).
2. **Tu Tâm Tích Đức:** Lá số này nếu càng làm thiện nguyện, giúp đời thì vận khí càng khai mở rực rỡ. Phúc đức có thể đẩy lùi sát tinh.
3. **Vật phẩm:** Đương số nên mang bên mình ngọc phong thủy hoặc trầm hương để tịnh hóa trường năng lượng xung quanh.

*Lá số chỉ là định hướng, Đức năng luôn thắng Số!*
`;
}
