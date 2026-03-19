import { NumerologyAnalysis } from "./numerologyHelper";

export function generateMockReport(name: string, stats: NumerologyAnalysis): string {
  return `
## 🌟 Lời Mở Đầu

Chào **${name.toUpperCase()}**, bản đồ Thần số học của bạn là một bức tranh đầy màu sắc về những tiềm năng ẩn sâu bên trong. Với **Đường đời ${stats.lifePath}** và **Sứ mệnh ${stats.destiny}**, vũ trụ đã ban tặng cho bạn một nguồn năng lượng đặc biệt để kiến tạo và dẫn dắt. Hãy cùng khám phá chi tiết từng mảng ghép trong thiết kế linh hồn của bạn.

---

## 📌 CHỈ SỐ ĐƯỜNG ĐỜI: ${stats.lifePath}

Đường đời ${stats.lifePath} đại diện cho năng lượng của **Người Tiên Phong, Nhà Lãnh Đạo Độc Lập**. 

Mang trong mình con số 1, bạn sinh ra với khao khát khẳng định bản thân mãnh liệt. Bạn có khả năng tự lực cánh sinh xuất sắc, dám nghĩ dám làm và không ngại đương đầu thử thách. Giống như mũi tên lao thẳng về phía trước, bạn có xu hướng muốn tự mình ra quyết định và dẫn dắt người khác thay vì đi theo lối mòn.

**✨ Điểm mạnh nổi trội:**
- **Sự Độc Lập:** Bạn không thích dựa dẫm. Khả năng làm việc độc lập và tính tự chủ của bạn cực cao.
- **Sáng Tạo & Đột Phá:** Bạn luôn có những ý tưởng mới mẻ, mang tính cách mạng.
- **Quyết Đoán:** Một khi đã nhắm tới mục tiêu, bạn sẽ hành động vô cùng mạnh mẽ và dứt khoát.

**⚠️ Thử thách & Bài học:**
- Cái tôi đôi khi quá lớn, dễ trở nên bảo thủ hoặc độc đoán.
- Cần học cách lắng nghe và làm việc nhóm hiệu quả hơn.
- Tránh việc quá ôm đồm hoặc áp đặt ý kiến lên người khác.

---

## 🎯 CHỈ SỐ SỨ MỆNH: ${stats.destiny}

Sứ mệnh của bạn là con số ${stats.destiny}. Đây là đích đến mà vũ trụ muốn bạn hướng tới trong kiếp sống này. Nó định hình cách bạn đóng góp cho cộng đồng và gặt hái thành tựu.

*(Với con số sứ mệnh này, bạn được kêu gọi để xây dựng những nền tảng vững chắc, đem lại sự trật tự, kỷ luật và những giá trị thực tế lâu bền cho xã hội. Hãy phát huy sự kiên trì và tỉ mỉ của mình).*

---

## 💖 CHỈ SỐ LINH HỒN: ${stats.soulUrge}

Linh hồn ${stats.soulUrge} tiết lộ khao khát sâu kín nhất bên trong bạn. Đo là điều mang lại cho bạn sự thoả mãn thực sự.

Bạn khao khát sự thấu hiểu, yêu thương và hòa bình. Tâm hồn bạn nhạy cảm và luôn mong muốn kết nối sâu sắc với người khác. Bạn khao khát một môi trường an toàn, hài hòa, nơi bạn có thể là người chia sẻ, lắng nghe và mang lại sự đồng điệu.

---

## 👤 CHỈ SỐ NHÂN CÁCH: ${stats.personality} & THÁI ĐỘ: ${stats.attitude}

**Nhân cách ${stats.personality}:** Là ấn tượng đầu tiên bạn tạo ra với thế giới. Người khác thường thấy bạn là người có trực giác rất nhạy bén, nhiều năng lượng tâm linh hoặc có những ý tưởng vượt tầm hiểu biết thông thường (nếu là số Master 11).

**Thái độ ${stats.attitude}:** Cách bạn phản ứng với các tình huống mới là sự lạc quan, truyền cảm hứng và luôn muốn nâng đỡ tinh thần người khác (năng lượng số 3).
`;
}
