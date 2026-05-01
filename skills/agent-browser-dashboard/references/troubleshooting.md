# Troubleshooting

## Verify installation

```bash
agent-browser --version
agent-browser dashboard install
agent-browser install
```

## Verify dashboard

```bash
agent-browser dashboard start
```

Expected URL:

- `http://127.0.0.1:4848`

## Basic smoke test

```bash
agent-browser open https://example.com
agent-browser get title
agent-browser snapshot -i
agent-browser screenshot smoke.png
```

## Common failures

### Missing Linux libraries

Symptom:

- Chrome exits early with shared-library errors.

Fix:

```bash
agent-browser install --with-deps
```

### Bot protection or Cloudflare block

Symptom:

- Page title mentions `Attention Required! | Cloudflare`
- Snapshot shows `Sorry, you have been blocked`

Handling:

- Save evidence with `snapshot` and `screenshot`.
- Tell the user the browser runtime is blocked by the site.
- Switch to a headed/user browser path if available.

### Dashboard starts but no sessions appear

- Open a page with `agent-browser open <url>` after the dashboard is running.
- Confirm streaming was not disabled.
- Retry with a fresh session if the current one is stale.
