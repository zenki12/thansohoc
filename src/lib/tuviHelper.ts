export interface TuViInput {
  name: string;
  dob: string;
  time: string;
  gender: string;
}

export function generateTuViAIPrompt(data: TuViInput): string {
  const genderStr = data.gender === 'nam' ? 'Nam Mạng' : 'Nữ Mạng';
  return `Tưởng tượng bạn là 1 ông thầy tử vi cao tuổi, có trình độ cao, có nửa đời người chuyên luận đoán lá số vận mệnh con người. Từ giờ tôi muốn bạn tổng hợp các mục thông tin, các điểm chính yếu được trích dẫn trong tài liệu giải đoán lá số tử vi mà tôi đính kèm. Kèm theo những hiểu biết và kinh nghiệm giải đoán đỉnh cao của bạn để đưa ra các thông tin giải đoán lá số này. Khách hàng của bạn là:
- Họ và tên: ${data.name}
- Ngày sinh Dương Lịch: ${data.dob}
- Giờ sinh: ${data.time}
- Giới tính: ${genderStr}

YÊU CẦU ĐẶC BIỆT VỀ ĐỘ DÀI VÀ CHI TIẾT (RẤT QUAN TRỌNG):
Bài luận này là một dịch vụ cao cấp, do đó bạn PHẢI viết cực kỳ dông dài, chi tiết và sâu sắc. Tổng bài luận PHẢI dài trên 2500 từ. Tại mỗi phần trong 14 phần dưới đây, bạn phải viết ít nhất 200 từ (khoảng 3-5 đoạn văn chi tiết). Hãy bóc tách vấn đề theo nhiều góc độ: ưu điểm, nhược điểm, lời khuyên hóa giải hung hiểm, phản biện, và ví dụ cụ thể hình tượng hóa. KHÔNG ĐƯỢC VIẾT NGẮN GỌN CHUNG CHUNG.

Hãy viết bài luận theo định dạng Markdown, bao gồm ĐẦY ĐỦ 14 phần sau:

## 1. Bản Mệnh
Vóc dáng trưởng thành, tính cách, tư chất, tài năng, chỉ số IQ, học vấn, khả năng giao tiếp, sức khoẻ. (Hãy phân tích thật tỉ mỉ nhiều khía cạnh).

## 2. Cung Phu Thê
Đời sống hôn nhân, vợ/chồng là người thế nào, ảnh hưởng ra sao, gia thế, tình cảm, hạnh phúc hay khổ đau, mức độ đào hoa, điểm cần lưu ý. (Khai thác sâu vào tâm lý hôn nhân).

## 3. Tài Sản và Nghề Nghiệp (Cung Tài Bạch)
Đánh giá tài chính, độ giàu có, ngành nghề phù hợp, cách kiếm tiền hoặc kinh doanh. (Viết chi tiết các luồng sinh tài và rủi ro thất thoát).

## 4. Phụ Mẫu
Cha mẹ ra sao, học vấn, kinh tế, cách cư xử với mọi người. (Đánh giá tương tác nhân quả với cha mẹ).

## 5. Cung Thiên Di
Biểu hiện khi ra ngoài, xã hội đánh giá thế nào, khả năng giao tiếp, độ thích nghi, các tài năng chính, thử thách thường gặp, mức độ đào hoa.

## 6. Cung Tật Ách
Bệnh tật dễ mắc, tai ương, lưu ý về sức khoẻ. (Chỉ ra nguyên nhân tâm bệnh và thân bệnh).

## 7. Cung Nô Bộc
Bạn bè, quan hệ xã hội, hợp làm ăn không, nên kết giao với ai, quan hệ với cấp trên, kiểu sếp phù hợp.

## 8. Cung Quan Lộc
Con đường công danh sự nghiệp có thuận lợi hay trắc trở? Người này có xu hướng làm chủ hay làm thuê? Có phù hợp với chính trị, chức quyền hay công việc ổn định không? Nếu kinh doanh, nên làm riêng hay hợp tác? Những giai đoạn thuận lợi trong sự nghiệp?

## 9. Cung Điền Trạch
Khả năng sở hữu nhà đất thế nào? Tài vận bất động sản tốt hay xấu? Nên đầu tư vào đất đai, nhà cửa không? Người này có xu hướng thích sống ổn định hay di chuyển nhiều?

## 10. Cung Tử Tức
Có dễ sinh con không? Có hiếm muộn không? Dự báo số lượng con cái, con trai hay con gái nhiều hơn? Con cái có giỏi giang, hiếu thảo không? Mối quan hệ giữa người này với con cái thế nào? Những vấn đề đặc biệt có không?

## 11. Cung Huynh Đệ
Nhà mấy anh chị em? Có được nhờ anh chị em không hay ngược lại? Khả năng kết hợp làm ăn kinh doanh với anh chị em ruột được không?

## 12. Cung Phúc Đức
Trong họ thường có bà cô tổ, ông tổ cậu nào chết trẻ linh thiêng hay phù hộ không? Gia tiên có linh thiêng không? Phúc phần của gia tộc ảnh hưởng đến người này thế nào? Niềm tin Tâm linh, tín ngưỡng của người này có mạnh không? Nghiệp báo, nhân quả có tác động hay đã được báo hiệu gì trước trong lá số?

## 13. Đại Vận & Năm 2026
Đánh giá vận hiện tại (tuổi), dự báo năm 2026 về công việc, thu nhập, tình duyên, gia đạo, sức khoẻ, điểm cần lưu ý. (Đưa ra dự báo chi tiết theo tháng nếu có thể).

## 14. Tổng Kết Vận Hạn Trong Đời
Những đại vận đáng chú ý nhất (thịnh vượng hay khó khăn)? Giai đoạn nào cần cẩn trọng nhất? Lời khuyên vàng ngọc cuối cùng từ lão phu.`;
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
Giai đoạn thịnh vượng nhất rơi vào khoảng 35 - 55 tuổi. Giai đoạn cần cẩn trọng nhất là trước 30 tuổi. Trải qua phong ba, hậu vận vô cùng an nhàn và phú quý!`;
}
