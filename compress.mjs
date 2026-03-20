import fs from 'fs';

try {
  let fileToRead = 'src/lib/tuvi_knowledge.json';
  if (!fs.existsSync(fileToRead)) fileToRead = 'src/lib/tuvi_knowledge_v1.json';
  const db = JSON.parse(fs.readFileSync(fileToRead, 'utf8'));

  const chinhTinhs = [
    'Tử Vi', 'Liêm Trinh', 'Thiên Đồng', 'Vũ Khúc', 'Thái Dương', 'Thiên Cơ', 'Thiên Phủ', 'Thái Âm', 'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương', 'Thất Sát', 'Phá Quân',
    'Tuần', 'Triệt', 'Địa Không / Địa Kiếp', 'Kình Dương / Đà La', 'Hỏa Tinh / Linh Tinh'
  ];

  let compressed = `[DB TỬ VI CHÍNH TINH & LỤC SÁT]\n`;

  // Compress stars
  if (db.stars) {
      for (const s of db.stars) {
        if (chinhTinhs.includes(s.name) || s.type?.includes('Sát tinh')) {
             compressed += `- ${s.name} (${s.type || ''}): ${s.meaning || ''} | Ý: ${s.rules || ''}\n`;
        }
      }
  }

  fs.writeFileSync('src/lib/tuvi_knowledge_mini.txt', compressed, 'utf8');
  console.log("SUCCESS. New length chars: " + compressed.length);
} catch(e) { console.error(e); }
