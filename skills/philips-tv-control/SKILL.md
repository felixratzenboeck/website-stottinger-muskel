---
name: philips-tv-control
description: Steuere Felix’ gekoppelten Philips Android TV (55OLED903/12) per lokaler API über Kurzbefehle, Synonyme und feste Alias-Mappings für Power, Apps, Sender, Kontrast und Ambilight. Verwende das bei Anfragen rund um TV an/aus, YouTube/DAZN/Netflix/Spotify, ORF-Sender, Kontrast, Videokontrast und Ambilight-Modi/Farben.
---

# Philips TV Control

Nutze diesen Skill, wenn Felix den Philips-Fernseher steuern oder TV-Einstellungen umstellen will.

## Lokale Steuerung

Primäres Tool:

- `/home/leo/.openclaw/workspace/tools/philips_tv_control.py`

Konfiguration:

- `/home/leo/.openclaw/workspace/tools/philips_tv_config.json`

Der TV ist bereits gekoppelt. Bevorzuge das lokale Python-Tool statt roher API-Requests.

## Unterstützte Bereiche

- Power: TV/Fernseher an, aus
- Apps: YouTube, DAZN / The Zone, Netflix, Spotify
- TV/Sender: TV-Modus, ORF1, ORF2, ORF3, ORF Sport+, Kanalnummern
- Bild: Kontrast, Videokontrast
- Ambilight:
  - an/aus
  - Video folgen
  - Audio folgen
  - Farbe folgen
  - Farbsynonyme wie rot/orange/blau/grün/warmweiß/neutralweiß

## Bevorzugtes Vorgehen

1. Wenn Felix eine direkte TV-Aktion will, rufe das lokale Tool auf.
2. Nutze natürliche Sprache oder Subcommands.
3. Melde kurz das Ergebnis zurück.
4. Wenn eine neue gewünschte TV-Einstellung noch nicht gemappt ist, prüfe zuerst den Philips-Menübaum/API statt blind Fernbedienungs-Klickfolgen zu raten.

## Beispielaufrufe

Status:

```bash
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py status
```

Natürliche Sprache:

```bash
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py "Fernseher aus"
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py "Öffne YouTube"
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py "Schalte auf ORF1"
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py "Ambilight blau"
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py "Video folgen"
```

Direkte Subcommands:

```bash
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py power aus
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py power an
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py app youtube
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py tv orf1
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py set contrast 0
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py set video_contrast 100
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py ambilight off
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py ambilight video natural
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py ambilight audio rhythm
python3 /home/leo/.openclaw/workspace/tools/philips_tv_control.py ambilight color "deep water"
```

## Ambilight-Mapping

### Video folgen

- Standard
- Natural
- Immersive
- Vivid
- Game
- Comfort
- Relax

Default für „Video folgen“ / „dem Bild angepasst“: `Natural`

### Audio folgen

- Lumina
- Colora
- Retro
- Spectrum
- Scanner
- Rhythm
- Party

Default für „Audio folgen“: `Rhythm`

### Farbe folgen

- Hot Lava ← rot / orange / rot-orange
- Deep Water ← blau / dunkelblau / tiefsee
- Fresh Nature ← grün / natur
- Warm White ← warmweiß / wärmeres weiß
- Cool White ← neutralweiß / kälteres weiß

## Wenn etwas kaputt geht

- Prüfe erst `status`.
- Wenn der TV nicht reagiert, kann IP oder Kopplung veraltet sein.
- Bei geänderter TV-IP oder Reset muss ggf. neu gekoppelt und `philips_tv_config.json` aktualisiert werden.
- Erst wenn das lokale Tool nicht reicht, wieder direkt gegen die Philips-API debuggen.
