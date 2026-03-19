import https from 'https';

const testUrls = [
  'https://raw.githubusercontent.com/searge/tarot/master/images/cards/ar00.jpg',
  'https://raw.githubusercontent.com/searge/tarot/master/images/cards/peki.jpg',
  'https://raw.githubusercontent.com/mitchartemis/tarot-api/main/static/cards/ar00.jpg'
];

testUrls.forEach(url => {
  https.get(url, res => console.log(url, res.statusCode));
});
