# Replit flow

## Inspect first

Always start with:

```bash
agent-browser get title
agent-browser get url
agent-browser snapshot -i
```

## Classify the page

### Authenticated workspace

Look for:

- dashboard/home shell
- avatar or account menu
- create/new project affordance

Then proceed to project creation.

### Login screen

Look for:

- `Log in`
- `Continue with GitHub`
- email/password fields

Then authenticate using the requested path.

### Empty/unusable state

Look for:

- signup-only flows
- explicit account-not-found or credential rejection
- loops that never reach workspace after a valid attempt

Only here ask for a fresh account.

### Blocked

Look for:

- `Attention Required! | Cloudflare`
- `Sorry, you have been blocked`
- CAPTCHA or anti-bot interstitials

Stop and report the block.

## Project creation validation

Do not stop at the click.

Confirm with at least two of:

- project/editor URL
- visible editor shell or files pane
- page title reflects the new project
- final snapshot shows the created workspace
