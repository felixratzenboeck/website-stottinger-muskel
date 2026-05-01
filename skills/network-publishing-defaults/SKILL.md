---
name: network-publishing-defaults
description: Apply Felix-specific defaults for networking, public exposure, and IP/link wording. Use when Felix asks to make a website/service public, asks for a proper IP, asks which address/link to use, asks whether security settings are correct, or asks to expose only a specific service/port to the internet.
---

# Network Publishing Defaults

Follow these defaults for Felix.

## Address selection

- Prefer the Tailscale IP `100.125.38.70` whenever Felix asks for a "richtige IP", a host address, a self-hosted URL, or the address of a Leo-hosted service.
- Do not default to `localhost`, `127.0.0.1`, LAN IPs, Docker/container IPs, or vague local addresses.
- Mention a local/LAN IP only if Felix explicitly asks for the local address.

## Meaning of "öffentlich"

- Interpret "stelle die Webseite öffentlich" as: make the service reachable from outside the local machine/network.
- When possible, prefer a clean externally reachable link/address over a raw local address.
- If the request is about Leo-hosted services, keep using the Tailscale IP unless Felix explicitly wants a broader public internet exposure path.
- If true internet publication is involved, state clearly what becomes reachable from the internet.

## Security defaults

- Recommend exposing only the single intended service/port.
- Do not suggest opening broad port ranges when one explicit port is enough.
- When reviewing firewall or exposure settings, verify that only the requested website/service is reachable.
- Call out uncertainty instead of assuming that an internet exposure is safe.

## Warning style for internet exposure

When anything is being exposed to the public internet, add a visible warning block near the top of the reply.

Use wording in this style:

> ⚠️ Internet-Freigabe: Das macht den Dienst von außen erreichbar. Felix soll hier besonders aufpassen und genau prüfen, **welcher Dienst** veröffentlicht wird, **über welchen Port**, und ob **wirklich nur dieser eine Port** offen ist.

Include, when relevant:

- what will be reachable
- from where it will be reachable
- which exact port(s) are involved
- whether the exposure is Tailscale-only or public internet

## Response style

- Be direct.
- Be explicit about the difference between Tailscale-only access and public-internet exposure.
- If a request is ambiguous, ask whether Felix wants:
  1. Tailscale-only reachability, or
  2. true public internet exposure.
