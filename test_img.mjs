import https from 'https';

const testUrls = [
  'https://raw.githubusercontent.com/howlCode/tarot_api/master/static/cards/ar00.jpg',
  'https://raw.githubusercontent.com/ekelen/tarot-api/master/static/cards/ar00.jpg',
  'https://raw.githubusercontent.com/mitchartemis/tarot-api/main/static/cards/ar00.jpg',
  'https://raw.githubusercontent.com/metabismuth/tarot-json/master/cards/ar00.jpg',
  'https://raw.githubusercontent.com/searge/tarot/master/images/cards/ar00.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg'
];

testUrls.forEach(url => {
  https.get(url, res => console.log(url, res.statusCode)).on('error', e => console.log(url, e.message));
});
