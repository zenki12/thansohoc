import fs from 'fs';
import https from 'https';

const url = 'https://raw.githubusercontent.com/ekelen/tarot-api/master/data/tarot-images.json';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const vnNames = {
        'ar00': 'Kẻ Khờ (The Fool)', 'ar01': 'Ảo Thuật Gia (The Magician)', 'ar02': 'Nữ Tư Tế (The High Priestess)',
        'ar03': 'Nữ Hoàng (The Empress)', 'ar04': 'Hoàng Đế (The Emperor)', 'ar05': 'Giáo Hoàng (The Hierophant)',
        'ar06': 'Tình Nhân (The Lovers)', 'ar07': 'Cỗ Xe (The Chariot)', 'ar08': 'Sức Mạnh (Strength)',
        'ar09': 'Ẩn Sĩ (The Hermit)', 'ar10': 'Bánh Xe Tương Lai (Wheel of Fortune)', 'ar11': 'Công Lý (Justice)',
        'ar12': 'Người Treo Ngược (The Hanged Man)', 'ar13': 'Tử Thần (Death)', 'ar14': 'Cân Bằng (Temperance)',
        'ar15': 'Ác Quỷ (The Devil)', 'ar16': 'Tòa Tháp (The Tower)', 'ar17': 'Ngôi Sao (The Star)',
        'ar18': 'Mặt Trăng (The Moon)', 'ar19': 'Mặt Trời (The Sun)', 'ar20': 'Phán Xét (Judgement)',
        'ar21': 'Thế Giới (The World)'
    };
    
    const cards = json.cards.map(c => {
        let vnName = c.name;
        if (vnNames[c.name_short]) {
            vnName = vnNames[c.name_short];
        } else {
            vnName = vnName.replace('Ace', 'Ace');
            vnName = vnName.replace('Two', 'Hai').replace('Three', 'Ba').replace('Four', 'Bốn').replace('Five', 'Năm');
            vnName = vnName.replace('Six', 'Sáu').replace('Seven', 'Bảy').replace('Eight', 'Tám').replace('Nine', 'Chín');
            vnName = vnName.replace('Ten', 'Mười').replace('Page', 'Page').replace('Knight', 'Knight').replace('Queen', 'Queen').replace('King', 'King');
            vnName = vnName.replace('of Wands', 'Gậy').replace('of Cups', 'Cốc').replace('of Swords', 'Kiếm').replace('of Pentacles', 'Tiền');
        }

        return {
           id: c.name_short,
           name_en: c.name,
           name_vn: vnName,
           type: c.type,
           image: `https://raw.githubusercontent.com/ekelen/tarot-api/master/static/cards/${c.name_short}.jpg`,
           uprightMeaning: c.meaning_up,
           reversedMeaning: c.meaning_rev,
           description: c.desc,
        }
    });

    const fileContent = `export interface TarotCard {
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
    fs.writeFileSync('src/lib/tarotData.ts', fileContent);
    console.log('Successfully generated 78 Tarot cards in src/lib/tarotData.ts');
  });
}).on('error', (e) => {
  console.error(e);
});
