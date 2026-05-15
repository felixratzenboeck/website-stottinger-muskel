# Google App Passwort Runbook

## Ziel
Automatisierter, sicherer Ablauf zum Erzeugen eines Google‑App‑Passworts für die Nutzung in OpenClaw‑Workflows, ohne dass geheime Daten über den Gruppen‑Chat geleakt werden.

## Voraussetzungen
- **Leo‑Browser** (isolierter Managed‑Browser) ist bereits konfiguriert (siehe `separate‑browser‑ops` Skill).
- Auf dem **Mac‑Node** ist Chrome/Brave mit Remote‑Debugging verfügbar (nur wenn explizit angefordert).
- Der Nutzer hat bereits **2‑Step‑Verification** in seinem Google‑Account aktiviert.
- Das Google‑Konto ist im Leo‑Browser eingeloggt (falls nicht, bitte zuerst Login‑Workflow ausführen).

## Ablauf
1. **Browser‑Session starten**
   - Starte den isolierten Leo‑Browser über das `separate-browser-ops` Skill.
   - Öffne `https://myaccount.google.com/security`.
2. **Zum Abschnitt "App‑Passwörter" navigieren**
   - Klicke auf **App‑Passwörter**
3. **Neues App‑Passwort erstellen**
   - Auf **App‑Passwort erstellen** klicken.
   - Gerät/Anwendung auswählen oder benutzerdefinierten Namen eingeben, z. B. `OpenClaw`.
   - Auf **Generieren** klicken – das 16‑stellige Passwort wird angezeigt.
   - Das Passwort sofort in die Zwischenablage kopieren (Browser‑API) und sicher in OpenClaw‑Secret‑Store hinterlegen.
4. **Secret‑Store aktualisieren**
   - Auf dem Host `sudo openclaw secret set google_app_password <PASSWORT>` ausführen (oder entsprechendes CLI‑Tool nutzen).
   - Bestätigen, dass das Secret erfolgreich gesetzt wurde.
5. **Cleanup**
   - Browser‑Tab schließen. Der isolierte Leo‑Browser wird beim nächsten Aufruf automatisch neu gestartet, sodass das Passwort nicht im Verlauf bleibt.

## Sicherheitshinweise
- Das App‑Passwort wird **nicht** im Gruppen‑Chat gepostet.
- Nur das isolate‑Browser‑Fenster hat Zugriff auf das Passwort; nach Abschluss wird das Fenster geschlossen.
- Der Secret‑Store ist lokal und nur dem Nutzer `leo` zugänglich.
- Bei Fehlermeldungen (z. B. 2‑Step‑Verification nicht aktiviert) bitte zuerst die 2‑FA einrichten und den Vorgang erneut starten.

## Optional: Automatisierung via Gemini
- Für komplett automatisierte Durchläufe kann das `gemini`‑Tool verwendet werden, um die Schritte zu orchestrieren, jedoch **nur** wenn das Risiko akzeptiert ist und ein menschlicher Review erfolgt ist.
