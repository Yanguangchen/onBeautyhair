const fs = require('fs');
const http = require('http');
const path = require('path');
const { URL } = require('url');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 8080);
const clients = new Set();

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp'
};

const reloadScript = `
<script>
  (() => {
    const source = new EventSource('/__reload');
    source.addEventListener('reload', () => location.reload());
  })();
</script>`;

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function resolveFile(urlPath) {
  const decodedPath = decodeURIComponent(urlPath);
  const requested = decodedPath === '/' ? '/index.html' : decodedPath;
  const filePath = path.normalize(path.join(root, requested));

  if (!filePath.startsWith(root)) return null;
  return filePath;
}

function serveFile(req, res, filePath) {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      send(res, 404, 'Not found');
      return;
    }

    fs.readFile(filePath, (readError, content) => {
      if (readError) {
        send(res, 500, 'Could not read file');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const type = mimeTypes[ext] || 'application/octet-stream';

      if (ext === '.html') {
        const html = content.toString('utf8');
        const body = html.includes('</body>')
          ? html.replace('</body>', `${reloadScript}</body>`)
          : `${html}${reloadScript}`;
        send(res, 200, body, type);
        return;
      }

      res.writeHead(200, {
        'Content-Type': type,
        'Cache-Control': 'no-store'
      });
      res.end(content);
    });
  });
}

function handleReloadStream(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-store',
    Connection: 'keep-alive'
  });
  res.write('\n');
  clients.add(res);
  req.on('close', () => clients.delete(res));
}

function notifyReload() {
  for (const client of clients) {
    client.write('event: reload\ndata: now\n\n');
  }
}

function watchFiles() {
  let timeout;
  fs.watch(root, { recursive: true }, (eventType, filename) => {
    if (!filename || filename.includes('node_modules') || filename.includes('.git')) return;

    const ext = path.extname(filename).toLowerCase();
    if (!['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) return;

    clearTimeout(timeout);
    timeout = setTimeout(notifyReload, 120);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/__reload') {
    handleReloadStream(req, res);
    return;
  }

  const filePath = resolveFile(url.pathname);
  if (!filePath) {
    send(res, 403, 'Forbidden');
    return;
  }

  serveFile(req, res, filePath);
});

server.listen(port, () => {
  watchFiles();
  console.log(`Live server running at http://localhost:${port}`);
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Try: PORT=8081 npm run dev`);
    process.exit(1);
  }

  throw error;
});
