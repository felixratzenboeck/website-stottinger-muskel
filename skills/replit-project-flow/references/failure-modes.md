# Failure modes

## Cloudflare / anti-bot block

Symptoms:

- title contains `Attention Required! | Cloudflare`
- snapshot says `Sorry, you have been blocked`

Response:

- stop
- capture snapshot/screenshot evidence
- report that Replit is blocking this browser runtime

## Credential failure

Symptoms:

- explicit login error after submission
- loop back to login page with error message

Response:

- do not keep retrying blindly
- ask for corrected or fresh credentials

## Unknown blank state

Symptoms:

- blank page
- partial shell without actionable controls
- redirect loop

Response:

- inspect title, URL, console-equivalent clues if available
- refresh snapshot before deciding the account is bad

## OAuth with GitHub

If GitHub is required:

- keep one session alive for the full redirect chain
- save state only after the flow returns to Replit successfully
- if GitHub is already logged in, still verify the final Replit landing state before declaring success
