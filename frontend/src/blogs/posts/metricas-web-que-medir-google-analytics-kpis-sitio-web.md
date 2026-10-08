**Las métricas de un sitio web que realmente importan para una empresa son: impresiones, clics y posición en Google (Search Console); visitas por canal y conversiones (Google Analytics 4); tasa de conversión; costo por consulta o por venta si inviertes en publicidad; y ventas generadas por la web (CRM o tienda).** Las métricas de vanidad, como "me gusta" o páginas vistas sin contexto, no dicen si la web trae clientes.

En esta guía verás qué métricas mirar según el tipo de web, cómo configurar Google Analytics 4 y Search Console, cómo armar un tablero simple, cómo interpretar los números y los errores de medición más comunes.

## Las métricas por etapa

| Etapa | Métrica | Qué responde | Herramienta |
| --- | --- | --- | --- |
| Visibilidad | Impresiones y posición media | ¿Me ven en Google? | Search Console |
| Atracción | Clics y CTR en Google | ¿Me eligen en los resultados? | Search Console |
| Tráfico | Usuarios por canal | ¿De dónde vienen? | Google Analytics 4 |
| Interés | Interacción y páginas clave vistas | ¿Les interesa lo que ven? | Google Analytics 4 |
| Conversión | Consultas, reservas, compras | ¿Hacen lo que necesito? | Google Analytics 4 |
| Negocio | Ventas, ingresos, costo por cliente | ¿Se paga la web? | CRM, tienda, plataforma de anuncios |

## KPIs según el tipo de web

| Tipo de web | KPIs principales |
| --- | --- |
| Servicios | Consultas por WhatsApp y formulario, tasa de conversión, consultas por canal |
| Tienda online | Ventas, tasa de conversión, ticket promedio, abandono de carrito |
| Turnos | Reservas, tasa de ausencias, ocupación |
| Contenido o blog | Clics desde Google, artículos que generan consultas |

Elige 3 a 5 KPIs y revísalos todos los meses. Más que eso termina en tableros que nadie mira.

## Configurar Google Analytics 4

1. **Crea la propiedad** e instala la etiqueta en la web (directamente o con Google Tag Manager).
2. **Define los eventos clave** (conversiones): clic en WhatsApp, envío de formulario, compra, reserva.
3. **Marca esos eventos como clave** en la configuración de GA4.
4. **Conecta Google Ads y Search Console** si los usas.
5. **Excluye el tráfico interno** (tu equipo).
6. **Revisa el consentimiento de cookies** según la ley de tu país y las exigencias de las plataformas.

En la mayoría de las webs de servicio, el clic en el botón de WhatsApp es la conversión más importante y la que más se olvida de medir.

## Configurar Google Search Console

1. Verifica el dominio (preferentemente como propiedad de dominio).
2. Envía el sitemap.
3. Revisa cada mes: rendimiento (consultas, páginas, posición, CTR) e indexación (informe "Páginas").

Search Console muestra lo que pasa antes de que alguien entre a tu web: por qué búsquedas apareces y en qué posición. Ver [cómo mejorar el posicionamiento](/blog/como-mejorar-posicionamiento-google-sitio-web-existente).

## Un tablero mensual simple

| Métrica | Mes anterior | Este mes | Variación |
| --- | --- | --- | --- |
| Impresiones en Google | | | |
| Clics desde Google | | | |
| Usuarios totales | | | |
| Consultas (WhatsApp + formulario) | | | |
| Tasa de conversión | | | |
| Ventas originadas en la web | | | |
| Inversión en anuncios | | | |
| Costo por consulta | | | |

Looker Studio permite armar este tablero conectado a GA4 y Search Console de forma gratuita.

## Cómo interpretar los números

- **Suben las impresiones y no los clics**: apareces, pero lejos o con títulos poco atractivos.
- **Suben las visitas y no las consultas**: llega tráfico que no es tu cliente o la web no convierte. Ver [qué es CRO](/blog/cro-conversion-rate-optimization-guia-testing-ab).
- **Muchas consultas, pocas ventas**: problema de calidad de las consultas o del proceso comercial.
- **Bajan las visitas en una época del año**: compara con el mismo mes del año anterior antes de preocuparte.

## Errores de medición comunes

- **No medir los clics en WhatsApp**.
- **Contar las visitas del propio equipo**.
- **Mirar solo el total** sin separar por canal.
- **Cambiar la web y no anotar cuándo**: después no sabes qué causó el cambio en los números.
- **Comparar períodos distintos** (una semana con feriado contra una normal).

## Preguntas frecuentes

### ¿Qué métricas debo medir en mi página web?

Impresiones, clics y posición en Google; visitas por canal; conversiones (consultas, reservas, compras); tasa de conversión; y, si haces publicidad, costo por consulta.

### ¿Qué es un KPI de un sitio web?

Un indicador clave que mide si la web cumple su objetivo de negocio, como la cantidad de consultas mensuales o la tasa de conversión.

### ¿Cómo mido los clics en WhatsApp?

Con un evento en Google Analytics 4 (directamente o con Google Tag Manager) que se dispare al hacer clic en los enlaces de WhatsApp, marcado como evento clave.

### ¿Search Console y Analytics son lo mismo?

No. Search Console muestra cómo apareces en Google antes del clic; Analytics muestra qué hacen los visitantes dentro de tu web.

## Medimos lo que importa

En Websy configuramos la medición de tu web y armamos tableros con los KPIs de tu negocio. Mira la [guía de SEO y marketing digital](/blog/guia-seo-y-marketing-digital-para-pymes) o [escríbenos](/contacto).
