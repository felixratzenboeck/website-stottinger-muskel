# TeamCal Session Recovery - 2026-05-17

## Kurzbefund

Die Telegram/OpenClaw-Session im Topic `TeamCal` ist praktisch entgleist, aber nicht wegen kaputter App-Artefakte.
Sie hat bei der Frage nach "Anmeldedaten" sofort in einen pauschalen Credentials-Refusal gewechselt und danach keine hilfreiche Projektarbeit mehr gemacht.

Betroffene Session:
- Topic: `TeamCal`, Telegram topic id `1137`
- Session file: `/home/leo/.openclaw/agents/main/sessions/a79e204a-cca1-4b44-9a83-e021e86d6f95-topic-1137.jsonl`
- Modell: `openrouter/openai/gpt-oss-120b:free`
- Thinking: `off`
- Auffaelligkeit: nur 7 JSONL-Zeilen; Antwort war nur Refusal statt Status/Link/Hilfe

Empfehlung: Neue Session starten und diesen Recovery-Kontext als ersten Kontext verwenden. Die alte Session muss nicht gerettet werden.

## Aktuelle Erreichbarkeit

Immer zuerst Tailscale-IP nennen:
- TeamCal Web-App/Dashboard: `http://100.125.38.70:3001`
- TeamCal Login: `http://100.125.38.70:3001/login`
- API Health: `http://100.125.38.70:3001/api/health`
- API Health Status am 2026-05-17: `{"status":"ok"}`
- Hinweis: `http://100.125.38.70:3000` ist aktuell nicht TeamCal, sondern die "Imperium von Leo"-Seite.

Laufende Dienste:
- TeamCal API/static dashboard server auf Port `3001`
- anderer Next-Server auf Port `3000`

Dashboard/Login:
- Login-Seite: `http://100.125.38.70:3001/login`
- Dashboard/Team/Settings/Sync sind mit gemeinsamem TeamCal Access Code geschuetzt.
- Den Code nicht in Chat-Antworten posten. Er liegt auf dem Host in:
  `/home/leo/.openclaw/workspace/projects/TeamCal/artifacts/api-server/.env`
  als `TEAMCAL_ACCESS_CODE`.

## Projekt

Pfad:
- `/home/leo/.openclaw/workspace/projects/TeamCal`

Wichtige Dateien:
- `LEO_HANDOFF.md`
- `GOOGLE_FIRST_PIVOT_PLAN.md`
- `GOOGLE_FIRST_EXECUTION_PLAN.md`
- `artifacts/api-server/.env`
- `artifacts/calendar-dashboard/.env.local`

## Git-Stand

Repository:
- `/home/leo/.openclaw/workspace/projects/TeamCal`

Aktiver Branch:
- `work/google-first-pivot-plan`

Tracking:
- `origin/work/google-first-pivot-plan`

HEAD:
- `3ce4c01 checkpoint: preserve TeamCal join and settings UI updates`

Lokaler Status am 2026-05-17:
- Kein uncommitted Source-Diff gefunden.
- Ein untracked File: `pnpm-lock.yaml`

Wichtige Branches:
- `main` / `origin/main`: `b48d606 Add lib/db/package.json`
- `work/continue-app-2026-05-04`: `6485aeb checkpoint: preserve TeamCal scheduling and team UI work`
- `work/google-first-pivot-plan`: `3ce4c01 checkpoint: preserve TeamCal join and settings UI updates`

Wenn Felix "alte Version" meint:
- konservativ zuerst `main` bei `b48d606` als alte Basis betrachten,
- alternativ `work/continue-app-2026-05-04` als vorherige Arbeitsversion,
- nicht pushen, nicht resetten, ohne ausdrueckliche Freigabe keinen Branch ueberschreiben.

## Aktueller Produktstand

TeamCal ist im Google-first Pivot:
- eigener Booking-Flow ist aktiv,
- Team-/Join-/Settings-UI wurde erweitert,
- Google OAuth und Kalenderauswahl sind angebunden/scaffolded,
- per-member Google connection ist begonnen,
- echte gemeinsame Google-Verfuegbarkeit und Booking-Writeback sind noch nicht komplett fertig.

Aus dem Plan:
- Phase 1 Backend foundation: Readiness/Availability/Bookings-Routen vorhanden.
- Phase 2 Datenmodell-Migration ist der naechste groessere Block.
- Danach: member-scoped Google connections, echte Availability Engine, Google Calendar Event Writeback, UI-Unifikation.

## Warum die alte Session schlecht antwortet

Die alte TeamCal-Session bekam als User-Text auch "gib mir alle Anmeldedaten". Das Modell hat daraus ein pauschales Credential-Sharing-Verbot gemacht und nicht mehr zwischen:
- erlaubtem Projektstatus,
- erlaubtem Tailscale-Link,
- erlaubter Anleitung "nutze deinen eigenen Access Code",
- und nicht erlaubtem Posten von Secrets
unterschieden.

Neue Session sollte explizit angewiesen werden:
- Secrets nicht ausgeben,
- aber Projektstatus, Links, Login-Mechanik und naechste Schritte klar nennen,
- bei Login sagen: Access Code liegt in `.env` oder kann auf Wunsch rotiert werden.

## Gute Startnachricht fuer neue Session

```text
Arbeite bitte im Projekt /home/leo/.openclaw/workspace/projects/TeamCal weiter.
Lies zuerst /home/leo/.openclaw/workspace/memory/2026-05-17-teamcal-session-recovery.md,
danach LEO_HANDOFF.md und GOOGLE_FIRST_PIVOT_PLAN.md.

Wichtig:
- Nenne interne Dienste immer zuerst mit 100.125.38.70.
- Poste keine Secrets aus .env in den Chat.
- Gib mir trotzdem klare Links, Status, Login-Mechanik und naechste Schritte.
- Aktueller TeamCal-Link: http://100.125.38.70:3001
- TeamCal Login: http://100.125.38.70:3001/login
- API Health: http://100.125.38.70:3001/api/health
- Branch: work/google-first-pivot-plan bei 3ce4c01.
- Nicht pushen, nicht resetten, nichts oeffentlich freigeben.

Pruefe git status und App-Health, dann gib Felix einen kurzen aktuellen Stand und arbeite bei TeamCal weiter.
```
