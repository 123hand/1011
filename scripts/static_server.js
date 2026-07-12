const fs = require('fs');
const http = require('http');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const preferredPort = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml; charset=utf-8'
};

function resolveRequestPath(requestUrl) {
  const parsedUrl = new URL(requestUrl, `http://${host}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);
  if (pathname === '/') pathname = '/index.html';

  const filePath = path.resolve(distDir, `.${pathname}`);
  if (!filePath.startsWith(distDir)) return null;
  return filePath;
}

function createServer() {
  return http.createServer((req, res) => {
    const filePath = resolveRequestPath(req.url);
    if (!filePath) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
        return;
      }

      const type = contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': type,
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    });
  });
}

function listenWithFallback(port) {
  const server = createServer();

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && port < preferredPort + 20) {
      listenWithFallback(port + 1);
      return;
    }
    throw error;
  });

  server.listen(port, host, () => {
    console.log(`KYC platform preview: http://${host}:${port}`);
    console.log(`Serving: ${distDir}`);
  });
}

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('Missing dist/index.html. Run: npm run build');
  process.exit(1);
}

listenWithFallback(preferredPort);
