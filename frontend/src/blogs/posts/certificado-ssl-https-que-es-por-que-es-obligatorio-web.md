**Un certificado SSL (hoy técnicamente TLS) es un archivo instalado en el servidor que permite que la conexión entre el navegador y tu web viaje cifrada, lo que se ve como "https://" y el candado en la barra del navegador.** Es prácticamente obligatorio: los navegadores marcan como "No seguro" las webs sin HTTPS, Google lo usa como señal de posicionamiento y es imprescindible para cualquier formulario o pago. Hoy se consigue gratis con Let's Encrypt o con servicios como Cloudflare.

En esta guía verás qué hace exactamente un certificado SSL, los tipos que existen, cómo se instala y renueva, cómo pasar una web a HTTPS sin perder posicionamiento y los errores más comunes.

## Qué hace un certificado SSL

| Función | Qué significa para tu web |
| --- | --- |
| Cifrado | Nadie en el camino (por ejemplo, en un Wi-Fi público) puede leer los datos que se envían |
| Autenticación | Confirma que el visitante está conectado a tu dominio y no a un impostor |
| Integridad | Evita que alguien modifique el contenido en el camino |

## Por qué es obligatorio en la práctica

- **Navegadores**: Chrome, Safari y Firefox muestran advertencias en webs sin HTTPS, sobre todo con formularios.
- **Google**: usa HTTPS como señal de posicionamiento y de experiencia.
- **Pagos y formularios**: las pasarelas de pago exigen HTTPS.
- **Funciones modernas**: muchas funciones del navegador (geolocalización, notificaciones, PWA) solo funcionan con HTTPS.
- **Confianza**: el aviso de "No seguro" espanta a los clientes.

## Tipos de certificados

| Tipo | Qué valida | Costo | Para quién |
| --- | --- | --- | --- |
| DV (validación de dominio) | Que controlas el dominio | Gratis (Let's Encrypt) o bajo | La gran mayoría de las webs |
| OV (validación de organización) | Además, la existencia de la empresa | Pago | Empresas que lo requieren por política |
| EV (validación extendida) | Verificación más rigurosa de la empresa | Pago | Casos con requisitos específicos |
| Wildcard | Todos los subdominios de un dominio | Gratis o pago | Sitios con muchos subdominios |

Para el visitante, todos se ven igual (el candado). El cifrado es el mismo; cambia el nivel de validación de la identidad.

## Cómo se obtiene e instala

- **Plataformas modernas** (Vercel, Netlify, Cloudflare Pages): el certificado se emite y renueva solo.
- **Hostings con panel**: suelen ofrecer Let's Encrypt con un clic.
- **Servidores propios**: con herramientas como Certbot, que emite el certificado y programa la renovación automática.
- **Detrás de Cloudflare**: certificado en el borde y otro en tu servidor, en modo completo y estricto.

Los certificados de Let's Encrypt tienen una vigencia corta (90 días o menos, y la tendencia de la industria es acortarla) y se renuevan automáticamente; si la renovación falla, la web muestra un error. Configura alertas de vencimiento.

## Pasar una web a HTTPS sin perder posicionamiento

1. Instala el certificado y verifica que la web funcione con https.
2. Redirige todas las URLs http a su versión https con redirecciones 301.
3. Actualiza los enlaces internos, las canonical y el sitemap a https.
4. Corrige el contenido mixto (imágenes o scripts cargados por http).
5. Agrega la versión https en Google Search Console y envía el sitemap.
6. Cuando todo esté estable, activa HSTS para que los navegadores usen siempre https.

## Errores comunes

| Error | Consecuencia | Solución |
| --- | --- | --- |
| Certificado vencido | Pantalla de advertencia y visitas perdidas | Renovación automática y alertas |
| Contenido mixto | Candado roto o recursos bloqueados | Cargar todo por https |
| Certificado que no cubre el dominio con o sin www | Error en una de las versiones | Certificado para ambos, y redirigir a una |
| Redirección en cadena http → https → www | Más lentitud | Una sola redirección a la versión final |

## Preguntas frecuentes

### ¿Qué es un certificado SSL?

Un archivo instalado en el servidor que permite que la conexión entre el navegador y la web viaje cifrada, lo que se ve como https y un candado en el navegador.

### ¿El certificado SSL es gratis?

Sí, con Let's Encrypt o servicios como Cloudflare. Los certificados pagos ofrecen validaciones adicionales de la empresa, pero el cifrado es el mismo.

### ¿El SSL ayuda al SEO?

Sí. Google usa HTTPS como señal, y una web sin HTTPS genera advertencias que reducen las visitas y la confianza.

### ¿Qué pasa si se vence el certificado?

Los navegadores muestran una advertencia de seguridad y la mayoría de los visitantes se va. Por eso conviene la renovación automática con alertas.

## HTTPS incluido

En Websy todas las webs se entregan con HTTPS, renovación automática y redirecciones correctas. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web), qué es [HTTP/3](/blog/certificados-ssl-https-y-protocolo-http3-guia-seguridad) o [escríbenos](/contacto).
