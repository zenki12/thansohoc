export interface NumerologyAnalysis {
  lifePath: number;
  destiny: number; // Sứ mệnh
  soulUrge: number; // Linh hồn
  personality: number; // Nhân cách
  maturity: number; // Trưởng thành
  attitude: number; // Thái độ
  birthDay: number; // Ngày sinh
  personalYear: number;
  personalMonth: number;
  missingNumbers: number[];
  pinnacles: {
    year1: number; peak1: number;
    year2: number; peak2: number;
    year3: number; peak3: number;
    year4: number; peak4: number;
  };
  nameChart: Record<number, number>; // Lưới tên
  birthChart: Record<number, number>; // Lưới ngày sinh
}

export function removeVietnameseTones(str: string): string {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

export function reduceNumber(num: number, keepMaster: boolean = true): number {
  if (keepMaster && (num === 11 || num === 22 || num === 33)) return num;
  if (num < 10) return num;
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return reduceNumber(sum, keepMaster);
}

const letterToNumber: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

const vowels = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

export function isVowel(char: string): boolean {
  return vowels.has(char.toUpperCase());
}

export function calculateNumerology(fullName: string, dobString: string): NumerologyAnalysis {
  const normName = removeVietnameseTones(fullName).toUpperCase().replace(/[^A-Z]/g, '');
  
  // Date parsing: accept YYYY-MM-DD
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

  const redDay = reduceNumber(day);
  const redMonth = reduceNumber(month);
  const redYear = reduceNumber(year);

  const lifePath = reduceNumber(redDay + redMonth + redYear);
  const birthDay = reduceNumber(day);
  const attitude = reduceNumber(day + month, false); 
  
  let vowelsSum = 0;
  let consonantsSum = 0;
  let totalNameSum = 0;

  const nameChart: Record<number, number> = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};

  for (let i = 0; i < normName.length; i++) {
    const char = normName[i];
    const val = letterToNumber[char];
    if (val) {
      nameChart[val]++;
      totalNameSum += val;
      if (isVowel(char)) {
        vowelsSum += val;
      } else {
        consonantsSum += val;
      }
    }
  }

  // Reduce name sums
  // Soul urge normally reduces the sum of all vowels
  const soulUrge = reduceNumber(vowelsSum);
  const personality = reduceNumber(consonantsSum);
  const destiny = reduceNumber(totalNameSum);
  const maturity = reduceNumber(lifePath + destiny);

  const peak1 = reduceNumber(redMonth + redDay);
  const peak2 = reduceNumber(redDay + redYear);
  const peak3 = reduceNumber(peak1 + peak2);
  const peak4 = reduceNumber(redMonth + redYear);

  const year1 = 36 - reduceNumber(lifePath, false);
  const year2 = year1 + 9;
  const year3 = year2 + 9;
  const year4 = year3 + 9;

  const dobDigits = String(day) + String(month) + String(year);
  const birthChart: Record<number, number> = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
  for (let i = 0; i < dobDigits.length; i++) {
    const d = parseInt(dobDigits[i]);
    if (d > 0) birthChart[d]++;
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const personalYear = reduceNumber(redDay + redMonth + reduceNumber(currentYear));
  const personalMonth = reduceNumber(personalYear + reduceNumber(currentMonth), false);

  const missingNumbers: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!nameChart[i]) missingNumbers.push(i);
  }

  return {
    lifePath, destiny, soulUrge, personality, maturity, attitude, birthDay,
    personalYear, personalMonth, missingNumbers,
    pinnacles: { year1, peak1, year2, peak2, year3, peak3, year4, peak4 },
    nameChart, birthChart
  };
}

export function generatePromptForAI(name: string, dob: string, stats: NumerologyAnalysis): string {
  return `Bạn là một CHUYÊN GIA THẦN SỐ HỌC chuẩn hệ Pythagoras và TÂM LÝ HỌC HÀNH VI hàng đầu thế giới.
Báo cáo của bạn được tính phí rất cao, do đó yêu cầu độ DÀI (Hơn 1500 từ), SÂU SẮC và CHI TIẾT ĐẾN TỪNG KHÍA CẠNH, giống như một cuốn sách nhỏ phân tích tâm lý cá nhân.

Khách hàng:
- Họ và tên: ${name}
- Ngày sinh: ${dob}

Bộ số cốt lõi:
- ĐƯỜNG ĐỜI (Life Path): ${stats.lifePath}
- SỨ MỆNH (Destiny): ${stats.destiny}
- LINH HỒN (Soul Urge): ${stats.soulUrge}
- NHÂN CÁCH (Personality): ${stats.personality}
- THÁI ĐỘ (Attitude): ${stats.attitude}
- NGÀY SINH (Birth Day): ${stats.birthDay}
- TRƯỞNG THÀNH (Maturity): ${stats.maturity}
- NĂM CÁ NHÂN (Năm ${new Date().getFullYear()}): ${stats.personalYear}
- THÁNG CÁ NHÂN (Tháng ${new Date().getMonth() + 1}): ${stats.personalMonth}
- CHỈ SỐ THIẾU (Karmic Lessons): ${stats.missingNumbers.length > 0 ? stats.missingNumbers.join(', ') : 'Không có'}

YÊU CẦU CẤU TRÚC MARKDOWN CHUẨN XÁC, sử dụng EMOJI Đinh Dạng như sau:

## 🌟 LỜI MỞ ĐẦU
(Viết thật bay bổng, tâm linh, dự đoán tổng thể bức tranh cuộc đời dựa vào sự kết hợp giữa ${stats.lifePath} và ${stats.destiny})

## 📌 CHỈ SỐ ĐƯỜNG ĐỜI: ${stats.lifePath}
(Khoảng 500 từ. Phân tích TẬN GỐC RỄ. Đừng chỉ liệt kê chung chung)
### 1. Bản chất năng lượng cốt lõi
### 2. Sức mạnh và Vũ khí thiên bẩm
### 3. Vùng tối & Các cạm bẫy tâm lý thường gặp
### 4. Bài học giải thoát và chuyển hóa

## 🎯 CHỈ SỐ SỨ MỆNH: ${stats.destiny}
(Khoảng 400 từ. Mục đích sống và nghiệp quả phải làm)
### Bản chất Sứ mệnh
### Phương pháp hiện thực hoá sứ mệnh

## 💖 CHỈ SỐ LINH HỒN: ${stats.soulUrge}
(Khoảng 300 từ. Nỗi khát khao thầm kín, ngôn ngữ tình yêu, mong mỏi trong các mối quan hệ sâu sắc)

## 🎭 NHÂN CÁCH ${stats.personality} & THÁI ĐỘ ${stats.attitude}
(Lớp vỏ bọc bên ngoài và phản xạ tự nhiên khi gặp chuyện)

## 🏔️ CHU KỲ 4 ĐỈNH CAO CUỘC ĐỜI
- **Đỉnh 1 (Tuổi ${stats.pinnacles.year1}):** Năng lượng đỉnh số ${stats.pinnacles.peak1}. Chi tiết cơ hội sẽ đến.
- **Đỉnh 2 (Tuổi ${stats.pinnacles.year2}):** Năng lượng đỉnh số ${stats.pinnacles.peak2}. Chi tiết thử thách.
- **Đỉnh 3 (Tuổi ${stats.pinnacles.year3}):** Năng lượng đỉnh số ${stats.pinnacles.peak3}. Đỉnh cao tài chính/tinh thần ra sao?
- **Đỉnh 4 (Tuổi ${stats.pinnacles.year4}):** Năng lượng đỉnh số ${stats.pinnacles.peak4}. Giai đoạn hậu vận.

## ⏳ NHỊP ĐIỆU THỜI GIAN: NĂM CÁ NHÂN ${stats.personalYear}
(Phân tích sâu sắc về vận trình năm nay, cơ hội và những cạm bẫy cần tránh. Bạn đang ở tháng cá nhân ${stats.personalMonth})

## 🧩 CHỈ SỐ KHUYẾT (KARMIC LESSONS): ${stats.missingNumbers.length > 0 ? stats.missingNumbers.join(', ') : 'Không có'}
(Bài học nghiệp quả do thiếu vắng các con số này trong ngày sinh và tên)

## 💡 TỔNG KẾT & ĐỊNH HƯỚNG TƯƠNG LAI
(Kết luận truyền cảm hứng, sắc sảo).

LƯU Ý QUAN TRỌNG: Văn phong mang tính chất chữa lành (healing) nhưng phải Đanh Thép, Chuyên Môn Cao. ĐẾM SỐ TỪ TRONG SUY NGHĨ ĐỂ ĐẢM BẢO CHIỀU DÀI THẬT SỰ CHUYÊN SÂU. CẤM VIẾT NGẮN CỤT LỦN!`;
}
