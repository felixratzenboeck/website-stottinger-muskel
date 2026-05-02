#!/usr/bin/env python3
import json
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse

BASE = Path('/home/leo/.openclaw/workspace/tools')
CFG = json.loads((BASE / 'tv_shortcuts_config.json').read_text())
TV_TOOL = str(BASE / 'philips_tv_control.py')
HOST = CFG['host']
PORT = int(CFG['port'])
TOKEN = CFG['token']

HTML = '''<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Leo TV</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 20px; background: #0b0b0f; color: #fff; }
    .wrap { max-width: 560px; margin: 0 auto; }
    .card { background: #171821; border-radius: 18px; padding: 18px; margin-bottom: 16px; }
    button, input[type=number], input[type=range] { width: 100%; font-size: 18px; }
    button { padding: 14px 16px; border: 0; border-radius: 14px; margin: 8px 0; background: #2d6cdf; color: white; }
    button.off { background: #444; }
    .row { display: grid; grid-template-columns: 1fr 100px; gap: 12px; align-items: center; }
    .muted { color: #b6b8c5; font-size: 14px; }
    pre { white-space: pre-wrap; word-wrap: break-word; background: #0f1117; padding: 12px; border-radius: 12px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h2>Leo TV</h2>
      <div class="muted">Tailscale-only shortcut page</div>
      <button onclick="go('/api/power/on')">Fernseher an</button>
      <button class="off" onclick="go('/api/power/off')">Fernseher aus</button>
    </div>
    <div class="card">
      <h3>Kontrast</h3>
      <div class="row">
        <input id="contrastRange" type="range" min="0" max="100" value="50" oninput="contrastValue.value=this.value">
        <input id="contrastValue" type="number" min="0" max="100" value="50" oninput="contrastRange.value=this.value">
      </div>
      <button onclick="setValue('contrast')">Normalen Kontrast setzen</button>
    </div>
    <div class="card">
      <h3>Videokontrast</h3>
      <div class="row">
        <input id="videoRange" type="range" min="0" max="100" value="50" oninput="videoValue.value=this.value">
        <input id="videoValue" type="number" min="0" max="100" value="50" oninput="videoRange.value=this.value">
      </div>
      <button onclick="setValue('video_contrast')">Videokontrast setzen</button>
    </div>
    <div class="card">
      <button onclick="go('/api/status')">Status prüfen</button>
      <pre id="out">Bereit.</pre>
    </div>
  </div>
<script>
const token = new URLSearchParams(location.search).get('token') || '';
async function go(path) {
  const url = path + '?token=' + encodeURIComponent(token);
  const res = await fetch(url);
  const text = await res.text();
  document.getElementById('out').textContent = text;
}
async function setValue(name) {
  const value = name === 'contrast' ? document.getElementById('contrastValue').value : document.getElementById('videoValue').value;
  const url = '/api/set?' + new URLSearchParams({token, name, value}).toString();
  const res = await fetch(url);
  const text = await res.text();
  document.getElementById('out').textContent = text;
}
</script>
</body>
</html>
'''


def run_tv_command(args):
    proc = subprocess.run([
        'python3', TV_TOOL, *args
    ], capture_output=True, text=True, timeout=30)
    stdout = (proc.stdout or '').strip()
    if proc.returncode != 0:
        raise RuntimeError(stdout or proc.stderr.strip() or f'Command failed: {proc.returncode}')
    return stdout


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body, content_type='application/json; charset=utf-8'):
        data = body.encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _auth_ok(self, qs):
        return qs.get('token', [''])[0] == TOKEN

    def log_message(self, fmt, *args):
        return

    def do_GET(self):
        parsed = urlparse(self.path)
        qs = parse_qs(parsed.query)

        if parsed.path == '/health':
            return self._send(200, json.dumps({'ok': True, 'service': 'leo-tv-shortcuts'}))

        if parsed.path == '/':
            if not self._auth_ok(qs):
                return self._send(403, 'forbidden', 'text/plain; charset=utf-8')
            return self._send(200, HTML, 'text/html; charset=utf-8')

        if not self._auth_ok(qs):
            return self._send(403, json.dumps({'ok': False, 'error': 'forbidden'}))

        try:
            if parsed.path == '/api/status':
                out = run_tv_command(['status'])
            elif parsed.path == '/api/power/on':
                out = run_tv_command(['power', 'an'])
            elif parsed.path == '/api/power/off':
                out = run_tv_command(['power', 'aus'])
            elif parsed.path == '/api/set':
                name = qs.get('name', [''])[0]
                value = qs.get('value', [''])[0]
                if name not in {'contrast', 'video_contrast'}:
                    raise RuntimeError('invalid name')
                out = run_tv_command(['set', name, value])
            else:
                return self._send(404, json.dumps({'ok': False, 'error': 'not_found'}))
            return self._send(200, out, 'application/json; charset=utf-8')
        except Exception as e:
            return self._send(500, json.dumps({'ok': False, 'error': str(e)}))


def main():
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f'Listening on http://{HOST}:{PORT}', flush=True)
    server.serve_forever()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(0)
