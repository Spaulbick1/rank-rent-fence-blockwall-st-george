#!/usr/bin/env python3
"""Technical-SEO audit for St. George Elite Fence (Phase 5, rank-rent-build v1.41; Rule 17/18 checks added Phase 6, v1.43).

Run after a build:  python3 scripts/audit.py [dist_dir]
Exits 1 if any FAIL. WARN lines are for human review. Re-run in Phases 6-7.
Checks: titles/metas, canonical + OG/Twitter, noindex set, JSON-LD (Rules 12-14,
banned types, FAQ/HowTo visible on page), headings, internal links + anchors,
orphans, images, sitemap, robots, IndexNow key, disclosure once, no pool-barrier
height, apex canonical host.
"""
import json, os, re, sys, xml.etree.ElementTree as ET
from html.parser import HTMLParser

SITE = 'https://stgeorgeelitefence.com'
KEY = '30a69542c81d43d3cbb37b4ee172adee'
NOINDEX = {'/thank-you/', '/404/'}
BANNED = {'LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor',
          'Review', 'AggregateRating', 'Rating'}
DISCLOSURE = 'is an independent referral service. We connect homeowners'  # footer disclosure fingerprint (site-config.ts)
TITLE_MAX, META_MAX = 58, 155
# Known, reviewed false positives for the pool-height regex (page, snippet)
POOL_FP = [('/pool-fence-and-gate-st-george-ut/', 'retaining wall')]

dist = sys.argv[1] if len(sys.argv) > 1 else 'dist'
fails, warns = [], []
def F(p, m): fails.append(f'FAIL {p}: {m}')
def W(p, m): warns.append(f'WARN {p}: {m}')

class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True)
        s.title = ''; s.in_title = False; s.metas = []; s.links = []; s.ld = []
        s.in_ld = False; s.heads = []; s.cur_h = None; s.a = []; s.ids = set()
        s.imgs = []; s.text = []; s.skip = 0; s.in_a = 0; s.unlinked = []
        s.cur_text_tag = None
    def handle_starttag(s, t, a):
        d = dict(a)
        if 'id' in d: s.ids.add(d['id'])
        if t == 'title': s.in_title = True
        elif t == 'meta': s.metas.append(d)
        elif t == 'link': s.links.append(d)
        elif t == 'script':
            s.skip += 1
            if d.get('type') == 'application/ld+json': s.in_ld = True; s.ld.append('')
        elif t == 'style': s.skip += 1
        elif re.fullmatch(r'h[1-6]', t): s.cur_h = [int(t[1]), '']
        elif t == 'a': s.a.append(d); s.in_a += 1
        elif t == 'img': s.imgs.append(d)
    def handle_endtag(s, t):
        if t == 'title': s.in_title = False
        elif t in ('script', 'style'): s.skip -= 1; s.in_ld = False
        elif re.fullmatch(r'h[1-6]', t) and s.cur_h: s.heads.append(tuple(s.cur_h)); s.cur_h = None
        elif t == 'a': s.in_a = max(0, s.in_a - 1)
    def handle_data(s, data):
        if s.in_title: s.title += data
        if s.in_ld: s.ld[-1] += data
        if s.skip: return
        if s.cur_h: s.cur_h[1] += data
        s.text.append(data)
        if not s.in_a and re.search(r'(§\s*\d|Utah Code|R156-55a|City Code|County Code|\bIBC\b|\bIRC\b)', data):
            s.unlinked.append(data.strip()[:140])

def route_of(fp):
    rel = os.path.relpath(fp, dist).replace(os.sep, '/')
    if rel == 'index.html': return '/'
    if rel == '404.html': return '/404/'
    return '/' + rel[:-len('index.html')]

pages = {}
for root, _, files in os.walk(dist):
    for f in files:
        if f.endswith('.html'):
            fp = os.path.join(root, f); p = P()
            p.feed(open(fp, encoding='utf-8').read()); pages[route_of(fp)] = p
print(f'{len(pages)} pages')

def resolve(href):
    """Return (route, anchor) for an internal href, else None."""
    if href.startswith(SITE): href = href[len(SITE):] or '/'
    if not href.startswith('/') or href.startswith('//'): return None
    path, _, anchor = href.partition('#'); path = path.split('?')[0]
    return path, anchor

def exists(path):
    if path in pages: return True
    return os.path.isfile(os.path.join(dist, path.lstrip('/')))

titles, metas_seen, inbound = {}, {}, {r: set() for r in pages}
for r, p in sorted(pages.items()):
    t = p.title.strip()
    if not t: F(r, 'no <title>')
    elif len(t) > TITLE_MAX: F(r, f'title {len(t)} chars > {TITLE_MAX}: {t}')
    if t in titles: F(r, f'duplicate title with {titles[t]}')
    titles[t] = r
    m = {(x.get('name') or x.get('property')): x.get('content', '') for x in p.metas}
    desc = m.get('description', '')
    if not desc: F(r, 'no meta description')
    elif len(desc) > META_MAX: F(r, f'meta {len(desc)} chars > {META_MAX}')
    if desc in metas_seen: F(r, f'duplicate meta with {metas_seen[desc]}')
    metas_seen[desc] = r
    canon = [l.get('href') for l in p.links if l.get('rel') == 'canonical']
    want = SITE + r
    if r == '/404/':
        if canon: F(r, '404 must not carry a canonical')
    else:
        if canon != [want]: F(r, f'canonical {canon} != {want}')
        if m.get('og:url') != want: F(r, f'og:url {m.get("og:url")} != {want}')
    for k in ('og:title', 'og:description', 'og:image', 'og:type', 'twitter:card', 'twitter:image'):
        if not m.get(k): F(r, f'missing {k}')
    if m.get('og:title') and m['og:title'] != t: F(r, 'og:title != <title>')
    img = m.get('og:image', '')
    if img and not (img.startswith(SITE) and exists(img[len(SITE):])): F(r, f'og:image not on apex/in dist: {img}')
    robots = m.get('robots', '')
    if r in NOINDEX and 'noindex' not in robots: F(r, 'should be noindex')
    if r not in NOINDEX and 'noindex' in robots: F(r, 'unexpected noindex')
    # headings
    h1 = [h for h in p.heads if h[0] == 1]
    if len(h1) != 1: F(r, f'{len(h1)} H1s')
    prev = 1
    for lvl, txt in p.heads:
        if lvl > prev + 1: W(r, f'heading skip h{prev}->h{lvl}: {txt.strip()[:50]}')
        prev = lvl
    # links
    for a in p.a:
        href = a.get('href', '')
        if a.get('target') == '_blank' and 'noopener' not in (a.get('rel') or ''): W(r, f'_blank without noopener: {href}')
        if re.match(r'https?://(www\.)', href) and 'stgeorgeelitefence' in href: F(r, f'www link: {href}')
        res = resolve(href)
        if res is None:
            if href.startswith('#') and href[1:] and href[1:] not in p.ids: F(r, f'broken in-page anchor {href}')
            continue
        path, anchor = res
        if not exists(path): F(r, f'broken internal link {href}'); continue
        if path in pages:
            if path != r: inbound[path].add(r)
            if anchor and anchor not in pages[path].ids: F(r, f'broken anchor {href}')
            if not path.endswith('/') : W(r, f'link without trailing slash {href}')
    # images
    eager = 0
    for im in p.imgs:
        src = im.get('src', '')
        if im.get('alt') is None: F(r, f'img without alt: {src}')
        elif im.get('alt') == '' and im.get('aria-hidden') != 'true' and im.get('role') != 'presentation': W(r, f'empty alt: {src}')
        if not (im.get('width') and im.get('height')): F(r, f'img without width/height: {src}')
        if im.get('loading') != 'lazy': eager += 1
        if re.search(r'\.(jpe?g|png)(\?|$)', src) and 'logo' not in src: W(r, f'non-WebP/AVIF img: {src}')
        if src.startswith('/') and not exists(src.split('?')[0]): F(r, f'img missing in dist: {src}')
    if eager > 1: W(r, f'{eager} non-lazy images (expect <=1 hero)')
    body = ' '.join(' '.join(p.text).split())
    # disclosure once
    n = body.count(DISCLOSURE)
    if n != 1: F(r, f'disclosure appears {n}x')
    # pool-barrier height
    for mt in re.finditer(r'pool[^.]{0,120}?\b(\d+(\.\d+)?\s*(-|\s)?(ft|feet|foot|inch|inches|in\.))', body, re.I):
        snip = body[max(0, mt.start()-40): mt.end()+40]
        if any(r == fp and s in snip for fp, s in POOL_FP): continue
        W(r, f'pool+height pattern (review): ...{snip}...')
    # JSON-LD
    if len(p.ld) != 1: F(r, f'{len(p.ld)} JSON-LD blocks'); continue
    try: g = json.loads(p.ld[0])['@graph']
    except Exception as e: F(r, f'JSON-LD parse: {e}'); continue
    byid = {n.get('@id'): n for n in g if n.get('@id')}
    types = [n.get('@type') for n in g]
    for n in g:
        if n.get('@type') in BANNED: F(r, f'banned type {n["@type"]}')
    s = json.dumps(g)
    for b in BANNED:
        if f'"@type": "{b}"' in s: F(r, f'banned type nested: {b}')
    org = byid.get(SITE + '/#organization')
    if not org: F(r, 'no Organization')
    else:
        lg = org.get('logo') or {}
        if lg.get('@type') != 'ImageObject' or min(lg.get('width', 0), lg.get('height', 0)) < 112: F(r, 'Organization.logo not ImageObject >=112')
        if not exists(lg.get('url', '')[len(SITE):]): F(r, 'logo file missing')
    wps = [n for n in g if n.get('@type') == 'WebPage']
    if len(wps) != 1: F(r, f'{len(wps)} WebPage nodes'); continue
    wp = wps[0]
    if wp['@id'] != SITE + r + '#webpage': F(r, f'WebPage @id {wp["@id"]}')
    if wp.get('url') != SITE + r: F(r, f'WebPage url {wp.get("url")}')
    services = [n for n in g if n.get('@type') == 'Service']
    for sv in services:
        if (sv.get('provider') or {}).get('@id') != SITE + '/#organization': F(r, 'Service.provider not Org @id')
        if not sv.get('@id'): F(r, 'Service without @id')
    me = (wp.get('mainEntity') or {}).get('@id')
    # Rule 14 (v1.44 A/B, adopted Phase 7): the page's own Service (@id = page#service)
    # wins; else its one ItemList, else its one Article; else the umbrella Service.
    own_svc = [n for n in services if n.get('@id') == SITE + r + '#service']
    lists = [n for n in g if n.get('@type') == 'ItemList' and n.get('@id')]
    arts = [n for n in g if n.get('@type') == 'Article' and n.get('@id')]
    if own_svc: want = own_svc[0]['@id']
    elif len(lists) == 1: want = lists[0]['@id']
    elif len(arts) == 1: want = arts[0]['@id']
    elif services: want = 'SERVICE'
    else: want = None
    if want == 'SERVICE':
        if not me: F(r, 'page has Service but WebPage.mainEntity missing')
        elif me not in byid or byid[me].get('@type') != 'Service': F(r, f'mainEntity {me} not a Service in graph')
    elif want:
        if me != want: F(r, f'WebPage.mainEntity {me} != expected {want} (Rule 14 v1.44)')
        elif me not in byid: F(r, f'mainEntity {me} dangling')
    elif me and me not in byid: F(r, f'mainEntity {me} dangling')
    for n in lists + arts:
        if not n['@id'].startswith(SITE + r + '#'): F(r, f'{n["@type"]} @id {n["@id"]} not on this page')
    for n in g:
        if n.get('@type') == 'Article':
            mo = n.get('mainEntityOfPage')
            if not isinstance(mo, dict) or mo.get('@id') != wp['@id']: F(r, f'Article.mainEntityOfPage {mo} != {wp["@id"]}')
        if n.get('@type') == 'FAQPage':
            for q in n['mainEntity']:
                qn = ' '.join(q['name'].split())
                an = ' '.join(q['acceptedAnswer']['text'].split())
                if qn not in body: F(r, f'FAQ question not visible: {qn[:60]}')
                if an[:80] not in body: F(r, f'FAQ answer not visible: {an[:60]}')
        if n.get('@type') == 'HowTo':
            for st in n['step']:
                if ' '.join(st['text'].split())[:80] not in body: F(r, f'HowTo step not visible: {st["name"]}')
    bc = (wp.get('breadcrumb') or {}).get('@id')
    if bc and bc not in byid: F(r, 'breadcrumb @id dangling')
    # every {"@id": x} reference must resolve in-graph
    for ref in re.findall(r'\{"@id": "([^"]+)"\}', s):
        if ref not in byid: F(r, f'dangling @id ref {ref}')
    if r in NOINDEX: pass
    print(f'  {r:52} {len(t):>2}t {len(desc):>3}m  {"/".join(x for x in types if x not in ("Organization","WebSite"))}')

# orphans
for r, src in inbound.items():
    if r not in NOINDEX and r != '/' and not src: F(r, 'orphan (no inbound internal links)')
    elif r not in NOINDEX and r != '/' and len(src) < 2: W(r, f'only {len(src)} inbound page(s)')

# sitemap
try:
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    idx = ET.parse(os.path.join(dist, 'sitemap-index.xml'))
    urls = set()
    for loc in idx.findall('.//s:loc', ns):
        sm = ET.parse(os.path.join(dist, loc.text.replace(SITE + '/', '')))
        urls |= {u.text for u in sm.findall('.//s:loc', ns)}
    want = {SITE + r for r in pages if r not in NOINDEX}
    if urls != want: F('sitemap', f'missing {sorted(want-urls)} extra {sorted(urls-want)}')
    else: print(f'sitemap: {len(urls)} URLs, matches indexable set')
except Exception as e: F('sitemap', str(e))

# Operating Rule 17 (v1.42): every sitemap <url> carries a non-empty <lastmod>
try:
    for loc in idx.findall('.//s:loc', ns):
        sm = ET.parse(os.path.join(dist, loc.text.replace(SITE + '/', '')))
        for u in sm.findall('.//s:url', ns):
            lm = u.find('s:lastmod', ns)
            if lm is None or not (lm.text or '').strip(): F('sitemap', f'no <lastmod> on {u.find("s:loc", ns).text}')
except Exception as e: F('sitemap lastmod', str(e))

# Operating Rule 18 (v1.43): RelatedServices block + priority-links.ts pass rule (built HTML)
PL_SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'lib', 'priority-links.ts')
try:
    pl = open(PL_SRC, encoding='utf-8').read()
    prio = re.findall(r"href: '([^']+)'", pl.split('export const PRIORITY_LINKS')[1].split('] as const')[0])
    sec = re.findall(r"href: '([^']+)'", pl.split('export const SECONDARY_LINKS')[1].split('] as const')[0]) if 'SECONDARY_LINKS' in pl else []
    excl = re.findall(r"'([^']+)'", pl.split('export const PRIORITY_EXCLUDE')[1])
    legal = [r for r in pages if r.startswith(('/privacy', '/terms'))]
    if not 6 <= len(prio) <= 8: F('priority-links', f'{len(prio)} entries (want 6-8)')
    for h in prio + sec:
        if h not in pages: F('priority-links', f'{h} is not a built route')
    cnt = {r: 0 for r in pages}
    for r, p in pages.items():
        for a in p.a:
            res = resolve(a.get('href', ''))
            if not res: continue
            t = res[0] if res[0].endswith('/') else res[0] + '/'
            if t != r and t in cnt: cnt[t] += 1
    for r, p in pages.items():
        n = sum(1 for x in p.heads if 'Popular next steps' in x[1])
        want = 0 if any(r.startswith(e) for e in excl) else 1
        if n != want: F(r, f'RelatedServices rendered {n}x (want {want})')
    lmax = max(cnt[r] for r in legal) if legal else 0
    for h in prio:
        if h in cnt and cnt[h] <= lmax: F(h, f'priority page inbound {cnt[h]} <= legal max {lmax}')
    for h in sec:
        if h in cnt and cnt[h] <= lmax: W(h, f'Areas & guides page inbound {cnt[h]} <= legal max {lmax}')
    if sec: print('areas & guides inbound: ' + ', '.join(f'{h}={cnt.get(h)}' for h in sec))
    print('rule 18 inbound (occurrences): ' + ', '.join(f'{h}={cnt.get(h)}' for h in prio) + ' | legal: ' + ', '.join(f'{r}={cnt[r]}' for r in sorted(legal)))
except Exception as e: F('priority-links', repr(e))

rb = open(os.path.join(dist, 'robots.txt')).read()
if f'Sitemap: {SITE}/sitemap-index.xml' not in rb: F('robots.txt', 'no Sitemap line')
if re.search(r'^\s*Disallow:\s*/\s*$', rb, re.M): F('robots.txt', 'Disallow: / present')
for bot in ('GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'OAI-SearchBot', 'CCBot'):
    if re.search(bot + r'[\s\S]{0,40}Disallow', rb): F('robots.txt', f'{bot} disallowed')
kf = os.path.join(dist, KEY + '.txt')
if not os.path.isfile(kf) or open(kf, 'rb').read() != KEY.encode(): F('indexnow', 'key file missing or not byte-exact')

if '--links' in sys.argv:
    print('\nNamed-but-unlinked citations (review for on-page research links):')
    for r, p in sorted(pages.items()):
        for u in sorted(set(p.unlinked)): print(f'  {r} :: {u}')

for w in warns: print(w)
for f in fails: print(f)
print(f'\n{len(fails)} FAIL, {len(warns)} WARN')
sys.exit(1 if fails else 0)
