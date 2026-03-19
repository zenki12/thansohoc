import fs from 'fs';

const majors = [
  ['ar00', 'The Fool', 'Kẻ Khờ', 'Khởi đầu mới, Tự do, Rủi ro, Ngây thơ', 'Liều lĩnh, Thiếu suy nghĩ, Bất cẩn'],
  ['ar01', 'The Magician', 'Ảo Thuật Gia', 'Hành động, Sức mạnh, Ý chí, Sáng tạo', 'Thao túng, Lừa dối, Thiếu kế hoạch'],
  ['ar02', 'The High Priestess', 'Nữ Tư Tế', 'Trực giác, Bí ẩn, Tiềm thức', 'Bí mật bị che giấu, Thiếu lắng nghe bản thân'],
  ['ar03', 'The Empress', 'Nữ Hoàng', 'Sự sinh sôi, Nuôi dưỡng, Sung túc', 'Dựa dẫm, Tắc nghẽn sáng tạo'],
  ['ar04', 'The Emperor', 'Hoàng Đế', 'Cấu trúc, Luật lệ, Quyền lực, Sự ổn định', 'Độc đoán, Cứng nhắc, Thiếu kỷ luật'],
  ['ar05', 'The Hierophant', 'Giáo Hoàng', 'Truyền thống, Tôn giáo, Học hỏi', 'Nổi loạn, Hạn chế, Đam mê giáo điều'],
  ['ar06', 'The Lovers', 'Tình Nhân', 'Tình yêu, Sự hòa hợp, Định mệnh', 'Mất cân bằng, Rạn nứt, Trái ngược'],
  ['ar07', 'The Chariot', 'Cỗ Xe', 'Kiểm soát, Chiến thắng, Hành động', 'Bất lực, Đè nén, Thiếu kiểm soát'],
  ['ar08', 'Strength', 'Sức Mạnh', 'Dũng cảm, Kiên nhẫn, Từ bi', 'Yếu đuối, Bất an, Tự nghi ngờ'],
  ['ar09', 'The Hermit', 'Ẩn Sĩ', 'Cô đơn, Suy ngẫm, Tìm kiếm nội tâm', 'Cô lập, Lạc lối, Từ chối lời khuyên'],
  ['ar10', 'Wheel of Fortune', 'Bánh Xe Tương Lai', 'May mắn, Chu kỳ, Số phận', 'Xui xẻo, Ngoài tầm kiểm soát'],
  ['ar11', 'Justice', 'Công Lý', 'Công bằng, Sự thật, Luật pháp', 'Bất công, Gian lận, Lảng tránh'],
  ['ar12', 'The Hanged Man', 'Người Treo Ngược', 'Hy sinh, Buông bỏ, Chiêm nghiệm', 'Trì hoãn, Chống cự'],
  ['ar13', 'Death', 'Tử Thần', 'Kết thúc, Chuyển giao, Tái sinh', 'Sợ hãi thay đổi, Bấu víu quá khứ'],
  ['ar14', 'Temperance', 'Cân Bằng', 'Hòa hợp, Kiên nhẫn, Điều độ', 'Mất cân bằng, Bốc đồng, Xung đột'],
  ['ar15', 'The Devil', 'Ác Quỷ', 'Cám dỗ, Trói buộc, Vật chất', 'Giải thoát, Vượt qua cám dỗ'],
  ['ar16', 'The Tower', 'Tòa Tháp', 'Đổ vỡ, Thảm họa, Sự thật phơi bày', 'Sợ hãi đau khổ, Cố chấp níu kéo'],
  ['ar17', 'The Star', 'Ngôi Sao', 'Hy vọng, Niềm tin, Đổi mới', 'Tuyệt vọng, Thiếu niềm tin'],
  ['ar18', 'The Moon', 'Mặt Trăng', 'Ảo tưởng, Sợ hãi, Tiềm thức', 'Vượt qua ảo ảnh, Rõ ràng'],
  ['ar19', 'The Sun', 'Mặt Trời', 'Thành công, Vui vẻ, Ấm áp', 'Tiêu cực, Buồn bã, Thiếu thực tế'],
  ['ar20', 'Judgement', 'Phán Xét', 'Tái sinh, Kêu gọi nội tâm, Tha thứ', 'Sợ bị phán xét, Phủ nhận'],
  ['ar21', 'The World', 'Thế Giới', 'Hoàn thành, Thành tựu, Kết thúc một chu kỳ', 'Dang dở, Bỏ cuộc, Thiếu cố gắng']
];

const suits = [
  ['wa', 'Wands', 'Gậy', 'Đam mê, Hành động, Sáng tạo', 'Chậm trễ, Mất định hướng'],
  ['cu', 'Cups', 'Cốc', 'Cảm xúc, Tình cảm, Trực giác', 'Đè nén cảm xúc, Tổn thương'],
  ['sw', 'Swords', 'Kiếm', 'Lý trí, Quyết định, Xung đột', 'Nhầm lẫn, Lừa dối'],
  ['pe', 'Pentacles', 'Tiền', 'Vật chất, Thực tế, Công việc', 'Mất mát tài chính, Tham lam']
];

const ranks = [
  ['ac', 'Ace', 'Ace', 'Khởi đầu mới, Tiềm năng'],
  ['02', '02', 'Hai', 'Lựa chọn, Lên kế hoạch'],
  ['03', '03', 'Ba', 'Mở rộng, Làm việc nhóm'],
  ['04', '04', 'Bốn', 'Ổn định, Lễ kỷ niệm'],
  ['05', '05', 'Năm', 'Khó khăn, Xung đột'],
  ['06', '06', 'Sáu', 'Thành công, Hỗ trợ'],
  ['07', '07', 'Bảy', 'Phòng thủ, Đánh giá'],
  ['08', '08', 'Tám', 'Chuyển động, Học hỏi'],
  ['09', '09', 'Chín', 'Khát vọng, Tự hào'],
  ['10', '10', 'Mười', 'Hoàn tất, Gánh nặng'],
  ['11', 'pa', 'Page', 'Cơ hội mới, Khám phá'],
  ['12', 'kn', 'Knight', 'Hành động, Chuyển động nhanh'],
  ['13', 'qu', 'Queen', 'Nuôi dưỡng, Tự tin'],
  ['14', 'ki', 'King', 'Kiểm soát, Lãnh đạo']
];

let cards = [];

majors.forEach(m => {
  cards.push({
    id: m[0],
    name_en: m[1],
    name_vn: m[2],
    type: 'major',
    image: `https://sacred-texts.com/tarot/pkt/img/${m[0]}.jpg`,
    uprightMeaning: m[3],
    reversedMeaning: m[4],
    description: "Lá bài Ẩn chính"
  });
});

suits.forEach(s => {
  ranks.forEach(r => {
    cards.push({
      id: `${s[0]}${r[0]}`,
      name_en: `${r[1].length > 2 ? r[1] : parseInt(r[1])} of ${s[1]}`, // Just to format english name properly if wanted, but fine
      name_vn: `${r[2]} ${s[2]}`,
      type: 'minor',
      image: `https://sacred-texts.com/tarot/pkt/img/${s[0]}${r[0]}.jpg`,
      uprightMeaning: `${r[3]} kết hợp với ${s[3]}`,
      reversedMeaning: `Cản trở: ${r[3]} kết hợp với ${s[4]}`,
      description: `Lá bài Ẩn phụ bộ ${s[2]}`
    });
  });
});

const content = `export interface TarotCard {
  id: string;
  name_en: string;
  name_vn: string;
  type: string;
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
}

export const tarotDeck: TarotCard[] = ${JSON.stringify(cards, null, 2)};
`;

fs.writeFileSync('src/lib/tarotData.ts', content);
console.log('Done generating 78 cards with Sacred Texts URLs!');
