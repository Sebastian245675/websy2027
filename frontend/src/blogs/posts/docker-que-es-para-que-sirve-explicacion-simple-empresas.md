**Docker es una herramienta que empaqueta una aplicación junto con todo lo que necesita para funcionar (versión del lenguaje, librerías, configuración) en un "contenedor", que se ejecuta igual en la computadora del desarrollador, en el servidor de pruebas y en producción.** Para una empresa, significa menos errores de "en mi computadora funcionaba", instalaciones repetibles, cambios de servidor más simples y la posibilidad de correr varios sistemas en el mismo servidor sin que se interfieran.

En esta guía verás qué es Docker explicado con una analogía, los conceptos básicos (imagen, contenedor, Dockerfile, Compose), para qué lo usa una empresa, ventajas y límites, y cuándo conviene.

## La analogía del contenedor de carga

Antes de los contenedores de carga estandarizados, cada mercadería se cargaba de forma distinta en cada barco. Con los contenedores, cualquier carga viaja en una caja estándar que todos los barcos, grúas y camiones saben mover. Docker hace lo mismo con el software: cualquier aplicación viaja en un contenedor estándar que cualquier servidor con Docker sabe ejecutar.

## Conceptos básicos

| Concepto | Qué es |
| --- | --- |
| Imagen | La "receta" empaquetada: el sistema base, el lenguaje, las librerías y tu aplicación |
| Contenedor | Una imagen en ejecución; puedes tener varios a partir de la misma imagen |
| Dockerfile | El archivo de texto con las instrucciones para construir la imagen |
| Docker Compose | Un archivo que define varios contenedores que trabajan juntos (aplicación, base de datos, caché) |
| Registro | Donde se guardan las imágenes para descargarlas en los servidores |

Un Dockerfile simple para una aplicación Node.js:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node", "server.js"]
```

Y un archivo de Docker Compose que levanta la aplicación junto con su base de datos:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:secreto@db:5432/app
    depends_on:
      - db
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secreto
    volumes:
      - datos:/var/lib/postgresql/data
volumes:
  datos:
```

En producción, las contraseñas van en variables de entorno o secretos, no escritas en el archivo.

## Contenedores vs máquinas virtuales

| | Contenedor | Máquina virtual |
| --- | --- | --- |
| Qué incluye | La aplicación y sus dependencias | Un sistema operativo completo |
| Peso | Liviano | Pesado |
| Arranque | Segundos | Minutos |
| Cantidad por servidor | Muchos | Pocas |
| Aislamiento | Bueno | Mayor |

## Para qué lo usa una empresa

- **Entornos idénticos**: desarrollo, pruebas y producción funcionan igual.
- **Instalaciones repetibles**: levantar un sistema completo en un servidor nuevo en minutos.
- **Varios sistemas en un servidor**: la web, el sistema de gestión y una herramienta como n8n, cada uno en su contenedor.
- **Actualizaciones más seguras**: se construye la imagen nueva, se prueba y se reemplaza; si falla, se vuelve a la anterior.
- **Despliegue automático**: los pipelines de CI/CD construyen y publican imágenes. Ver [qué es CI/CD](/blog/ci-cd-pipelines-github-actions-docker-deployment-web).

## Ventajas y límites

| Ventajas | Límites |
| --- | --- |
| Menos problemas de compatibilidad | Hay que aprender la herramienta |
| Despliegues rápidos y reversibles | Los datos persistentes (bases de datos) requieren configuración cuidadosa |
| Mejor uso de los servidores | Imágenes desactualizadas pueden acumular vulnerabilidades |
| Base para escalar con orquestadores | Para un sitio estático simple puede ser innecesario |

## ¿Lo necesita tu proyecto?

| Proyecto | ¿Docker? |
| --- | --- |
| Sitio en Vercel o Netlify | No: la plataforma se encarga |
| Sistema de gestión en un servidor propio | Sí, simplifica instalación y actualizaciones |
| Varias aplicaciones en el mismo servidor | Sí |
| Herramientas autoalojadas (n8n, por ejemplo) | Sí, es la forma habitual de instalarlas |
| Equipo de desarrollo de varias personas | Sí, para entornos iguales |

## Kubernetes y orquestadores

Cuando hay muchos contenedores en muchos servidores, un orquestador como Kubernetes los distribuye, reinicia los que fallan y escala según la demanda. Para la mayoría de las pymes es más de lo necesario: Docker Compose en un servidor o un servicio administrado de contenedores alcanza.

## Preguntas frecuentes

### ¿Qué es Docker en palabras simples?

Una herramienta que empaqueta una aplicación con todo lo que necesita en un contenedor, para que funcione igual en cualquier computadora o servidor.

### ¿Para qué sirve Docker en una empresa?

Para tener entornos idénticos, instalar sistemas de forma repetible, correr varias aplicaciones en un mismo servidor y desplegar actualizaciones más seguras.

### ¿Docker es gratis?

Docker Engine es de código abierto. Docker Desktop tiene condiciones de licencia para empresas según su tamaño; revisa las condiciones vigentes.

### ¿Docker reemplaza a una máquina virtual?

No exactamente: es más liviano y comparte el sistema operativo del servidor. Se usan para cosas distintas y a veces juntos.

## Infraestructura ordenada

En Websy usamos Docker para que los sistemas se instalen y actualicen de forma confiable. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
