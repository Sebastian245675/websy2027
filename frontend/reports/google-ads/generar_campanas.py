# Genera los CSV de Google Ads Editor para las campañas de búsqueda de Websy (Colombia y México).
# Uso: python generar_campanas.py   -> escribe campanas.csv, palabras_clave.csv, anuncios.csv, negativas.csv
# Valida los límites de Google: títulos <= 30 caracteres, descripciones <= 90, rutas <= 15.

import csv
import os

SITE = 'https://www.websysrl.com'
OUT = os.path.dirname(os.path.abspath(__file__))

CAMPAIGNS = [
    # nombre, país, presupuesto diario (en la moneda de la cuenta), CPC máximo
    {'name': 'CO | Búsqueda | Diseño web por ciudad', 'location': 'Colombia', 'budget': 15, 'cpc': 1.5},
    {'name': 'MX | Búsqueda | Diseño web por ciudad', 'location': 'Mexico', 'budget': 10, 'cpc': 1.5},
]

CO, MX = CAMPAIGNS[0]['name'], CAMPAIGNS[1]['name']

# Grupo de anuncios = ciudad. Cada uno lleva a su página de ciudad, que tiene el WhatsApp del país.
GROUPS = [
    {'campaign': CO, 'city': 'Cali', 'url': '/colombia/desarrollo-web-cali', 'path2': 'cali',
     'kw': ['diseño de paginas web cali', 'desarrollo web cali', 'paginas web cali', 'diseño web cali',
            'empresa de diseño web cali', 'crear pagina web cali', 'tienda virtual cali', 'desarrollo de software cali']},
    {'campaign': CO, 'city': 'Bogotá', 'url': '/colombia/desarrollo-web-bogota', 'path2': 'bogota',
     'kw': ['diseño de paginas web bogota', 'desarrollo web bogota', 'paginas web bogota', 'diseño web bogota',
            'empresa de diseño web bogota', 'agencia diseño web bogota', 'paginas web para empresas bogota', 'tienda virtual bogota']},
    {'campaign': CO, 'city': 'Medellín', 'url': '/colombia/desarrollo-web-medellin', 'path2': 'medellin',
     'kw': ['diseño de paginas web medellin', 'desarrollo web medellin', 'paginas web medellin', 'diseño web medellin',
            'empresa de diseño web medellin', 'agencia diseño web medellin', 'tienda virtual medellin']},
    {'campaign': CO, 'city': 'Barranquilla', 'url': '/colombia/desarrollo-web-barranquilla', 'path2': 'barranquilla',
     'kw': ['diseño de paginas web barranquilla', 'desarrollo web barranquilla', 'paginas web barranquilla',
            'diseño web barranquilla', 'empresa de diseño web barranquilla']},
    {'campaign': CO, 'city': 'Colombia', 'url': '/colombia', 'path2': 'precios',
     'kw': ['cuanto cuesta una pagina web en colombia', 'precio pagina web colombia', 'cotizar pagina web',
            'diseño de paginas web para empresas', 'empresa de desarrollo web colombia']},
    {'campaign': MX, 'city': 'CDMX', 'url': '/mexico/diseno-web-cdmx', 'path2': 'cdmx',
     'kw': ['diseño de paginas web cdmx', 'diseño web cdmx', 'paginas web cdmx', 'desarrollo web cdmx',
            'diseño de paginas web ciudad de mexico', 'agencia de diseño web cdmx']},
    {'campaign': MX, 'city': 'Monterrey', 'url': '/mexico/diseno-web-monterrey', 'path2': 'monterrey',
     'kw': ['diseño de paginas web monterrey', 'diseño web monterrey', 'paginas web monterrey',
            'desarrollo web monterrey', 'agencia de diseño web monterrey']},
    {'campaign': MX, 'city': 'Guadalajara', 'url': '/mexico/diseno-web-guadalajara', 'path2': 'guadalajara',
     'kw': ['diseño de paginas web guadalajara', 'diseño web guadalajara', 'paginas web guadalajara',
            'desarrollo web guadalajara', 'diseño web zapopan']},
]

# Búsquedas de gente que no compra: estudiantes, empleo, gratis, tutoriales
NEGATIVES = ['gratis', 'gratuita', 'gratuito', 'curso', 'cursos', 'tutorial', 'aprender', 'como hacer', 'que es',
             'empleo', 'empleos', 'trabajo', 'vacantes', 'salario', 'sueldo', 'practicas', 'sena', 'universidad',
             'plantilla', 'plantillas', 'descargar', 'pdf', 'youtube', 'freelancer', 'wix gratis']


def headlines(g):
    co = g['campaign'] == CO
    city = g['city']
    price = 'Desde COP 3.000.000' if co else 'Desde MXN 15.000'
    first = f'Diseño Web en {city}' if city not in ('Colombia',) else 'Páginas Web para Empresas'
    return [
        first,
        f'Páginas Web {city}' if city != 'Colombia' else 'Precio Publicado en COP',
        price,
        'Precio Cerrado por Escrito',
        'Pagas en 3 Partes',
        'Cotiza por WhatsApp Hoy',
        'Casos Reales con Ficha',
        'Dominio a Tu Nombre',
        'Web Rápida en el Celular',
        'SEO Técnico Incluido',
        'Tiendas Virtuales' if co else 'Tiendas en Línea',
        'Pagos con PSE y Nequi' if co else 'Pagos con SPEI u OXXO',
        'Entrega en 2 a 3 Semanas',
        'Automatiza tu WhatsApp',
        'Respuesta en el Día Hábil',
    ]


def descriptions(g):
    co = g['campaign'] == CO
    price = 'COP 3.000.000' if co else 'MXN 15.000'
    where = g['city'] if g['city'] != 'Colombia' else 'Colombia'
    return [
        f'Páginas web para empresas de {where} desde {price}. Precio y plazo por escrito.',
        'Pagas 30% al empezar, 30% a mitad y 40% al ver tu web terminada.',
        'Diseño, SEO técnico y WhatsApp a un toque. El dominio queda a tu nombre.',
        'Mira casos reales con su ficha y cotiza por WhatsApp. Respuesta en el día hábil.',
    ]


def check(label, text, limit):
    if len(text) > limit:
        raise SystemExit(f'{label} supera {limit} caracteres ({len(text)}): {text}')


def write(name, header, rows):
    with open(os.path.join(OUT, name), 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)


write('campanas.csv',
      ['Campaign', 'Campaign Type', 'Networks', 'Budget', 'Budget type', 'Bid Strategy Type', 'Max CPC Bid Limit',
       'Languages', 'Location', 'Campaign Status', 'Final URL suffix'],
      [[c['name'], 'Search', 'Google search', c['budget'], 'Daily', 'Maximize clicks', c['cpc'], 'es',
        c['location'], 'Paused', 'utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}']
       for c in CAMPAIGNS])

kw_rows, ad_rows = [], []
for g in GROUPS:
    group = f"Diseño web {g['city']}"
    for kw in g['kw']:
        for match in ('Phrase', 'Exact'):
            kw_rows.append([g['campaign'], group, kw, match, SITE + g['url'], 'Enabled'])
    h, d = headlines(g), descriptions(g)
    assert len(h) == 15 and len(set(h)) == 15, g['city']
    for i, t in enumerate(h):
        check(f"{g['city']} título {i + 1}", t, 30)
    for i, t in enumerate(d):
        check(f"{g['city']} descripción {i + 1}", t, 90)
    check('ruta 2', g['path2'], 15)
    ad_rows.append([g['campaign'], group, 'Responsive search ad', SITE + g['url'], 'paginas-web', g['path2'], *h, *d, 'Enabled'])

write('palabras_clave.csv', ['Campaign', 'Ad Group', 'Keyword', 'Criterion Type', 'Final URL', 'Status'], kw_rows)
write('anuncios.csv',
      ['Campaign', 'Ad Group', 'Ad type', 'Final URL', 'Path 1', 'Path 2',
       *[f'Headline {i}' for i in range(1, 16)], *[f'Description {i}' for i in range(1, 5)], 'Status'],
      ad_rows)
write('negativas.csv', ['Campaign', 'Keyword', 'Criterion Type'],
      [[c['name'], n, 'Negative phrase'] for c in CAMPAIGNS for n in NEGATIVES])

print(f'{len(CAMPAIGNS)} campañas, {len(GROUPS)} grupos, {len(kw_rows)} palabras clave, {len(ad_rows)} anuncios, '
      f'{len(NEGATIVES) * len(CAMPAIGNS)} negativas. Todo dentro de los límites de Google.')
