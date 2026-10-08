**Un sitio o una app de empresa necesita, además del código, una infraestructura que lo mantenga rápido, disponible y seguro: un hosting adecuado al tipo de proyecto, dominio y certificado SSL, una CDN que acerque el contenido a los usuarios, copias de seguridad automáticas, una base de datos protegida, actualizaciones de seguridad y monitoreo.** La mayoría de los problemas graves (webs caídas, hackeos, pérdida de datos) vienen de descuidar alguna de estas piezas, no del diseño.

Esta guía explica cada pieza en lenguaje simple, para que puedas decidir con tu proveedor o tu equipo técnico, y enlaza a los artículos con el detalle de cada tema.

## Las piezas de la infraestructura

| Pieza | Para qué sirve | Artículo |
| --- | --- | --- |
| Hosting o nube | Donde "vive" la web o la app | [Mejor hosting para páginas web](/blog/mejor-hosting-para-paginas-web-en-argentina-colombia-mexico) y [AWS vs Vercel vs Firebase](/blog/aws-vs-vercel-vs-firebase-donde-alojar-tu-proyecto-web-app) |
| Dominio y DNS | La dirección y a dónde apunta | En esta guía |
| SSL / HTTPS | Cifrar la conexión | [Qué es un certificado SSL](/blog/certificado-ssl-https-que-es-por-que-es-obligatorio-web) |
| CDN | Servir el contenido desde cerca del usuario y filtrar ataques | [Qué es un CDN](/blog/cloudflare-vs-cloudfront-cdn-para-acelerar-y-proteger-tu-web) |
| Base de datos | Guardar clientes, pedidos, stock | [PostgreSQL vs MySQL vs MongoDB](/blog/base-de-datos-postgresql-vs-mysql-vs-mongodb-cual-elegir) |
| APIs | Conectar sistemas entre sí | [Qué es una API REST](/blog/api-rest-que-es-como-funciona-guia-principiantes) |
| Seguridad | Evitar hackeos y fugas de datos | [Cómo proteger una página web de hackers](/blog/proteger-pagina-web-de-hackers-seguridad-web-basica) |
| Despliegue | Publicar cambios sin romper nada | [Qué es CI/CD](/blog/ci-cd-pipelines-github-actions-docker-deployment-web) |

## Elegir dónde alojar

| Tipo de proyecto | Opción habitual |
| --- | --- |
| Sitio institucional o landing moderna | Plataformas como Vercel, Netlify o Cloudflare Pages |
| WordPress | Hosting administrado para WordPress |
| Tienda online a medida | Servidor en la nube o servicios administrados con base de datos |
| Sistema de gestión o app | Backend en un servidor o contenedor, base de datos administrada |
| Proyectos grandes | Nubes como AWS, Google Cloud o Azure |

## Dominio y DNS: lo que nadie revisa hasta que falla

- **El dominio a nombre de tu empresa**, con renovación automática.
- **Acceso al panel del DNS** guardado por la empresa, no solo por el proveedor.
- **Registros de correo** (SPF, DKIM, DMARC) configurados para que tus correos no lleguen a spam.
- **Una sola versión de la web** (con o sin www) redirigiendo la otra.

## Seguridad: lo mínimo indispensable

| Medida | Por qué |
| --- | --- |
| HTTPS en todo el sitio | Cifra los datos que viajan |
| Actualizaciones al día (CMS, plugins, librerías) | La mayoría de los hackeos explota versiones viejas |
| Contraseñas fuertes y verificación en dos pasos | Evita accesos con credenciales robadas |
| Copias de seguridad automáticas y probadas | Permiten volver atrás ante cualquier incidente |
| Firewall o CDN con protección | Filtra tráfico malicioso y ataques |
| Permisos mínimos | Cada usuario y sistema accede solo a lo que necesita |
| Monitoreo y alertas | Enterarte antes que tus clientes |

El detalle por nivel está en [cómo proteger una página web de hackers](/blog/proteger-pagina-web-de-hackers-seguridad-web-basica), [OWASP Top 10](/blog/ciberseguridad-web-owasp-top-10-como-proteger-tu-pagina-o-app) y [cómo prevenir ataques DDoS](/blog/como-prevenir-ataques-ddos-y-fuerza-bruta-en-paginas-web).

## Datos personales

Si tu web o tu sistema guarda datos de clientes, se aplica la ley de protección de datos de tu país: Ley 25.326 en Argentina, Ley 1581 de 2012 en Colombia, la ley federal de datos personales en posesión de particulares en México. Implica informar para qué se usan, protegerlos y permitir su acceso o eliminación. Ver [ley de protección de datos personales para empresas](/blog/como-proteger-datos-clientes-empresa-ley-proteccion-datos).

## Para equipos técnicos

Si tienes un equipo de desarrollo o quieres entender lo que hace tu proveedor:

- [Qué es Node.js](/blog/node-js-que-es-para-que-sirve-backend-servidor)
- [REST vs GraphQL](/blog/desarrollo-de-apis-rest-graphql-microservicios)
- [Qué es Docker](/blog/docker-que-es-para-que-sirve-explicacion-simple-empresas)
- [Qué es GitHub](/blog/github-que-es-para-que-sirve-control-versiones-explicacion)
- [Seguridad en bases de datos](/blog/seguridad-en-bases-de-datos-postgresql-y-mysql-para-empresas)
- [Qué es HTTP/3](/blog/certificados-ssl-https-y-protocolo-http3-guia-seguridad)

## Checklist para revisar con tu proveedor

| Pregunta | Respuesta esperada |
| --- | --- |
| ¿A nombre de quién está el dominio? | De la empresa |
| ¿Dónde está alojada la web y quién tiene acceso? | Proveedor conocido, accesos de la empresa documentados |
| ¿Hay copias de seguridad? ¿Cada cuánto? ¿Se probó restaurarlas? | Automáticas, frecuentes y probadas |
| ¿Cómo se aplican las actualizaciones de seguridad? | Con un proceso definido |
| ¿Qué pasa si la web se cae? | Monitoreo, alertas y tiempo de respuesta acordado |
| ¿Quién tiene acceso a la base de datos? | Solo quien lo necesita, con usuarios individuales |

## Preguntas frecuentes

### ¿Qué hosting necesita mi empresa?

Depende del proyecto: un sitio moderno se puede alojar en plataformas como Vercel o Netlify; WordPress, en un hosting administrado; tiendas, sistemas y apps, en servidores o servicios en la nube con base de datos.

### ¿Cómo protejo mi web de hackeos?

Con HTTPS, actualizaciones al día, contraseñas fuertes con verificación en dos pasos, copias de seguridad automáticas, una CDN o firewall y permisos mínimos.

### ¿Qué pasa si se cae mi web?

Si hay monitoreo, el proveedor se entera enseguida y la restablece. Si hay copias de seguridad probadas, se puede volver a una versión anterior. Sin esas dos cosas, la recuperación depende de la suerte.

### ¿Es obligatorio el certificado SSL?

En la práctica sí: los navegadores marcan como "no seguras" las webs sin HTTPS y Google lo usa como señal. Hoy se obtiene gratis.

## Infraestructura incluida en tu proyecto

En Websy el hosting, el SSL y la configuración de seguridad están incluidos en los proyectos de desarrollo web. Mira el servicio de [desarrollo web](/servicios/desarrollo-web) o [escríbenos](/contacto).
