export interface TarotCard {
  id: string;
  name_en: string;
  name_vn: string;
  type: string;
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
}

export const tarotDeck: TarotCard[] = [
  {
    "id": "ar00",
    "name_en": "The Fool",
    "name_vn": "Kẻ Khờ",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar00.jpg",
    "uprightMeaning": "Khởi đầu mới, Tự do, Rủi ro, Ngây thơ",
    "reversedMeaning": "Liều lĩnh, Thiếu suy nghĩ, Bất cẩn",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar01",
    "name_en": "The Magician",
    "name_vn": "Ảo Thuật Gia",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar01.jpg",
    "uprightMeaning": "Hành động, Sức mạnh, Ý chí, Sáng tạo",
    "reversedMeaning": "Thao túng, Lừa dối, Thiếu kế hoạch",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar02",
    "name_en": "The High Priestess",
    "name_vn": "Nữ Tư Tế",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar02.jpg",
    "uprightMeaning": "Trực giác, Bí ẩn, Tiềm thức",
    "reversedMeaning": "Bí mật bị che giấu, Thiếu lắng nghe bản thân",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar03",
    "name_en": "The Empress",
    "name_vn": "Nữ Hoàng",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar03.jpg",
    "uprightMeaning": "Sự sinh sôi, Nuôi dưỡng, Sung túc",
    "reversedMeaning": "Dựa dẫm, Tắc nghẽn sáng tạo",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar04",
    "name_en": "The Emperor",
    "name_vn": "Hoàng Đế",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar04.jpg",
    "uprightMeaning": "Cấu trúc, Luật lệ, Quyền lực, Sự ổn định",
    "reversedMeaning": "Độc đoán, Cứng nhắc, Thiếu kỷ luật",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar05",
    "name_en": "The Hierophant",
    "name_vn": "Giáo Hoàng",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar05.jpg",
    "uprightMeaning": "Truyền thống, Tôn giáo, Học hỏi",
    "reversedMeaning": "Nổi loạn, Hạn chế, Đam mê giáo điều",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar06",
    "name_en": "The Lovers",
    "name_vn": "Tình Nhân",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar06.jpg",
    "uprightMeaning": "Tình yêu, Sự hòa hợp, Định mệnh",
    "reversedMeaning": "Mất cân bằng, Rạn nứt, Trái ngược",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar07",
    "name_en": "The Chariot",
    "name_vn": "Cỗ Xe",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar07.jpg",
    "uprightMeaning": "Kiểm soát, Chiến thắng, Hành động",
    "reversedMeaning": "Bất lực, Đè nén, Thiếu kiểm soát",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar08",
    "name_en": "Strength",
    "name_vn": "Sức Mạnh",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar08.jpg",
    "uprightMeaning": "Dũng cảm, Kiên nhẫn, Từ bi",
    "reversedMeaning": "Yếu đuối, Bất an, Tự nghi ngờ",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar09",
    "name_en": "The Hermit",
    "name_vn": "Ẩn Sĩ",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar09.jpg",
    "uprightMeaning": "Cô đơn, Suy ngẫm, Tìm kiếm nội tâm",
    "reversedMeaning": "Cô lập, Lạc lối, Từ chối lời khuyên",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar10",
    "name_en": "Wheel of Fortune",
    "name_vn": "Bánh Xe Tương Lai",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar10.jpg",
    "uprightMeaning": "May mắn, Chu kỳ, Số phận",
    "reversedMeaning": "Xui xẻo, Ngoài tầm kiểm soát",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar11",
    "name_en": "Justice",
    "name_vn": "Công Lý",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar11.jpg",
    "uprightMeaning": "Công bằng, Sự thật, Luật pháp",
    "reversedMeaning": "Bất công, Gian lận, Lảng tránh",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar12",
    "name_en": "The Hanged Man",
    "name_vn": "Người Treo Ngược",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar12.jpg",
    "uprightMeaning": "Hy sinh, Buông bỏ, Chiêm nghiệm",
    "reversedMeaning": "Trì hoãn, Chống cự",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar13",
    "name_en": "Death",
    "name_vn": "Tử Thần",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar13.jpg",
    "uprightMeaning": "Kết thúc, Chuyển giao, Tái sinh",
    "reversedMeaning": "Sợ hãi thay đổi, Bấu víu quá khứ",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar14",
    "name_en": "Temperance",
    "name_vn": "Cân Bằng",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar14.jpg",
    "uprightMeaning": "Hòa hợp, Kiên nhẫn, Điều độ",
    "reversedMeaning": "Mất cân bằng, Bốc đồng, Xung đột",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar15",
    "name_en": "The Devil",
    "name_vn": "Ác Quỷ",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar15.jpg",
    "uprightMeaning": "Cám dỗ, Trói buộc, Vật chất",
    "reversedMeaning": "Giải thoát, Vượt qua cám dỗ",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar16",
    "name_en": "The Tower",
    "name_vn": "Tòa Tháp",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar16.jpg",
    "uprightMeaning": "Đổ vỡ, Thảm họa, Sự thật phơi bày",
    "reversedMeaning": "Sợ hãi đau khổ, Cố chấp níu kéo",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar17",
    "name_en": "The Star",
    "name_vn": "Ngôi Sao",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar17.jpg",
    "uprightMeaning": "Hy vọng, Niềm tin, Đổi mới",
    "reversedMeaning": "Tuyệt vọng, Thiếu niềm tin",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar18",
    "name_en": "The Moon",
    "name_vn": "Mặt Trăng",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar18.jpg",
    "uprightMeaning": "Ảo tưởng, Sợ hãi, Tiềm thức",
    "reversedMeaning": "Vượt qua ảo ảnh, Rõ ràng",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar19",
    "name_en": "The Sun",
    "name_vn": "Mặt Trời",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar19.jpg",
    "uprightMeaning": "Thành công, Vui vẻ, Ấm áp",
    "reversedMeaning": "Tiêu cực, Buồn bã, Thiếu thực tế",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar20",
    "name_en": "Judgement",
    "name_vn": "Phán Xét",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar20.jpg",
    "uprightMeaning": "Tái sinh, Kêu gọi nội tâm, Tha thứ",
    "reversedMeaning": "Sợ bị phán xét, Phủ nhận",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "ar21",
    "name_en": "The World",
    "name_vn": "Thế Giới",
    "type": "major",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/ar21.jpg",
    "uprightMeaning": "Hoàn thành, Thành tựu, Kết thúc một chu kỳ",
    "reversedMeaning": "Dang dở, Bỏ cuộc, Thiếu cố gắng",
    "description": "Lá bài Ẩn chính"
  },
  {
    "id": "wa01",
    "name_en": "Ace of Wands",
    "name_vn": "Ace Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa01.jpg",
    "uprightMeaning": "Khởi đầu mới, Tiềm năng kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Khởi đầu mới, Tiềm năng kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa02",
    "name_en": "Two of Wands",
    "name_vn": "Hai Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa02.jpg",
    "uprightMeaning": "Lựa chọn, Lên kế hoạch kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Lựa chọn, Lên kế hoạch kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa03",
    "name_en": "Three of Wands",
    "name_vn": "Ba Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa03.jpg",
    "uprightMeaning": "Mở rộng, Làm việc nhóm kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Mở rộng, Làm việc nhóm kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa04",
    "name_en": "Four of Wands",
    "name_vn": "Bốn Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa04.jpg",
    "uprightMeaning": "Ổn định, Lễ kỷ niệm kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Ổn định, Lễ kỷ niệm kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa05",
    "name_en": "Five of Wands",
    "name_vn": "Năm Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa05.jpg",
    "uprightMeaning": "Khó khăn, Xung đột kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Khó khăn, Xung đột kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa06",
    "name_en": "Six of Wands",
    "name_vn": "Sáu Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa06.jpg",
    "uprightMeaning": "Thành công, Hỗ trợ kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Thành công, Hỗ trợ kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa07",
    "name_en": "Seven of Wands",
    "name_vn": "Bảy Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa07.jpg",
    "uprightMeaning": "Phòng thủ, Đánh giá kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Phòng thủ, Đánh giá kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa08",
    "name_en": "Eight of Wands",
    "name_vn": "Tám Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa08.jpg",
    "uprightMeaning": "Chuyển động, Học hỏi kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Chuyển động, Học hỏi kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa09",
    "name_en": "Nine of Wands",
    "name_vn": "Chín Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa09.jpg",
    "uprightMeaning": "Khát vọng, Tự hào kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Khát vọng, Tự hào kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa10",
    "name_en": "Ten of Wands",
    "name_vn": "Mười Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa10.jpg",
    "uprightMeaning": "Hoàn tất, Gánh nặng kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Hoàn tất, Gánh nặng kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa11",
    "name_en": "Page of Wands",
    "name_vn": "Page Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa11.jpg",
    "uprightMeaning": "Cơ hội mới, Khám phá kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Cơ hội mới, Khám phá kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa12",
    "name_en": "Knight of Wands",
    "name_vn": "Knight Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa12.jpg",
    "uprightMeaning": "Hành động, Chuyển động nhanh kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Hành động, Chuyển động nhanh kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa13",
    "name_en": "Queen of Wands",
    "name_vn": "Queen Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa13.jpg",
    "uprightMeaning": "Nuôi dưỡng, Tự tin kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Nuôi dưỡng, Tự tin kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "wa14",
    "name_en": "King of Wands",
    "name_vn": "King Gậy",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/wa14.jpg",
    "uprightMeaning": "Kiểm soát, Lãnh đạo kết hợp với Đam mê, Hành động, Sáng tạo",
    "reversedMeaning": "Cản trở: Kiểm soát, Lãnh đạo kết hợp với Chậm trễ, Mất định hướng",
    "description": "Lá bài Ẩn phụ bộ Gậy"
  },
  {
    "id": "cu01",
    "name_en": "Ace of Cups",
    "name_vn": "Ace Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu01.jpg",
    "uprightMeaning": "Khởi đầu mới, Tiềm năng kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Khởi đầu mới, Tiềm năng kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu02",
    "name_en": "Two of Cups",
    "name_vn": "Hai Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu02.jpg",
    "uprightMeaning": "Lựa chọn, Lên kế hoạch kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Lựa chọn, Lên kế hoạch kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu03",
    "name_en": "Three of Cups",
    "name_vn": "Ba Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu03.jpg",
    "uprightMeaning": "Mở rộng, Làm việc nhóm kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Mở rộng, Làm việc nhóm kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu04",
    "name_en": "Four of Cups",
    "name_vn": "Bốn Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu04.jpg",
    "uprightMeaning": "Ổn định, Lễ kỷ niệm kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Ổn định, Lễ kỷ niệm kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu05",
    "name_en": "Five of Cups",
    "name_vn": "Năm Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu05.jpg",
    "uprightMeaning": "Khó khăn, Xung đột kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Khó khăn, Xung đột kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu06",
    "name_en": "Six of Cups",
    "name_vn": "Sáu Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu06.jpg",
    "uprightMeaning": "Thành công, Hỗ trợ kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Thành công, Hỗ trợ kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu07",
    "name_en": "Seven of Cups",
    "name_vn": "Bảy Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu07.jpg",
    "uprightMeaning": "Phòng thủ, Đánh giá kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Phòng thủ, Đánh giá kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu08",
    "name_en": "Eight of Cups",
    "name_vn": "Tám Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu08.jpg",
    "uprightMeaning": "Chuyển động, Học hỏi kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Chuyển động, Học hỏi kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu09",
    "name_en": "Nine of Cups",
    "name_vn": "Chín Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu09.jpg",
    "uprightMeaning": "Khát vọng, Tự hào kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Khát vọng, Tự hào kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu10",
    "name_en": "Ten of Cups",
    "name_vn": "Mười Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu10.jpg",
    "uprightMeaning": "Hoàn tất, Gánh nặng kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Hoàn tất, Gánh nặng kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu11",
    "name_en": "Page of Cups",
    "name_vn": "Page Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu11.jpg",
    "uprightMeaning": "Cơ hội mới, Khám phá kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Cơ hội mới, Khám phá kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu12",
    "name_en": "Knight of Cups",
    "name_vn": "Knight Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu12.jpg",
    "uprightMeaning": "Hành động, Chuyển động nhanh kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Hành động, Chuyển động nhanh kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu13",
    "name_en": "Queen of Cups",
    "name_vn": "Queen Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu13.jpg",
    "uprightMeaning": "Nuôi dưỡng, Tự tin kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Nuôi dưỡng, Tự tin kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "cu14",
    "name_en": "King of Cups",
    "name_vn": "King Cốc",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/cu14.jpg",
    "uprightMeaning": "Kiểm soát, Lãnh đạo kết hợp với Cảm xúc, Tình cảm, Trực giác",
    "reversedMeaning": "Cản trở: Kiểm soát, Lãnh đạo kết hợp với Đè nén cảm xúc, Tổn thương",
    "description": "Lá bài Ẩn phụ bộ Cốc"
  },
  {
    "id": "sw01",
    "name_en": "Ace of Swords",
    "name_vn": "Ace Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw01.jpg",
    "uprightMeaning": "Khởi đầu mới, Tiềm năng kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Khởi đầu mới, Tiềm năng kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw02",
    "name_en": "Two of Swords",
    "name_vn": "Hai Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw02.jpg",
    "uprightMeaning": "Lựa chọn, Lên kế hoạch kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Lựa chọn, Lên kế hoạch kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw03",
    "name_en": "Three of Swords",
    "name_vn": "Ba Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw03.jpg",
    "uprightMeaning": "Mở rộng, Làm việc nhóm kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Mở rộng, Làm việc nhóm kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw04",
    "name_en": "Four of Swords",
    "name_vn": "Bốn Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw04.jpg",
    "uprightMeaning": "Ổn định, Lễ kỷ niệm kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Ổn định, Lễ kỷ niệm kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw05",
    "name_en": "Five of Swords",
    "name_vn": "Năm Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw05.jpg",
    "uprightMeaning": "Khó khăn, Xung đột kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Khó khăn, Xung đột kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw06",
    "name_en": "Six of Swords",
    "name_vn": "Sáu Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw06.jpg",
    "uprightMeaning": "Thành công, Hỗ trợ kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Thành công, Hỗ trợ kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw07",
    "name_en": "Seven of Swords",
    "name_vn": "Bảy Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw07.jpg",
    "uprightMeaning": "Phòng thủ, Đánh giá kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Phòng thủ, Đánh giá kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw08",
    "name_en": "Eight of Swords",
    "name_vn": "Tám Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw08.jpg",
    "uprightMeaning": "Chuyển động, Học hỏi kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Chuyển động, Học hỏi kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw09",
    "name_en": "Nine of Swords",
    "name_vn": "Chín Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw09.jpg",
    "uprightMeaning": "Khát vọng, Tự hào kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Khát vọng, Tự hào kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw10",
    "name_en": "Ten of Swords",
    "name_vn": "Mười Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw10.jpg",
    "uprightMeaning": "Hoàn tất, Gánh nặng kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Hoàn tất, Gánh nặng kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw11",
    "name_en": "Page of Swords",
    "name_vn": "Page Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw11.jpg",
    "uprightMeaning": "Cơ hội mới, Khám phá kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Cơ hội mới, Khám phá kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw12",
    "name_en": "Knight of Swords",
    "name_vn": "Knight Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw12.jpg",
    "uprightMeaning": "Hành động, Chuyển động nhanh kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Hành động, Chuyển động nhanh kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw13",
    "name_en": "Queen of Swords",
    "name_vn": "Queen Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw13.jpg",
    "uprightMeaning": "Nuôi dưỡng, Tự tin kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Nuôi dưỡng, Tự tin kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "sw14",
    "name_en": "King of Swords",
    "name_vn": "King Kiếm",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/sw14.jpg",
    "uprightMeaning": "Kiểm soát, Lãnh đạo kết hợp với Lý trí, Quyết định, Xung đột",
    "reversedMeaning": "Cản trở: Kiểm soát, Lãnh đạo kết hợp với Nhầm lẫn, Lừa dối",
    "description": "Lá bài Ẩn phụ bộ Kiếm"
  },
  {
    "id": "pe01",
    "name_en": "Ace of Pentacles",
    "name_vn": "Ace Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe01.jpg",
    "uprightMeaning": "Khởi đầu mới, Tiềm năng kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Khởi đầu mới, Tiềm năng kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe02",
    "name_en": "Two of Pentacles",
    "name_vn": "Hai Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe02.jpg",
    "uprightMeaning": "Lựa chọn, Lên kế hoạch kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Lựa chọn, Lên kế hoạch kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe03",
    "name_en": "Three of Pentacles",
    "name_vn": "Ba Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe03.jpg",
    "uprightMeaning": "Mở rộng, Làm việc nhóm kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Mở rộng, Làm việc nhóm kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe04",
    "name_en": "Four of Pentacles",
    "name_vn": "Bốn Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe04.jpg",
    "uprightMeaning": "Ổn định, Lễ kỷ niệm kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Ổn định, Lễ kỷ niệm kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe05",
    "name_en": "Five of Pentacles",
    "name_vn": "Năm Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe05.jpg",
    "uprightMeaning": "Khó khăn, Xung đột kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Khó khăn, Xung đột kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe06",
    "name_en": "Six of Pentacles",
    "name_vn": "Sáu Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe06.jpg",
    "uprightMeaning": "Thành công, Hỗ trợ kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Thành công, Hỗ trợ kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe07",
    "name_en": "Seven of Pentacles",
    "name_vn": "Bảy Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe07.jpg",
    "uprightMeaning": "Phòng thủ, Đánh giá kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Phòng thủ, Đánh giá kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe08",
    "name_en": "Eight of Pentacles",
    "name_vn": "Tám Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe08.jpg",
    "uprightMeaning": "Chuyển động, Học hỏi kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Chuyển động, Học hỏi kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe09",
    "name_en": "Nine of Pentacles",
    "name_vn": "Chín Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe09.jpg",
    "uprightMeaning": "Khát vọng, Tự hào kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Khát vọng, Tự hào kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe10",
    "name_en": "Ten of Pentacles",
    "name_vn": "Mười Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe10.jpg",
    "uprightMeaning": "Hoàn tất, Gánh nặng kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Hoàn tất, Gánh nặng kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe11",
    "name_en": "Page of Pentacles",
    "name_vn": "Page Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe11.jpg",
    "uprightMeaning": "Cơ hội mới, Khám phá kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Cơ hội mới, Khám phá kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe12",
    "name_en": "Knight of Pentacles",
    "name_vn": "Knight Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe12.jpg",
    "uprightMeaning": "Hành động, Chuyển động nhanh kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Hành động, Chuyển động nhanh kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe13",
    "name_en": "Queen of Pentacles",
    "name_vn": "Queen Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe13.jpg",
    "uprightMeaning": "Nuôi dưỡng, Tự tin kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Nuôi dưỡng, Tự tin kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  },
  {
    "id": "pe14",
    "name_en": "King of Pentacles",
    "name_vn": "King Tiền",
    "type": "minor",
    "image": "https://raw.githubusercontent.com/howarder3/tarot-api/main/static/cards/pe14.jpg",
    "uprightMeaning": "Kiểm soát, Lãnh đạo kết hợp với Vật chất, Thực tế, Công việc",
    "reversedMeaning": "Cản trở: Kiểm soát, Lãnh đạo kết hợp với Mất mát tài chính, Tham lam",
    "description": "Lá bài Ẩn phụ bộ Tiền"
  }
];
