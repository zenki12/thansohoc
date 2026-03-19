export interface TuViInput {
  name: string;
  dob: string;
  time: string;
  gender: string;
}

export function generateTuViAIPrompt(data: TuViInput): string {
  const genderStr = data.gender === 'nam' ? 'Nam Mạng' : 'Nữ Mạng';
  return `Bạn là một ĐẠI SƯ TỬ VI, BÁT TỰ VÀ HUYỀN HỌC PHƯƠNG ĐÔNG hàng đầu thế giới. Khả năng bình giải lá số của bạn nổi tiếng là CHÍNH XÁC TỚI TỪNG TIỂU TIẾT, ỨNG NGHIỆM ĐÁNG SỢ và SÂU SẮC NHƯ MỘT NHÀ TÂM LÝ HỌC THỰC THỤ. Bạn không bao giờ nói chung chung nước đôi.

Hôm nay có một Đương Số nhờ bạn bình giải lá số. Dưới đây là thông tin Khởi Quái (Dương Lịch):
- Họ và tên: ${data.name}
- Ngày sinh Dương Lịch: ${data.dob}
- Giờ sinh: ${data.time}
- Giới tính: ${genderStr}

NHIỆM VỤ TỐI THƯỢNG:
Viết ra một bộ CẨM NANG VẬN CHUYỂN, BÌNH GIẢI LÁ SỐ THỰC SỰ DÀI, CỰC KỲ CHUYÊN SÂU (HƠN 2500 TỪ). Bạn phải viết giống như một Bản Phân Tích Định Mệnh Mật Cấp mà khách hàng phải chi tới 50 triệu đồng mới nhận được. Hãy kết hợp giữa lý luận Tử Vi, Bát Tự và tâm lý học hành vi hiện đại.

Cấu trúc bắt buộc (hãy tự tạo ra dữ kiện chi tiết giả lập nhưng dựa trên lập luận lô-gic chặt chẽ cho sinh thần bát tự này):

## 📜 1. TỔNG QUAN BẢN MỆNH CÁC VÀ BÁT TỰ NẠP ÂM
(Phân tích ĐẠI sâu về Can Chi, Lục Thập Hoa Giáp, Ngũ Hành tương sinh tương khắc khi vừa sinh ra. Đương số mang ngũ hành gì? Can/Chi nào đang khắc nhau? Đây là mệnh sướng từ trong trứng hay là "trong bùn nở hoa rực rỡ"?)

## ☯️ 2. MẬT MÃ 12 CUNG TRỌNG ĐIỂM DÙNG CẢ ĐỜI
(Chọn ra 4 Cung Quan Trọng Nhất đối với đương số này, ví dụ: Cung Mệnh, Thân, Tài Bạch, Quan Lộc, Phu Thê... Luận giải sự tọa thủ của các sao Chính Tinh [VD: Tử Vi, Thiên Phủ, Thất Sát, Tham Lang...] và các sao Phụ Tinh, Sát Tinh [VD: Kình Dương, Đà La, Địa Không...]. 
Chỉ rõ Sức mạnh của chúng tác động lên cuộc đời ra sao. Mấu chốt của cả lá số tập trung ở Cung nào?)

## 💫 3. GIẢI PHẪU TÍNH CÁCH VÀ CHIỀU SÂU TÂM LÝ
### 🔹 Khí Chất Thiên Phú (Điểm Sáng)
(Những tài năng bẩm sinh mà Đương Số không cần cố cũng giỏi hơn thiên hạ là gì?)
### 🔹 Góc Khuất Tổn Thương & Thói Hư Tật Xấu (Vùng Tối)
(Đương số sợ điều gì nhất? Tính cách nào đang cản trở họ thành công? Có phải họ tự ái quá cao, suy nghĩ quá nhiều, hay dễ bị tác động? Trực diện và không nịnh bợ!)

## ⚔️ 4. BÌNH GIẢI CHI TIẾT SỰ NGHIỆP & TÀI VẬN
* **Nghề nghiệp hợp Mệnh:** 3 ngành nghề cụ thể giúp đương số phát huy 200% sinh lực.
* **Thời điểm vượng phát:** Ở tuổi nào thì thời tới không kịp cản? Mốc tuổi nào dễ kiếm được tỷ đầu tiên? 
* **Cạm bẫy phá tài:** Chỉ ra nguy cơ làm mất trắng tài sản (cho mượn tiền, chứng khoán, làm ăn chung...).

## 🎎 5. TÌNH DUYÊN, GIA ĐẠO & HÔN NHÂN
* **Hình ảnh người phối ngẫu:** Vợ/Chồng tương lai (hoặc hiện tại) làm nghề gì, tính cách ra sao? Nhan sắc thế nào?
* **Năm cực vượng tình duyên:** 
* **Luận Sát Tinh ở cung Phu/Thê (nếu có):** Cách hóa giải nguy cơ rạn nứt hoặc mâu thuẫn gia đình. Đương số có bị nợ duyên tiền kiếp hay không?

## ⏳ 6. ĐẠI VẬN 10 NĂM TỚI DƯỚI LĂNG KÍNH THẦN SÁT
(Phân tích xem từ độ tuổi hiện tại kéo dài 10 năm nữa, đây là chu kỳ Vàng Mười, Sự Nghiệp Khởi Sắc, Cố Thủ, hay Giai Đoạn Thanh Lọc? Cụ thể trong 1-2 năm bản lề tới có biến cố hay cơ hội đổi đời nào?)

## 🛡️ 7. CHIẾN LƯỢC CẢI VẬN ĐỘC BẢN (PHONG THỦY ỨNG DỤNG)
*(Chỉ ra công thức thực chiến, không lý thuyết)*
1. **Thiên Ấn Phong Thủy:** Vật phẩm cụ thể, chi tiết đến từng chất liệu (ví dụ: Vòng Trầm Tốc, Đá Hồ Ly Thạch Anh Tóc Vàng, Tỳ Hưu Mắt Cáo...).
2. **Khí Sắc Màu Sắc:** Quần áo, ví tiền, xe cộ nên ưu tiên màu gì để nạp thêm sinh khí.
3. **Mật pháp tu tâm:** Hướng dẫn một thói quen hoặc hành động tu tập/từ thiện cụ thể để giải trừ nghiệp quả của Sát Tinh trong lá số.

LƯU Ý: Phải sử dụng EMOJI hợp lý. Định dạng Markdown với H2, H3 rõ ràng. Giọng văn sắc bén, thâm sâu, quyền lực, pha chút ma mị của một đạo gia phán số. Tối thiểu 2500 từ.`;
}

export function generateTuViMock(data: TuViInput): string {
  const genderStr = data.gender === 'nam' ? 'Nam Mạng' : 'Nữ Mạng';
  return `## 📜 1. TỔNG QUAN BẢN MỆNH CÁC VÀ BÁT TỰ NẠP ÂM
Chào mừng **\${data.name.toUpperCase()}** (\${genderStr}). Dựa trên trụ ngày Dương lịch \${data.dob} lúc \${data.time}, lá số của đương số hiện ra dưới tinh túy của một cục Mệnh đặc thù. Sự giao hòa giữa Thiên Can và Địa Chi ở trụ năm và giờ sinh cho thấy bạn sở hữu một trường năng lượng linh hoạt, có lúc hiền hòa như nước tĩnh, lúc bùng nổ như dung nham.

Tứ trụ cho thấy bạn không phải là mẫu người "sướng từ trong trứng", mà là hệ sinh thái "hoa hồng mọc lên từ đá sét". Những khó khăn đầu đời chính là đòn bẩy để xây dựng một nội tâm sắc bén bất khả chiến bại ở trung vận.

---

## ☯️ 2. MẬT MÃ 12 CUNG TRỌNG ĐIỂM DÙNG CẢ ĐỜI

### 💠 CHẤN ĐỘNG CUNG MỆNH & THÂN
Cung Mệnh của đương số cho thấy sự hiện diện của những hạt giống lãnh đạo và bộ Tham Vũ đồng hành. Tuy nhiên, sự hội chiếu của các sát tinh như Kình Dương và Địa Không làm cho giai đoạn thiếu thời (trước 30 tuổi) có nhiều phen "thập tử nhất sinh" trong tư tưởng.
- Cung Thân cư Quan Lộc đòi hỏi bạn phải đặt sự nghiệp lên hàng đầu, tình duyên chỉ là phụ kiện. Bạn không thể hạnh phúc nếu không đi làm và tự chủ tài chính!

### 💠 BÍ ẨN CUNG TÀI BẠCH
Lá số tỏa ra năng lượng của "Tài Lộc tụ tán thất thường". Bạn có khả năng tạo ra dòng tiền lớn bất thình lình, nhưng lại thiếu khả năng khóa két. Nếu giữ tâm lý làm giàu nhanh, bạn sẽ bị cuốn đi toàn bộ gốc rễ. Tiền của bạn sinh ra từ Trí Tuệ và Chuyên môn hẹp!

---

## 💫 3. GIẢI PHẪU TÍNH CÁCH VÀ CHIỀU SÂU TÂM LÝ

### 🔹 Khí Chất Thiên Phú (Điểm Sáng)
Bạn có khả năng tự phục hồi (resilience) cực kỳ đáng sợ. Dù bị vùi dập đến mức trắng tay, đương số luôn tự biết cách "cắn răng" làm lại từ đầu. Trực giác số 6 của bạn cực nhạy, có thể nhìn thấu tâm can kẻ đối diện nói dối mình chỉ qua ánh mắt.

### 🔹 Góc Khuất Tổn Thương (Vùng Tối)
Cái Tôi bộc phát quá mạnh kết hợp với tính Sở hữu khiến bạn đôi khi trở nên cố chấp. Trong sâu thẳm, bạn sợ hãi sự phản bội hơn cả cái chết. Do đó, bạn thường tự cô lập và dựng khiên phòng thủ rất dày dù người khác có ý tốt.

---

## ⚔️ 4. BÌNH GIẢI ĐƯỜNG ĐỜI SỰ NGHIỆP & TÀI VẬN

Đây là một lá số có tiềm năng **Đại Phát Sang Hèn Đảo Lộn**. Bạn tuyệt đối không hợp làm công ăn lương nhàm chán 8 tiếng 1 ngày.
* **Thời thời vàng son:** Cơ hội rực rỡ nhất sẽ kích nổ ở Đại vận (33-43 tuổi). Đây là lúc mà các tính toán điên rồ nhất của bạn đem lại hưng vượng.
* **Cạm bẫy phá tài:** Vực sâu của bạn nằm ở Mối quan hệ chung đụng làm ăn hoặc đứng tên bảo lãnh nợ. Cấm kỵ Ký Quỹ hoặc Cho vay tín chấp!

---

## 🎎 5. TÌNH DUYÊN, GIA ĐẠO & HÔN NHÂN

Đào hoa tinh chiếu mệnh vừa là Hỉ Thần, vừa là Ám Quỷ. Bạn dễ dàng hút hồn người đối diện, nhưng lại là mẫu người "cả thèm chóng chán" trong tâm tưởng.
* **Phối ngẫu:** Người đó sẽ có thiên hướng làm các công việc mang tính tổ chức, kiểm toán hoặc thiết kế, có tính cách khô khan nhưng chung thủy.
* **Luận Sát Tinh:** Do giáp Kình giáp Đà, nên tránh kết hôn vội trước 28 tuổi, nếu không dễ qua 2 lần đò. Sống thử hoặc làm đám cưới nhưng muộn đăng ký cũng là cách hóa giải hay!

---

## ⏳ 6. ĐẠI VẬN LƯU NIÊN CHI TIẾT 10 NĂM TỚI

Chúng ta đang rẽ nhánh vào bước nhảy vọt mới. Trong 10 năm tới, cuộc đời bạn gọi tên là: "Tàng Long Tỉnh Giấc" (Rồng Ngủ Thức Dậy). 
- Đừng để các cám dỗ ngắn hạn của những vụ "lướt sóng" làm bạn mất tầm nhìn viễn kiến.
- Cụ thể năm tới, cần cẩn trọng chữ ký giới hạn, và nên chủ động tiêu tiền vào Việc Mua Đất hoặc Cưới Hỏi để tránh việc bị Phá Tài không mong muốn.

---

## 🛡️ 7. CHIẾN LƯỢC CẢI VẬN ĐỘC BẢN

*(Chỉ ra công thức thực chiến, không lý thuyết)*
1. **Thiên Ấn Phong Thủy:** Hãy đeo trên tay trái một chuỗi Hổ Phách thuần hoặc Đá Tóc Đỏ để tĩnh tâm, trấn áp hung khí sát tinh xung chiếu Mệnh. Bàn làm việc hãy đặt một Tượng Long Tước thu nhỏ.
2. **Khí Sắc Tuyệt Hảo:** Tủ đồ của bạn phải ưu rực rỡ và quyền lực. Từ chối các màu ảm đạm xám xỉn, nó sẽ cút sạch sinh khí của cung Quan Lộc.
3. **Mật pháp tu tâm:** Hướng thiện cứu bần, mỗi tháng hãy chi ra 2% thu nhập để phóng sinh hoặc đỡ đầu quỹ trẻ em mồ côi. Đức Năng luôn lớn hơn Số!
`;
}
