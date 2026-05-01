#!/usr/bin/env python3
import json
import re
import sys
import unicodedata
from pathlib import Path

import requests
from requests.auth import HTTPDigestAuth
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
CFG = json.loads(Path('/home/leo/.openclaw/workspace/tools/philips_tv_config.json').read_text())
BASE = f"https://{CFG['host']}:1926/{CFG['api']}"
AUTH = HTTPDigestAuth(CFG['user'], CFG['pass'])

APP_ALIASES = {
    'youtube': ['youtube'],
    'dazn': ['dazn', 'the zone', 'zone'],
    'netflix': ['netflix'],
    'spotify': ['spotify'],
}
AMBILIGHT_VIDEO = {
    'standard': {'enum': 1, 'aliases': ['standard']},
    'natural': {'enum': 2, 'aliases': ['natural', 'natuerlich', 'natürlich', 'bild angepasst', 'dem bild angepasst', 'video folgen']},
    'immersive': {'enum': 3, 'aliases': ['immersive', 'immersiv', 'fussball', 'fußball']},
    'vivid': {'enum': 4, 'aliases': ['vivid', 'lebhaft']},
    'game': {'enum': 5, 'aliases': ['game', 'spiel', 'gaming']},
    'comfort': {'enum': 6, 'aliases': ['comfort', 'komfort']},
    'relax': {'enum': 7, 'aliases': ['relax', 'entspannt', 'ruhig']},
}
AMBILIGHT_AUDIO = {
    'lumina': {'enum': 101, 'aliases': ['lumina']},
    'colora': {'enum': 102, 'aliases': ['colora']},
    'retro': {'enum': 103, 'aliases': ['retro']},
    'spectrum': {'enum': 104, 'aliases': ['spectrum', 'spektrum']},
    'scanner': {'enum': 106, 'aliases': ['scanner', 'knight rider', 'ritterreiter']},
    'rhythm': {'enum': 107, 'aliases': ['rhythm', 'musik', 'audio folgen']},
    'party': {'enum': 110, 'aliases': ['party']},
}
AMBILIGHT_COLOR = {
    'hot lava': {'enum': 201, 'aliases': ['hot lava', 'heisse lava', 'heiße lava', 'rot', 'orange', 'rot orange', 'rotorange']},
    'deep water': {'enum': 202, 'aliases': ['deep water', 'tiefsee', 'blau', 'dunkelblau']},
    'fresh nature': {'enum': 203, 'aliases': ['fresh nature', 'natur', 'gruen', 'grün', 'gruenes', 'grünes']},
    'warm white': {'enum': 207, 'aliases': ['warm white', 'warmweiss', 'warmweiß', 'warmes weiss', 'warmes weiß', 'waermeres weiss', 'wärmeres weiß']},
    'cool white': {'enum': 204, 'aliases': ['cool white', 'neutralweiss', 'neutralweiß', 'kuehles weiss', 'kühles weiß', 'kaelteres weiss', 'kälteres weiß', 'weiss', 'weiß']},
}
CHANNEL_ALIASES = {
    'orf1': ['orf1', 'orf 1', 'orf eins'],
    'orf2': ['orf2', 'orf 2', 'orf zwei'],
    'orf3': ['orf3', 'orf 3', 'orf iii'],
    'orf sport': ['orf sport', 'orf sport+', 'orf sport plus'],
}


def norm(text: str) -> str:
    text = text.lower().strip()
    text = text.replace('%', ' prozent ')
    text = unicodedata.normalize('NFKD', text)
    text = ''.join(ch for ch in text if not unicodedata.combining(ch))
    text = re.sub(r'[^a-z0-9+ ]+', ' ', text)
    return re.sub(r'\s+', ' ', text).strip()


def get(path, timeout=15):
    r = requests.get(BASE + path, auth=AUTH, verify=False, timeout=timeout)
    r.raise_for_status()
    return r.json()


def post(path, payload, timeout=15):
    r = requests.post(BASE + path, json=payload, auth=AUTH, verify=False, timeout=timeout)
    r.raise_for_status()
    if r.text.strip():
        return r.json()
    return None


def get_values(names):
    payload = {'nodes': [{'nodeid': CFG['nodes'][n]} for n in names]}
    data = post('/menuitems/settings/current', payload)
    out = {}
    for item in data.get('values', []):
        node = item['value']['Nodeid']
        name = next(k for k, v in CFG['nodes'].items() if v == node)
        out[name] = item['value']['data']['value']
    return out


def set_value(name, value):
    value = int(value)
    if not 0 <= value <= 100:
        raise SystemExit('value must be between 0 and 100')
    payload = {
        'values': [
            {
                'value': {
                    'Nodeid': CFG['nodes'][name],
                    'Controllable': True,
                    'Available': True,
                    'data': {'value': value},
                }
            }
        ]
    }
    post('/menuitems/settings/update', payload)
    return get_values([name])[name]


def power_status():
    return get('/powerstate').get('powerstate', 'unknown')


def ambilight_status():
    cfg = get('/ambilight/currentconfiguration')
    cfg['power'] = get('/ambilight/power').get('power', 'unknown')
    return cfg


def power_off():
    post('/powerstate', {'powerstate': 'Off'})
    return power_status()


def power_on():
    state = power_status()
    if state != 'On':
        post('/input/key', {'key': 'Standby'})
    return power_status()


def fetch_apps():
    return get('/applications').get('applications', [])


def resolve_app(query):
    q = norm(query)
    apps = fetch_apps()
    wanted = None
    for canonical, aliases in APP_ALIASES.items():
        if q == canonical or q in aliases or any(alias in q for alias in aliases):
            wanted = canonical
            break
    if not wanted:
        wanted = q
    for app in apps:
        label = norm(app.get('label', ''))
        raw = norm(json.dumps(app, ensure_ascii=False))
        if wanted == label or wanted in label or wanted in raw:
            return app
    raise SystemExit(f'app not found: {query}')


def resolve_mode(query, mapping):
    q = norm(query)
    for key, meta in mapping.items():
        aliases = [norm(a) for a in meta['aliases']] + [norm(key)]
        if q in aliases or any(alias in q for alias in aliases):
            return key, meta['enum']
    raise SystemExit(f'mode not found: {query}')


def set_menu_enum(node_name, enum_id):
    payload = {
        'values': [
            {
                'value': {
                    'Nodeid': CFG['nodes'][node_name],
                    'Controllable': True,
                    'Available': True,
                    'data': {'selected_item': enum_id},
                }
            }
        ]
    }
    post('/menuitems/settings/update', payload)


def ambilight_power(on: bool):
    post('/ambilight/power', {'power': 'On' if on else 'Off'})
    return get('/ambilight/power').get('power')


def set_ambilight_video(mode_query='natural'):
    _, enum_id = resolve_mode(mode_query, AMBILIGHT_VIDEO)
    set_menu_enum('ambilight_follow_video', enum_id)
    return ambilight_status()


def set_ambilight_audio(mode_query='rhythm'):
    _, enum_id = resolve_mode(mode_query, AMBILIGHT_AUDIO)
    set_menu_enum('ambilight_follow_audio', enum_id)
    return ambilight_status()


def set_ambilight_color(mode_query='deep water'):
    _, enum_id = resolve_mode(mode_query, AMBILIGHT_COLOR)
    set_menu_enum('ambilight_follow_color', enum_id)
    return ambilight_status()


def launch_app(query):
    app = resolve_app(query)
    post('/activities/launch', app)
    return app.get('label')


def fetch_channel_list():
    return get('/channeldb/tv/channelLists/all')


def fetch_channels():
    return fetch_channel_list().get('Channel', [])


def resolve_channel(query):
    q = norm(query)
    channels = fetch_channels()
    if q.isdigit():
        for ch in channels:
            if str(ch.get('preset')) == q:
                return ch
    alias_target = None
    for canonical, aliases in CHANNEL_ALIASES.items():
        if q == canonical or q in aliases or any(alias in q for alias in aliases):
            alias_target = canonical
            break
    for ch in channels:
        name = norm(ch.get('name', ''))
        preset = str(ch.get('preset', ''))
        if alias_target and alias_target.replace(' ', '') in name.replace(' ', ''):
            return ch
        if q == name or q == preset or q in name:
            return ch
    raise SystemExit(f'channel not found: {query}')


def watch_tv(channel_query=None):
    if channel_query:
        ch = resolve_channel(channel_query)
        channel_list = fetch_channel_list()
        payload = {
            'channel': {'ccid': ch['ccid'], 'preset': ch['preset'], 'name': ch['name']},
            'channelList': {'id': channel_list['id'], 'version': str(channel_list['version'])}
        }
        post('/activities/tv', payload)
        return ch['name']
    post('/input/key', {'key': 'WatchTV'})
    return 'TV'


def status():
    vals = get_values(['contrast', 'video_contrast'])
    vals['power'] = power_status()
    vals['ambilight'] = ambilight_status()
    return vals


def handle_natural(text):
    q = norm(text)
    if any(word in q for word in ['status', 'wie ist', 'aktuell']):
        return status()
    if 'ambilight' in q and any(x in q for x in [' aus', ' ausschalten', ' off']):
        return {'ambilight_power': ambilight_power(False)}
    if 'ambilight' in q and any(x in q for x in [' an', ' einschalten', ' on']):
        return {'ambilight_power': ambilight_power(True)}
    if 'video folgen' in q or 'dem bild angepasst' in q or 'bild angepasst' in q:
        return {'ambilight': set_ambilight_video(q)}
    if 'audio folgen' in q:
        return {'ambilight': set_ambilight_audio(q)}
    if 'farbe folgen' in q or ('ambilight' in q and any(x in q for x in ['rot', 'orange', 'blau', 'grun', 'grün', 'weiss', 'weiß', 'warmweiss', 'warmweiß', 'neutralweiss', 'neutralweiß', 'tiefsee', 'natur', 'lava'])):
        return {'ambilight': set_ambilight_color(q)}
    if ('kontrast' in q or 'videokontrast' in q) and any(x in q for x in ['0', '100']):
        value = 100 if '100' in q else 0
        name = 'video_contrast' if 'video' in q else 'contrast'
        return {name: set_value(name, value)}
    if any(x in q for x in [' tv aus', ' fernseher aus', ' ausschalten', ' ausschalte', ' ausmachen', ' aus ']) or q in ['tv aus', 'fernseher aus', 'aus']:
        return {'power': power_off()}
    if any(x in q for x in [' tv an', ' fernseher an', ' einschalten', ' einschalte', ' anmachen', ' an ']) or q in ['tv an', 'fernseher an', 'an']:
        return {'power': power_on()}
    if any(x in q for x in ['youtube', 'dazn', 'the zone', 'zone', 'netflix', 'spotify']):
        return {'app': launch_app(q)}
    if 'watch tv' in q or 'tv modus' in q or 'fernsehen' in q or 'aufs tv' in q or 'auf tv' in q:
        return {'tv': watch_tv()}
    if 'orf' in q or q.isdigit() or 'schalte auf' in q:
        target = q.replace('schalte auf', '').strip()
        return {'channel': watch_tv(target or q)}
    raise SystemExit('could not parse command')


def main(argv):
    if len(argv) < 2:
        print(json.dumps(status(), ensure_ascii=False))
        return
    if argv[1] in {'status', 'get'}:
        print(json.dumps(status(), ensure_ascii=False))
        return
    if argv[1] == 'set' and len(argv) == 4:
        name = argv[2]
        if name not in CFG['nodes']:
            raise SystemExit('valid names: contrast, video_contrast')
        print(json.dumps({name: set_value(name, argv[3])}, ensure_ascii=False))
        return
    if argv[1] == 'power' and len(argv) >= 3:
        action = norm(' '.join(argv[2:]))
        if action in {'off', 'aus'}:
            print(json.dumps({'power': power_off()}, ensure_ascii=False))
            return
        if action in {'on', 'an', 'ein'}:
            print(json.dumps({'power': power_on()}, ensure_ascii=False))
            return
    if argv[1] == 'app' and len(argv) >= 3:
        print(json.dumps({'app': launch_app(' '.join(argv[2:]))}, ensure_ascii=False))
        return
    if argv[1] == 'tv':
        target = ' '.join(argv[2:]).strip() if len(argv) >= 3 else None
        print(json.dumps({'channel': watch_tv(target)}, ensure_ascii=False))
        return
    if argv[1] == 'ambilight' and len(argv) >= 3:
        sub = norm(argv[2])
        rest = ' '.join(argv[3:]).strip()
        if sub in {'on', 'an', 'ein'}:
            print(json.dumps({'ambilight_power': ambilight_power(True)}, ensure_ascii=False))
            return
        if sub in {'off', 'aus'}:
            print(json.dumps({'ambilight_power': ambilight_power(False)}, ensure_ascii=False))
            return
        if sub == 'video':
            print(json.dumps({'ambilight': set_ambilight_video(rest or 'natural')}, ensure_ascii=False))
            return
        if sub == 'audio':
            print(json.dumps({'ambilight': set_ambilight_audio(rest or 'rhythm')}, ensure_ascii=False))
            return
        if sub == 'color':
            print(json.dumps({'ambilight': set_ambilight_color(rest or 'deep water')}, ensure_ascii=False))
            return
    print(json.dumps(handle_natural(' '.join(argv[1:])), ensure_ascii=False))


if __name__ == '__main__':
    main(sys.argv)
