# TV Discovery & Recovery

## Discovery

- Modell: `55OLED903/12`
- Philips JointSpace API: Port `1926`
- Letzte bekannte IP: `192.168.0.131`
- Letzte bekannte MAC: `c4:98:5c:ad:6d:81`
- Primäres Tool: `/home/leo/.openclaw/workspace/tools/philips_tv_control.py`

## Schnellchecks

```bash
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py status
ip neigh show 192.168.0.131
ping -c 2 192.168.0.131
```

## Typische Fehlerbilder

- `No route to host` trotz gleichem `/24` LAN:
  - meistens TV-Netzwerk schläft / ARP-Auflösung scheitert / TV kurz offline
  - eher kein echtes Linux-Routing-Problem
- `reachable=false`:
  - TV antwortet gerade nicht auf TCP 1926
- Auth-Fehler:
  - Pairing/Config stimmt nicht mehr

## Recovery-Reihenfolge

1. `status` prüfen
2. `ip neigh show 192.168.0.131` prüfen
3. Wenn TV weg ist: Standby-/WLAN-/Strom-Hänger vermuten
4. Wenn TV unter anderer IP auftaucht: `philips_tv_config.json` updaten
5. Wenn Reset/Auth kaputt: neu pairen und Credentials aktualisieren

## Prävention

- TV wenn möglich per Ethernet anbinden
- TV-Netzwerk-Standby / Quick Start aktivieren
- DHCP-Reservierung im Router setzen:
  - `192.168.0.131` -> `c4:98:5c:ad:6d:81`
