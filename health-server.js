const http = require('http');

const port = process.env.PORT || 3000;

console.log(`Starting minimal health server on port ${port}...`);

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Minimal health server running',
      timestamp: new Date().toISOString(),
      port: port
    }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Health server listening on 0.0.0.0:${port}`);
});

// Handle errors
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});