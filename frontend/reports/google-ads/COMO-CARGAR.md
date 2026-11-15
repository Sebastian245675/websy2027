# Campañas de Google Ads: diseño web por ciudad (Colombia y México)

Objetivo: 5 a 7 contactos por día (WhatsApp o formulario) de gente que busca contratar una página web.

## Qué hay en esta carpeta

| Archivo | Contenido |
|---|---|
| `campanas.csv` | 2 campañas de búsqueda: Colombia (15/día) y México (10/día). Se crean **pausadas**. |
| `palabras_clave.csv` | 98 palabras clave de compra ("diseño de paginas web cali"...), en concordancia de frase y exacta. |
| `anuncios.csv` | 1 anuncio adaptable por ciudad, con 15 títulos y 4 descripciones. |
| `negativas.csv` | Excluye búsquedas de gente que no compra: gratis, curso, empleo, plantilla, etc. |
| `generar_campanas.py` | Si cambias algo, edita el script y vuelve a correr `python generar_campanas.py`. |

Grupos (cada uno lleva a su página): Cali, Bogotá, Medellín, Barranquilla, Colombia general (precio), CDMX, Monterrey, Guadalajara.

## Antes de cargar (sin esto las campañas gastan a ciegas)

1. **Publica el sitio** con las páginas nuevas (`npm run deploy`). Medellín, Barranquilla, Monterrey y Guadalajara solo existen después del deploy.
2. **Vincula Google Analytics (G-NGT83QCCZS) con Google Ads**: Ads → Herramientas → Cuentas vinculadas → Google Analytics.
3. **Marca como eventos clave en GA4**: `click_whatsapp`, `envio_formulario_contacto` y `envio_formulario_auditoria` (GA4 → Administrar → Eventos).
4. **Impórtalos como conversiones en Ads**: Objetivos → Conversiones → Nueva → Importar → Google Analytics 4.
5. **Moneda de la cuenta**: el presupuesto (15 y 10) y el CPC máximo (1,5) están pensados en **USD**. Si tu cuenta está en COP, cámbialos en `campanas.csv` (por ejemplo 60.000 COP/día y 6.000 de CPC).

## Cómo cargarlo

1. Instala **Google Ads Editor** y descarga tu cuenta.
2. Cuenta → Importar → Desde archivo: importa en este orden `campanas.csv`, `palabras_clave.csv`, `anuncios.csv`, `negativas.csv`.
3. Revisa los cambios propuestos → Mantener → **Publicar**.
4. En la web de Ads, agrega a cada campaña (no van por CSV):
   - **Enlaces de sitio**: Precios (`/planes`), Casos de éxito (`/casos-de-exito`), Cotizador (`/cotizador`), Auditoría gratis (`/auditoria-gratis`).
   - **Textos destacados**: "Pago en 3 partes", "Precio por escrito", "Dominio a tu nombre", "Casos con ficha".
   - **Horario**: lunes a viernes de 8 a 18 h (hora local de cada país), para que alguien conteste el WhatsApp rápido.
5. Activa las campañas.

## Primeras 2 semanas

- **Días 1 a 3**: revisa en "Términos de búsqueda" qué escribió realmente la gente. Todo lo que no sea alguien que quiere contratar se agrega como negativa.
- **Día 7**: mira el costo por contacto. Divide el gasto por los contactos (clics a WhatsApp + formularios) que se ven en Ads y en el panel `/panel`.
- **Día 14, con 15 o más conversiones**: cambia la estrategia de "Maximizar clics" a "Maximizar conversiones". Sube el presupuesto en las ciudades que traen contactos más baratos.
- **Responder rápido** es parte de la campaña: si el WhatsApp tarda horas en contestar, el prospecto ya le escribió a otra agencia.

## Qué no dicen los anuncios a propósito

No dicen "agencia en Cali" ni "oficina en Bogotá", porque Websy trabaja a distancia. Las páginas de ciudad lo aclaran y Google penaliza los anuncios que prometen algo que la página no confirma. Tampoco inventan clientes locales en Medellín, Barranquilla, Monterrey ni Guadalajara.
