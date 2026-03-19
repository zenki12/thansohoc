export interface MatrixDestinyStats {
  center: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  karmicTail: string; // Kết hợp các đỉnh
  moneyLine: string;
  loveLine: string;
  purpose: number;
}

// Hàm rút gọn về số nhỏ hơn hoặc bằng 22 (22 Ẩn Chính của Tarot)
export function reduceTo22(num: number): number {
  if (num <= 22 && num > 0) return num;
  let sum = 0;
  let temp = num;
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }
  return sum <= 22 ? sum : reduceTo22(sum);
}

export function calculateMatrixDestiny(name: string, dobString: string): MatrixDestinyStats {
  const dobParts = dobString.split(/[-/]/);
  let day = 0, month = 0, year = 0;
  if (dobParts[0].length === 4) {
    year = parseInt(dobParts[0]);
    month = parseInt(dobParts[1]);
    day = parseInt(dobParts[2]);
  } else {
    day = parseInt(dobParts[0]);
    month = parseInt(dobParts[1]);
    year = parseInt(dobParts[2]);
  }

  // Căn bản Matrix Destiny (dựa vào hệ Tarot 22 lá)
  // Left: Ngày sinh
  const left = reduceTo22(day);
  
  // Top: Tháng sinh
  const top = reduceTo22(month);
  
  // Right: Năm sinh
  let yearSum = 0;
  let tempYear = year;
  while(tempYear > 0) {
    yearSum += tempYear % 10;
    tempYear = Math.floor(tempYear / 10);
  }
  const right = reduceTo22(yearSum);
  
  // Bottom: Điểm karma (Tổng Left, Top, Right)
  const bottom = reduceTo22(left + top + right);
  
  // Center: Tâm hồn, điểm quan trọng nhất (Tổng 4 góc)
  const center = reduceTo22(left + top + right + bottom);

  // Đuôi Nghiệp Quả (Karmic Tail): Thường là dãy 3 số kết nối từ Bottom đến Center
  const bottomCenterMiddle = reduceTo22(bottom + center);
  const bottomInner = reduceTo22(bottom + bottomCenterMiddle);
  const karmicTail = `${bottom}-${bottomCenterMiddle}-${bottomInner}`;

  // Đường tiền bạc (Money Line): Dãy số nằm giữa Right và Center
  const rightCenterMiddle = reduceTo22(right + center);
  const rightInner = reduceTo22(right + rightCenterMiddle);
  const moneyLine = `${center}-${rightCenterMiddle}-${right}`;

  // Đường tình duyên (Love Line): Dãy số nằm giữa Bottom và Right
  const loveLine = `${bottom}-${reduceTo22(bottom + right)}-${right}`;

  // Sứ mệnh tổng thể (Purpose)
  const purpose = reduceTo22(center + top + left + right + bottom);

  return {
    center,
    top,
    bottom,
    left,
    right,
    karmicTail,
    moneyLine,
    loveLine,
    purpose
  };
}

export function generateMatrixPromptForAI(name: string, dob: string, stats: MatrixDestinyStats): string {
  return `Bạn là một CHUYÊN GIA GIẢI MÃ MA TRẬN ĐỊNH MỆNH (Matrix Destiny) và TAROT CHUYÊN SÂU hàng đầu thế giới.
Báo cáo của bạn được tính phí rất cao, vô cùng SÂU SẮC, TRỰC DIỆN rọi sáng linh hồn, và CHI TIẾT TỪNG DÒNG NĂNG LƯỢNG (hơn 1500 từ). 

Khách hàng:
- Họ và tên: ${name}
- Ngày sinh: ${dob}

Cấu trúc các điểm trong Ma trận Định mệnh của ${name} (tương ứng với 22 lá Ẩn Chính Tarot):
- Tâm sáng tạo (Center - Điểm thoải mái nhất của tâm hồn): Số ${stats.center}
- Tài năng thiên bẩm (Top - Quà tặng từ Thượng Đế): Số ${stats.top}
- Vỏ bọc cá nhân (Left - Cách người khác nhìn nhận bạn): Số ${stats.left}
- Nghiệp quả quá khứ & Đuôi nghiệp (Bottom/Karmic Tail): Số ${stats.bottom} (Dãy Karmic Tail: ${stats.karmicTail})
- Khát vọng tương lai (Right - Bài học và thử thách): Số ${stats.right}
- Kênh tài chính, sự nghiệp (Money Line): ${stats.moneyLine}
- Kênh tình yêu, hôn nhân (Love Line): ${stats.loveLine}
- Đích đến linh hồn (Purpose): Số ${stats.purpose}

YÊU CẦU CẤU TRÚC MARKDOWN (Sử dụng biểu tượng cực đẹp):

## 🌌 LỜI MỞ ĐẦU TỪ VŨ TRỤ
(Viết thật huyền bí, tâm linh. Phân tích rung động năng lượng tổng quan khi đọc bản đồ này.)

## ⚛️ 1. LÕI MA TRẬN: TÂM HỒN & ĐIỂM CÂN BẰNG (SỐ ${stats.center})
(Khoảng 400 từ. Phân tích Arcana tương ứng. Trực diện vào sức mạnh cốt lõi, tâm thức. Tại sao lại là số ${stats.center}? Cần làm gì để kích hoạt sức mạnh này?)

## 🎁 2. TÀI NĂNG THIÊN BẨM BỊ LÃNG QUÊN (SỐ ${stats.top})
(Khoảng 300 từ. Phân tích món quà từ Thần linh mang số ${stats.top}. Làm sao để tỏa sáng? Điểm mù nào cản trở bạn sử dụng tài năng này?)

## 🎭 3. LỚP MẶT NẠ & VẬN MỆNH HIỆN TẠI (SỐ ${stats.left})
(Cách bạn phản ứng với xã hội và ấn tượng đầu tiên. Các vấn đề sức khỏe hoặc vỏ bọc cần gỡ bỏ)

## 🌪️ 4. ĐUÔI NGHIỆP QUẢ [KARMIC TAIL]: ${stats.karmicTail}
(Khoảng 350 từ. RẤT QUAN TRỌNG! Phân tích kiếp trước bạn đã từng là ai, gây ra lỗi lầm gì để kiếp này phải gánh cụm nghiệp ${stats.karmicTail}. Hướng dẫn CHI TIẾT cách trả nghiệp.)

## 💰 5. KÊNH TÀI CHÍNH & SỰ NGHIỆP: ${stats.moneyLine}
(Khoảng 300 từ. Nghề nghiệp phù hợp. Nút thắt nào đang chặn dòng tiền của bạn? Cách khơi thông dòng chảy tài vượng bằng năng lượng cụm số này.)

## ❤️ 6. KÊNH TÌNH YÊU & MỐI QUAN HỆ: ${stats.loveLine}
(Người đồng hành hoàn hảo của bạn mang năng lượng thế nào? Bạn thường dính nghiệp gì trong tình yêu và làm sao để thoát ra?)

## 🏔️ 7. SỨ MỆNH LINH HỒN TỐI THƯỢNG (SỐ ${stats.purpose})
(Điểm đến cuối cùng. Lời khuyên định hướng tương lai, đánh thức vị thần bên trong khách hàng.)

## 💡 8. TỔNG KẾT & ĐỊNH HƯỚNG TRỌNG TÂM
(Đưa ra một đoạn tổng kết tổng quan ngắn gọn, súc tích và mạch lạc nhất. Định hướng rõ ràng cho đương số biết họ cần làm gì tiếp theo, tập trung vào đâu để vươn tới ngưỡng cao nhất của bản thân. Lời khuyên phải mang tính thực tế, hành động, truyền cảm hứng và dễ hiểu.)

LƯU Ý QUAN TRỌNG: Văn phong mang tính chất CHỮA LÀNH SÂU SẮC, KẾT HỢP KIẾN THỨC TAROT ĐỂ PHÂN TÍCH (Ví dụ số 1 là The Magician, 6 là The Lovers, 15 là The Devil...). Rất Chuyên Môn, Không giáo điều cứng nhắc. ĐẾM SỐ TỪ ĐỂ ĐẢM BẢO CHIỀU DÀI CHUYÊN SÂU THẬT SỰ (~1500 TỪ), KHÔNG VIẾT NGẮN CỤT LỦN! Mọi phân tích phải có tính cá nhân hóa cực cao.`;
}
