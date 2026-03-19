import fs from 'fs';
(async () => {
    const res = await fetch('https://dich.kabala.vn/tarot/y-nghia.html');
    const text = await res.text();
    fs.writeFileSync('k.html', text);
    console.log('Saved k.html');
})();
