# Blockers

## Cloudflare / anti-bot

Symptoms:

- title: `Attention Required! | Cloudflare`
- snapshot: `Sorry, you have been blocked`

Response:

1. Stop retries.
2. Capture title, URL, and snapshot.
3. Tell the user the browser runtime is being blocked.
4. Do not claim login or project creation succeeded.

## CAPTCHA

If a manual challenge appears, stop at that point and ask the user to solve or provide an alternate path.

## Broken/blank page

If the page is blank or half-rendered:

1. check `title`
2. check `url`
3. refresh snapshot
4. only then decide whether the account is bad

## Bad credentials

If credentials are explicitly rejected, do not brute force. Ask for corrected or fresh credentials.
