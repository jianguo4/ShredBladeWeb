const express = require('express');
const app = express();
const PORT = 3001;

console.log('[TEST] Starting simple test server...');

app.get('/health', (req, res) => {
  console.log('[TEST] /health route called');
  res.json({ status: 'ok' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`[TEST] Server listening on port ${PORT}`);
});
