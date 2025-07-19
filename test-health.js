const http = require('http');

const port = process.env.PORT || 8080;
const host = 'localhost';

console.log(`Testing health endpoint at http://${host}:${port}/api/health`);

const options = {
  hostname: host,
  port: port,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();

// Also try without /api prefix
setTimeout(() => {
  console.log(`\nTesting without prefix at http://${host}:${port}/health`);
  const req2 = http.request({...options, path: '/health'}, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
  });
  req2.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });
  req2.end();
}, 1000);