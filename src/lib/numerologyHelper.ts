export interface NumerologyAnalysis {
  lifePath: number;
  destiny: number; // Sứ mệnh
  soulUrge: number; // Linh hồn
  personality: number; // Nhân cách
  maturity: number; // Trưởng thành
  attitude: number; // Thái độ
  birthDay: number; // Ngày sinh
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

  return {
    lifePath, destiny, soulUrge, personality, maturity, attitude, birthDay,
    pinnacles: { year1, peak1, year2, peak2, year3, peak3, year4, peak4 },
    nameChart, birthChart
  };
}

export function generatePromptForAI(name: string, dob: string, stats: NumerologyAnalysis): string {
  return `Bạn là một chuyên gia Thần số học và Tâm lý học sâu sắc. 
Hãy viết một bản báo cáo phân tích Thần số học thật chi tiết, có tính chữa lành và hướng dẫn hành động cụ thể cho:

Họ và tên: ${name}
Ngày sinh: ${dob}

Các chỉ số thần số học:
- Đường đời (Life Path): ${stats.lifePath}
- Sứ mệnh (Destiny): ${stats.destiny}
- Linh hồn (Soul Urge): ${stats.soulUrge}
- Nhân cách (Personality): ${stats.personality}
- Trưởng thành (Maturity): ${stats.maturity}
- Thái độ (Attitude): ${stats.attitude}
- Ngày sinh (Birth Day): ${stats.birthDay}
- 4 Đỉnh cao: Tuổi ${stats.pinnacles.year1} (Đỉnh ${stats.pinnacles.peak1}), Tuổi ${stats.pinnacles.year2} (Đỉnh ${stats.pinnacles.peak2}), Tuổi ${stats.pinnacles.year3} (Đỉnh ${stats.pinnacles.peak3}), Tuổi ${stats.pinnacles.year4} (Đỉnh ${stats.pinnacles.peak4}).

Yêu cầu giọng văn:
- Học thuật, sâu sắc, đồng cảm, tích cực.
- Không sáo rỗng. Dùng ngôn từ mạnh mẽ giống như một báo cáo tâm lý.
- Nội dung MẠCH LẠC, phân chia Heading đẹp mắt, DÙNG MARKDOWN.

Cấu trúc yêu cầu:
1. Lời mở đầu (Chào mừng và Tóm tắt tổng quan năng lượng).
2. Đường Đời ${stats.lifePath}: Điểm mạnh, bài học lớn nhất, cách khắc phục điểm yếu.
3. Liên kết Sứ Mệnh ${stats.destiny} & Linh Hồn ${stats.soulUrge}: Đam mê sâu thẳm và vũ khí để đạt được thành công.
4. Trải nghiệm từ Chỉ số Thái độ ${stats.attitude} và Nhân cách ${stats.personality}.
5. Tầm nhìn 4 Đỉnh Cao Cuộc Đời.
6. Lời khuyên & Định hướng.
`;
}
