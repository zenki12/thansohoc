import https from 'https';

const testUrls = [
  'https://sacred-texts.com/tarot/pkt/img/peki.jpg',
  'https://sacred-texts.com/tarot/pkt/img/pequ.jpg',
  'https://sacred-texts.com/tarot/pkt/img/pekn.jpg',
  'https://sacred-texts.com/tarot/pkt/img/pepa.jpg',
];

testUrls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => 
    console.log(url, res.statusCode)
  ).on('error', e => console.log(url, e.message));
});
