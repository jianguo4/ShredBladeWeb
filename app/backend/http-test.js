const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
});

server.listen(3001, '127.0.0.1', () => {
  console.log('[HTTP] Server listening on port 3001');
});
