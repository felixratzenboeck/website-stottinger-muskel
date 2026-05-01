# Replit selectors and checks

Use semantic queries first. Prefer snapshot refs over brittle CSS selectors.

## Minimum checks before action

```bash
agent-browser get title
agent-browser get url
agent-browser snapshot -i
```

## Good targets to look for

### Login state

- buttons/links containing `Log in`, `Sign up`, `Continue with GitHub`
- email/password fields
- onboarding prompts

### Authenticated workspace

- `Create`, `New repl`, `New project`
- account avatar / user menu
- workspace sidebar / editor shell

### Success signals after project creation

- URL changed into a project/editor route
- editor shell or files pane is visible
- project title field appears

## Command style

Prefer patterns like:

```bash
agent-browser snapshot -i
agent-browser find role button click --name "Log in"
agent-browser find label "Email" fill "user@example.com"
agent-browser find label "Password" fill "secret"
agent-browser find role button click --name "Log in"
```

If semantic locators fail, use a fresh `snapshot -i` and act on refs from that snapshot.
