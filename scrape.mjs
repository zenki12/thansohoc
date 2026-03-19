import fs from 'fs';
import https from 'https';

const options = {
  hostname: 'jobsgo.vn',
  port: 443,
  path: '/blog/y-nghia-78-la-bai-tarot/',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive'
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('jobsgo.html', body);
    console.log('Saved to jobsgo.html');
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
