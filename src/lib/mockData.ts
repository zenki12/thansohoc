import { NumerologyAnalysis } from "./numerologyHelper";

export function generateMockReport(name: string, stats: NumerologyAnalysis): string {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const khuyet = stats.missingNumbers.length > 0 ? stats.missingNumbers.join(', ') : 'Không có';

    return `## 🌟 LỜI MỞ ĐẦU

Chào mừng **${name.toUpperCase()}** đến với bản đồ Thần số học của riêng bạn. Thiết kế linh hồn của bạn là một sự hòa quyện độc đáo giữa các trường năng lượng, tạo nên một cá thể duy nhất không thể trộn lẫn. 

Bản đồ này mang đậm dấn ấn của **Đường đời ${stats.lifePath}** - đại diện cho bài học lớn nhất bạn cần tốt nghiệp, kết hợp cùng **Sứ mệnh ${stats.destiny}** - đích đến và vai trò bạn cần đảm nhận trong cõi nhân sinh này. 

---

## 📌 CHỈ SỐ ĐƯỜNG ĐỜI: ${stats.lifePath}

Với **Đường đời số ${stats.lifePath}**, rung động năng lượng của bạn cộng hưởng cực kỳ mạnh mẽ.

### 1. Bản chất năng lượng cốt lõi
Từ khoá cốt lõi của bạn xoay quanh sự nỗ lực phi thường, khả năng vượt lên hoàn cảnh và khao khát khẳng định giá trị. Con số ${stats.lifePath} đại diện cho sức mạnh nội tại to lớn. Vũ trụ thúc đẩy bạn phải bước ra ánh sáng, dũng cảm trải nghiệm và để lại dấu ấn của riêng mình.

### 2. Điểm mạnh thiên bẩm
- **Năng lực phi thường:** Bạn sở hữu sự kiên cường đáng nể. Khi gặp khó khăn, tần số ${stats.lifePath} giúp bạn đứng dậy và tái tạo bản thân mạnh mẽ.
- **Trực giác nhạy bén:** Không chỉ dùng lý trí, bạn có trực giác tốt để nắm bắt cơ hội.

### 3. Vùng tối & Thách thức
- **Sự mất cân bằng:** Có lúc cái tôi vươn lên quá mạnh khiến bạn bảo thủ, thiếu đi sự bao dung.
- **Áp lực vô hình:** Khao khát thành công đôi khi đẩy bạn vào sự căng thẳng thiêu rụi năng lượng chính mình.

### 4. Bài học giải thoát
Để khai thác tối đa năng lượng, hãy học cách "hạ cái tôi xuống để nâng nhãn quan lên". Sự vĩ đại không nằm ở việc chứng tỏ mình giỏi nhất, mà ở việc sức lớn của bạn che chở được bao nhiêu người.

---

## 🎯 CHỈ SỐ SỨ MỆNH: ${stats.destiny}

### Đặc điểm Sứ Mệnh
Vũ trụ giao phó cho bạn con số ${stats.destiny} với mong muốn bạn kiến tạo một di sản có thật, đóng góp giá trị vật chất hoặc tinh thần rõ nét. Sự nghiệp không chỉ nuôi sống thể xác, mà đó là phương tiện tối thượng để bạn hoàn thành khế ước linh hồn.

### Phương pháp vượt cản trở
Để đi đúng quỹ đạo, bạn buộc phải tu rèn tính kỷ luật, không nản chí nếu trái ngọt đến muộn.

---

## 💖 CHỈ SỐ LINH HỒN: ${stats.soulUrge}
**(Nỗi khát khao thầm kín & Ngôn ngữ tình yêu)**

Sâu thẳm trong bạn là rung động số ${stats.soulUrge}, khao khát sự đồng điệu tần số, được thấu hiểu không cần thành lời. Khúc hát của linh hồn bạn chỉ cất lên khi tìm thấy vị trí an trú bên cạnh tri kỷ, trong tổ ấm bình an.

---

## 🎭 NHÂN CÁCH ${stats.personality} & THÁI ĐỘ ${stats.attitude}

**Lớp Nhận Diện (Nhân Cách ${stats.personality}):** 
Mọi người nhìn nhận bạn là một thực thể sắc bén. Tần số này tạo ra một vòng ranh giới bảo vệ, khiến người yếu bóng vía e dè nhưng lại cực kỳ hấp dẫn những bộ óc trưởng thành.

**Phản xạ (Thái Độ ${stats.attitude}):** 
Chiến lược mặc định của bạn trước biến cố là sự kết hợp của năng lượng ${stats.attitude}, dùng lý trí và hành động thực tiễn để tháo gỡ vấn đề thay vì hoảng loạn vỡ trận.

---

## 🏔️ CHU KỲ 4 ĐỈNH CAO CUỘC ĐỜI

- **Đỉnh 1 (Tuổi ${stats.pinnacles.year1}):** Năng lượng đỉnh số ${stats.pinnacles.peak1}. Giai đoạn lột xác khỏi vùng an toàn.
- **Đỉnh 2 (Tuổi ${stats.pinnacles.year2}):** Năng lượng đỉnh ${stats.pinnacles.peak2}. Sự kết tinh của nhân quả và các mối quan hệ.
- **Đỉnh 3 (Tuổi ${stats.pinnacles.year3}):** Năng lượng đỉnh ${stats.pinnacles.peak3}. Đỉnh cao của sự chín muồi, tiền tài hoặc quyền lực.
- **Đỉnh 4 (Tuổi ${stats.pinnacles.year4}):** Năng lượng đỉnh ${stats.pinnacles.peak4}. Giai đoạn hậu vận bình an, tĩnh lặng và truyền trao.

---

## ⏳ NHỊP ĐIỆU THỜI GIAN: NĂM CÁ NHÂN ${stats.personalYear}
**Năm ${currentYear}** của bạn mang năng lượng Số ${stats.personalYear}.  
Đây là chu kỳ định mệnh yêu cầu bạn phải hiểu rõ nhịp đập của bản thân. Bạn hiện đang ở **Tháng cá nhân ${stats.personalMonth}** của năm ${currentYear}. Sự kết hợp này mang tới những bước ngoặt mang tính chất khởi tạo, đòi hỏi sự dũng cảm buông bỏ cái cũ để kiến tạo vận thế mới tốt đẹp hơn.

---

## 🧩 CHỈ SỐ KHUYẾT (KARMIC LESSONS): ${khuyet}
Những con số vắng mặt trong tên đại diện cho Bài học Nghiệp quả. Tần số ${khuyet} chỉ ra rằng bạn sinh ra đã mang một khoảnh trống năng lượng ở các khía cạnh này, bắt buộc kiếp này bạn phải chủ động học cách lấp đầy nó thông qua rèn luyện sự kiên nhẫn hoặc các kỹ năng kết nối.

---

## 💡 TỔNG KẾT VÀ ĐỊNH HƯỚNG TƯƠNG LAI

Nhìn hệ thống số học kết hợp của bạn, tôi (dưới góc độ chuyên gia) đánh giá đây là một biểu đồ chứa sức mạnh lớn. Trở ngại không đến từ số phận, mà đến từ chính giới hạn tâm trí. Vũ trụ đã ban tặng đầy đủ vũ khí, việc khai hỏa hay chôn vùi hoàn toàn nằm ở Ý TRÍ TỰ DO của bạn. 

*Định mệnh đang chờ!*
`;
}
