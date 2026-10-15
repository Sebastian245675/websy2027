"""Imágenes para compartir (1200x630) de cada post del blog y la imagen general del sitio.

Google pide una imagen en los artículos (BlogPosting) para mostrarlos con miniatura en los resultados y en
Discover, y WhatsApp, LinkedIn y Facebook usan og:image al compartir un enlace. Los posts no tienen foto propia,
así que se genera una tarjeta con el título y la marca.

Uso (desde frontend/, requiere Pillow):  python scripts/generate-og-images.py
Escribe public/og/blog/<slug>.png, public/og/websy.png y src/blogs/ogImages.json (lista de slugs con imagen,
que BlogPostPage usa para no declarar una imagen que no existe). Correrlo de nuevo al publicar posts nuevos;
solo genera las que faltan (--all para regenerar todas).
"""
import io
import json
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
BLOGS = os.path.join(ROOT, 'src', 'blogs')
OUT = os.path.join(ROOT, 'public', 'og')
NOT_POST_MODULES = {'index.js', 'clusters.js', 'authors.js', 'postContent.js'}

W, H = 1200, 630
BG = (24, 42, 44)        # #182A2C
LIME = (217, 251, 6)     # #d9fb06
WHITE = (255, 255, 255)
MUTED = (160, 178, 180)


def font(bold, size):
    candidates = ['segoeuib.ttf', 'arialbd.ttf', 'DejaVuSans-Bold.ttf'] if bold else ['segoeui.ttf', 'arial.ttf', 'DejaVuSans.ttf']
    dirs = [os.path.join(os.environ.get('WINDIR', 'C:\\Windows'), 'Fonts'), '/usr/share/fonts/truetype/dejavu', '/Library/Fonts']
    for name in candidates:
        for d in dirs:
            path = os.path.join(d, name)
            if os.path.exists(path):
                return ImageFont.truetype(path, size)
    sys.exit('generate-og-images: no se encontró una fuente TrueType (Segoe UI, Arial o DejaVu)')


def wrap(draw, text, fnt, width):
    lines, line = [], ''
    for word in text.split():
        test = f'{line} {word}'.strip()
        if draw.textlength(test, font=fnt) <= width:
            line = test
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def card(title, kicker, footer):
    img = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 14, H], fill=LIME)
    d.text((80, 64), 'WEBSY', font=font(True, 40), fill=WHITE)
    if kicker:
        d.text((80, 128), kicker.upper(), font=font(True, 24), fill=LIME)
    # El título más grande que entre en 4 líneas
    for size in (68, 62, 56, 50, 44):
        fnt = font(True, size)
        lines = wrap(d, title, fnt, W - 160)
        if len(lines) <= 4:
            break
    lines = lines[:4]
    line_h = int(size * 1.18)
    y = 190 + (4 - len(lines)) * line_h // 2
    for line in lines:
        d.text((80, y), line, font=fnt, fill=WHITE)
        y += line_h
    d.text((80, H - 80), footer, font=font(False, 26), fill=MUTED)
    buf = io.BytesIO()
    img.quantize(colors=64).save(buf, 'PNG', optimize=True)
    return buf.getvalue()


def posts():
    out = []
    for name in sorted(os.listdir(BLOGS)):
        if not name.endswith('.js') or name in NOT_POST_MODULES:
            continue
        src = io.open(os.path.join(BLOGS, name), encoding='utf-8').read()
        for block in re.split(r'\n\s*\{\s*\n', src):
            slug = re.search(r"^\s*slug:\s*'([^']+)'", block, re.M)
            title = re.search(r"^\s*title:\s*'((?:[^'\\]|\\.)+)'", block, re.M)
            category = re.search(r"^\s*category:\s*'([^']+)'", block, re.M)
            if slug and title:
                out.append((slug.group(1), title.group(1).replace("\\'", "'"), category.group(1) if category else 'Blog'))
    seen = set()
    return [p for p in out if not (p[0] in seen or seen.add(p[0]))]


def main():
    regenerate = '--all' in sys.argv
    os.makedirs(os.path.join(OUT, 'blog'), exist_ok=True)
    made = 0
    site = os.path.join(OUT, 'websy.png')
    if regenerate or not os.path.exists(site):
        io.open(site, 'wb').write(card('Webs, tiendas online, sistemas y automatización con IA', 'Agencia de desarrollo web',
                                       'websysrl.com · Argentina · Colombia · México · EE. UU.'))
        made += 1
    slugs = []
    for slug, title, category in posts():
        path = os.path.join(OUT, 'blog', f'{slug}.png')
        if regenerate or not os.path.exists(path):
            io.open(path, 'wb').write(card(title, category, 'websysrl.com/blog'))
            made += 1
        slugs.append(slug)
    io.open(os.path.join(BLOGS, 'ogImages.json'), 'w', encoding='utf-8').write(json.dumps(sorted(slugs), indent=1) + '\n')
    print(f'generate-og-images: {made} imágenes nuevas, {len(slugs)} posts con imagen')


if __name__ == '__main__':
    main()
