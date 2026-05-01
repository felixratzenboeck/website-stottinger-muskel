#!/usr/bin/env node
import http from 'node:http';
import net from 'node:net';
import { URL } from 'node:url';

const LISTEN_PORT = Number(process.env.AGENT_BROWSER_TAILNET_PORT || 4849);
const DASHBOARD_PORT = Number(process.env.AGENT_BROWSER_DASHBOARD_PORT || 4848);
const DASHBOARD_HOST = process.env.AGENT_BROWSER_DASHBOARD_HOST || '127.0.0.1';

function rewriteBody(body) {
  return body
    .replaceAll('http://localhost:4848/api/exec', '/api/exec')
    .replaceAll('http://localhost:4848/api/kill', '/api/kill')
    .replaceAll('window.location.origin.includes(":4848")?"/api/sessions":"http://localhost:4848/api/sessions"', '"/api/sessions"')
    .replaceAll('fetch(`http://localhost:${e.port}/api/tabs`)', 'fetch(`/_ab/http/${e.port}/api/tabs`)')
    .replaceAll('WebSocket(`ws://localhost:${e}`)', "WebSocket((window.location.protocol==='https:'?'wss':'ws')+'://'+window.location.host+'/_ab/ws/'+e)")
    .replaceAll('"ws://localhost:"', 'window.location.origin+"/_ab/ws/"');
}

function forwardHttp(req, res, port, path) {
  const headers = { ...req.headers, host: `127.0.0.1:${port}` };
  delete headers['accept-encoding'];
  const upstream = http.request({
    host: '127.0.0.1',
    port,
    method: req.method,
    path,
    headers,
  }, (upRes) => {
    const chunks = [];
    upRes.on('data', (c) => chunks.push(c));
    upRes.on('end', () => {
      let body = Buffer.concat(chunks);
      const contentType = String(upRes.headers['content-type'] || '');
      const isText = /javascript|json|text|html|xml/.test(contentType) || path.endsWith('.js');
      const responseHeaders = { ...upRes.headers };
      delete responseHeaders['content-length'];
      delete responseHeaders['content-encoding'];
      delete responseHeaders['transfer-encoding'];
      if (isText) {
        body = Buffer.from(rewriteBody(body.toString('utf8')));
      }
      res.writeHead(upRes.statusCode || 502, responseHeaders);
      res.end(body);
    });
  });
  upstream.on('error', (err) => {
    res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
    res.end(`proxy error: ${err.message}\n`);
  });
  req.pipe(upstream);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const m = url.pathname.match(/^\/_ab\/http\/(\d+)(\/.*)?$/);
  if (m) {
    const [, port, rest] = m;
    const path = `${rest || '/'}${url.search}`;
    return forwardHttp(req, res, Number(port), path);
  }
  return forwardHttp(req, res, DASHBOARD_PORT, `${url.pathname}${url.search}`);
});

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const m = url.pathname.match(/^\/_ab\/ws\/(\d+)$/);
  if (!m) {
    socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
    socket.destroy();
    return;
  }
  const port = Number(m[1]);
  const upstream = net.connect(port, '127.0.0.1', () => {
    const headers = Object.entries({ ...req.headers, host: `127.0.0.1:${port}` })
      .map(([k, v]) => `${k}: ${v}`)
      .join('\r\n');
    upstream.write(`${req.method} ${url.pathname}${url.search} HTTP/${req.httpVersion}\r\n${headers}\r\n\r\n`);
    if (head?.length) upstream.write(head);
    socket.pipe(upstream).pipe(socket);
  });
  upstream.on('error', () => socket.destroy());
  socket.on('error', () => upstream.destroy());
});

server.listen(LISTEN_PORT, '127.0.0.1', () => {
  console.log(`agent-browser tailnet proxy listening on http://127.0.0.1:${LISTEN_PORT}`);
});
