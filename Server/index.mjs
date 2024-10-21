// server.mjs
import { createServer } from 'node:http';

const PORT = 3000;
const LOCALHOST = '127.0.0.1';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(PORT, LOCALHOST, () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
