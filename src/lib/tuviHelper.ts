export interface TuViInput {
  name: string;
  dob: string;
  time: string;
  gender: string;
}

import tuviKnowledge from "./tuvi_knowledge.json";
import { TuviCalculator } from "snowfox-tuvi-calculator";

export function getCalculatedTuViChart(data: TuViInput) {
  // Parse date
  let year = new Date().getFullYear();
  let month = 1;
  let day = 1;
  
  let dobParts = data.dob.split(/[-/]/);
  if (dobParts.length === 3) {
    if (dobParts[0].length === 4) {
      year = parseInt(dobParts[0], 10);
      month = parseInt(dobParts[1], 10);
      day = parseInt(dobParts[2], 10);
    } else {
      year = parseInt(dobParts[2], 10);
      month = parseInt(dobParts[1], 10);
      day = parseInt(dobParts[0], 10);
    }
  }

  // Parse time
  let hour = 12;
  let minute = 0;
  if (data.time) {
    const timeParts = data.time.split(":");
    if (timeParts.length >= 2) {
      hour = parseInt(timeParts[0], 10);
      minute = parseInt(timeParts[1], 10);
    }
  }

  const genderMap: any = {
    'nam': 'Nam',
    'nữ': 'Nu',
    'nu': 'Nu',
    'female': 'Nu',
    'male': 'Nam'
  };
  const gender = genderMap[data.gender.toLowerCase()] || 'Nam';

  try {
    const calculator = new TuviCalculator({
      year,
      month,
      day,
      hour,
      minute,
      isSolar: true,
      name: data.name,
      gender: gender as any,
      viewingYear: new Date().getFullYear(),
    });
    return calculator.calculateTuvi();
  } catch (err) {
    console.error("Tuvi calculation failed:", err);
    return null;
  }
}

export function generateTuViAIPrompt(data: TuViInput): string {
  const genderStr = data.gender.toLowerCase() === 'nam' ? 'Nam Mạng' : 'Nữ Mạng';
  const chart = getCalculatedTuViChart(data);

  return `Tưởng tượng bạn là một vị đại sư tử vi cao tuổi, đã đọc qua vạn cuốn sách cổ và thông thạo mọi bí quyết luận giải. Dưới đây là 2 bộ dữ liệu cốt lõi để bạn luận giải cho khách hàng:
  
[THÔNG TIN 1: LÁ SỐ TỬ VI ĐÃ AN SAO CHÍNH XÁC]
Khách hàng: ${data.name} | Ngày sinh dương: ${data.dob} | Giờ sinh: ${data.time} | Giới tính: ${genderStr}
Sơ đồ 111 Sao của Mạng này như sau:
\`\`\`json
${JSON.stringify(chart, null, 2)}
\`\`\`

[THÔNG TIN 2: SÁCH BÍ KÍP LUẬN GIẢI]
Đây là bộ sách Bí Kíp độc quyền chứa Định Nghĩa 111 Sao, Vai Trò 12 Cung và Hệ Thống 200 quy tắc IF-THEN kinh điển:
\`\`\`json
${JSON.stringify(tuviKnowledge, null, 2)}
\`\`\`
  
[YÊU CẦU LUẬN GIẢI - BẮT BUỘC TUÂN THỦ]
1. Tuyệt đối KHÔNG ĐƯỢC tự bịa đặt vị trí các sao. Mọi nhận định bắt buộc phải trích xuất từ dữ liệu [LÁ SỐ TỬ VI ĐÃ AN SAO] bên trên (Ví dụ Mệnh có sao gì, Di có sao gì phải đọc kỹ trong JSON).
2. Khi phân tích, HÃY DÙNG BỘ SÁCH BÍ KÍP để giải nghĩa cách cục, giải nghĩa cung và sao. Khen chê đều phải có cơ sở từ sách.
3. Bài luận là một dịch vụ cao cấp, do đó bạn PHẢI viết cực kỳ sâu sắc, tâm lý và chi tiết. Tổng bài luận PHẢI dài trên 2500 từ. 
  
Hãy viết bài luận theo định dạng Markdown, bao gồm ĐẦY ĐỦ 15 phần sau (Mỗi phần ít nhất 150-200 từ, trích dẫn rõ tên các sao liên quan):

## 1. Bản Mệnh
Vóc dáng trưởng thành, tính cách, tư chất, tài năng, chỉ số IQ, học vấn, khả năng giao tiếp, sức khoẻ.

## 2. Cung Phu Thê
Đời sống hôn nhân, vợ/chồng là người thế nào, ảnh hưởng ra sao, mức độ đào hoa.

## 3. Tài Sản và Nghề Nghiệp (Cung Tài Bạch)
Đánh giá tài chính, độ giàu có, ngành nghề phù hợp, các rủi ro thất thoát.

## 4. Phụ Mẫu
Cha mẹ ra sao, học vấn, kinh tế, tương tác nhân quả với cha mẹ.

## 5. Cung Thiên Di
Biểu hiện khi ra ngoài xã hội, khả năng giao tiếp, thích nghi, mức độ đào hoa.

## 6. Cung Tật Ách
Bệnh tật dễ mắc, tai ương, nguyên nhân tâm bệnh thân bệnh.

## 7. Cung Nô Bộc
Bạn bè, quan hệ với cấp trên cấp dưới, kiểu sếp phù hợp.

## 8. Cung Quan Lộc
Sự nghiệp thuận lợi hay trắc trở? Làm chủ hay làm thuê? Hợp tác hay làm riêng?

## 9. Cung Điền Trạch
Tài vận bất động sản, tích lũy đất đai nhà cửa.

## 10. Cung Tử Tức
Số con cái, giới tính, mức độ hiếu thảo giỏi giang.

## 11. Cung Huynh Đệ
Anh chị em, hỗ trợ làm ăn, hòa thuận không.

## 12. Cung Phúc Đức
Âm phần, nghiệp báo nhân quả, tín ngưỡng, phúc phận chi phối toàn cuộc đời.

## 13. Đại Vận & Năm 2026
Dự báo đại vận hiện tại và đặc biệt chú trọng đi sâu vào vận hạn 2026.

## 14. Tổng Kết Vận Hạn Trong Đời
Tổng quan các khúc ngoặt quan trọng nhất đời.

## 15. TỔNG KẾT & ĐỊNH HƯỚNG TƯƠNG LAI
Đoạn chốt súc tích, lời khuyên thực tế để cải biến vận mệnh.`;
}

export function generateTuViMock(data: TuViInput): string {
  const genderStr = data.gender === 'nam' ? 'Nam Mạng' : 'Nữ Mạng';
  return `## 1. Bản Mệnh
Chào anh/chị **${data.name.toUpperCase()}** (${genderStr}), sinh ngày ${data.dob} lúc ${data.time}. 
Bản mệnh cho thấy sự kiên cường và tư chất thông minh, vóc dáng cân đối và có sức hút riêng. Bạn là người có chỉ số IQ sắc sảo và học vấn vững vàng.

## 2. Cung Phu Thê
Đời sống tình cảm trải qua một vài thăng trầm trước khi tới bến đỗ bình yên. Người phối ngẫu thường có gia thế cơ bản, tính cách thẳng thắn.

## 3. Tài Sản và Nghề Nghiệp
Đánh giá tài chính: Khả năng tự lập tài chính từ sớm, hợp với các ngành nghề đòi hỏi sự sáng tạo hoặc dịch vụ. 

## 4. Phụ Mẫu
Cha mẹ là người chăm chỉ, có nền tảng đạo đức tốt, đã kỳ vọng và hỗ trợ nhiều cho đương số.

## 5. Cung Thiên Di
Sơ đồ ra ngoài thuận lợi, được nhiều quý nhân giúp đỡ, thích nghi cực tốt với môi trường bôn ba.

## 6. Cung Tật Ách
Lưu ý các bệnh liên quan đến dạ dày và hệ thần kinh do suy nghĩ quá nhiều.

## 7. Cung Nô Bộc
Bạn bè ngoài xã hội nhiều nhưng tri kỷ thì ít. Nên kết giao với những người có năng lượng tích cực hơn.

## 8. Cung Quan Lộc
Sự nghiệp có tính thăng trầm ở tiền vận nhưng đến hậu vận rất rực rỡ. Hợp làm quản lý hoặc tự kinh doanh riêng.

## 9. Cung Điền Trạch
Cơ duyên sở hữu nhà đất từ trung vận. Thích hướng di chuyển nhiều khi còn trẻ nhưng sẽ an cư lạc nghiệp sau tuổi 35.

## 10. Cung Tử Tức
Đường con cái thuận lợi, có cả nếp lẫn tẻ. Con cái thông minh, có phần bướng bỉnh nhưng hiếu thảo.

## 11. Cung Huynh Đệ
Anh chị em tự lập, ít có sự trợ giúp lớn về tài chính nhưng tình cảm hòa thuận.

## 12. Cung Phúc Đức
Gia tiên phù hộ mạnh mẽ. Bạn là người có tín ngưỡng và nhạy cảm với các yếu tố tâm linh, trực giác vô cùng chính xác.

## 13. Đại Vận & Năm 2026
Đại vận hiện tại mang tính chất chuyển giao. Năm 2026 là năm bản lề mở ra nhiều cơ hội thay đổi về công việc, tuy nhiên lưu ý sức khỏe vào giữa năm.

## 14. Tổng Kết Vận Hạn Trong Đời
Giai đoạn thịnh vượng nhất rơi vào khoảng 35 - 55 tuổi. Giai đoạn cần cẩn trọng nhất là trước 30 tuổi. Trải qua phong ba, hậu vận vô cùng an nhàn và phú quý!

## 15. TỔNG KẾT & ĐỊNH HƯỚNG TƯƠNG LAI
Tóm lại, lá số của bạn rất sáng ở hậu vận. Trong giai đoạn 3 năm sắp tới, hãy tập trung vào việc trau dồi chuyên môn và mở rộng mối quan hệ tích cực. Đừng ngại thử thách bản thân vì quý nhân đang chờ phía trước. Chúc bạn luôn giữ vững niềm tin và gặt hái thành công!`;
}

/**
 * Xây dựng đường dẫn ảnh lá số tử vi từ lyso.vn
 * Định dạng lyso.vn: https://lyso.vn/lasotuvi/{gender}/{hour}{minute}{day}{month}{year}/{year_xem}/{slug_name}.jpg
 * @param data Dữ liệu đầu vào của người dùng
 * @param yearXem Năm xem (ví dụ: 2026)
 */
export function getTuViChartUrl(data: TuViInput, yearXem: number = new Date().getFullYear()): string {
  // Biến đổi giới tính: "nam" -> 1, "nu" -> 0
  const genderCode = data.gender.toLowerCase() === 'nam' ? 1 : 0;
  
  // Tách ngày sinh (đầu vào từ form input type='date' thường có dạng YYYY-MM-DD hoặc YYYY/MM/DD)
  // Nhưng ở form trang chủ, user đang nhập text hay plugin? Cần đảm bảo tách được dd, mm, yyyy
  // Nếu form đang dùng MM/DD/YYYY hoặc YYYY-MM-DD đều cần Regex chuẩn hóa
  let dd = "", mm = "", yyyy = "";
  let dobParts = data.dob.split(/[-/]/);
  if (dobParts.length === 3) {
    if (dobParts[0].length === 4) {
      // YYYY-MM-DD or YYYY/MM/DD
      yyyy = dobParts[0];
      mm = dobParts[1].padStart(2, "0");
      dd = dobParts[2].padStart(2, "0");
    } else {
      // DD/MM/YYYY or MM/DD/YYYY, default to DD/MM/YYYY
      dd = dobParts[0].padStart(2, "0");
      mm = dobParts[1].padStart(2, "0");
      yyyy = dobParts[2];
    }
  }

  // Tách giờ sinh (đầu vào từ form có dạng HH:mm)
  let hh = "12", min = "00";
  if (data.time) {
    const timeParts = data.time.split(":");
    if (timeParts.length >= 2) {
      hh = timeParts[0].padStart(2, "0");
      min = timeParts[1].padStart(2, "0");
    }
  }

  // Slugify name (Bỏ dấu, khoảng trắng -> gạch ngang)
  const removeAccents = (str: string) => {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  };
  
  const slugName = removeAccents(data.name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // bỏ ký tự đặc biệt
    .replace(/\s+/g, '-'); // Thay khoảng trắng bằng gạch ngang

  const datetimeStr = `${hh}${min}${dd}${mm}${yyyy}`;
  
  // Trả về định dạng lyso.vn
  return `https://lyso.vn/lasotuvi/${genderCode}/${datetimeStr}/${yearXem}/${slugName || "La-So-Tu-Vi"}.jpg`;
}
