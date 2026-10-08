**CI/CD (integración continua y entrega o despliegue continuo) es la práctica de automatizar el camino del código desde que un desarrollador lo guarda hasta que llega a producción: cada cambio se compila y se prueba automáticamente (CI) y, si pasa las pruebas, se publica en un entorno de prueba o directamente en producción (CD).** Reduce errores humanos en las publicaciones, permite publicar cambios chicos con frecuencia y detecta problemas antes de que los vean los clientes.

En esta guía verás qué es cada parte, cómo se arma un pipeline típico, un ejemplo con GitHub Actions, qué pruebas conviene automatizar y cómo empezar en un proyecto chico.

## CI y CD por separado

| Parte | Qué hace | Beneficio |
| --- | --- | --- |
| Integración continua (CI) | Con cada cambio, compila y ejecuta pruebas | Detecta errores enseguida, antes de mezclarlos con el resto |
| Entrega continua | Deja cada versión lista para publicar con un clic | Publicaciones predecibles |
| Despliegue continuo | Publica automáticamente cada cambio que pasa las pruebas | Mejoras en producción en minutos |

## Pipeline típico

1. El desarrollador sube un cambio al repositorio (por ejemplo, abre un pull request).
2. Se instalan dependencias y se compila el proyecto.
3. Se ejecutan verificaciones: formato, análisis estático, pruebas automáticas.
4. Se construye el artefacto (el sitio compilado o una imagen Docker).
5. Se publica en un entorno de prueba con una URL para revisar.
6. Al aprobarse, se publica en producción.
7. Se ejecutan verificaciones después del despliegue y, si fallan, se vuelve a la versión anterior.

## Ejemplo con GitHub Actions

Un flujo simple que compila y prueba en cada pull request:

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
```

Las claves y contraseñas para publicar se guardan como secretos del repositorio, nunca en el archivo.

## Qué automatizar primero

| Verificación | Qué detecta | Costo de implementarla |
| --- | --- | --- |
| Compilación | Errores que rompen el proyecto | Bajo |
| Linter y formato | Errores comunes y estilo inconsistente | Bajo |
| Pruebas unitarias | Funciones que dejan de dar el resultado esperado | Medio |
| Pruebas de integración | Partes que dejan de funcionar juntas | Medio |
| Pruebas de punta a punta | Flujos completos (registro, compra) | Mayor |
| Verificaciones de SEO y enlaces | Canonical, redirecciones, enlaces rotos | Bajo a medio |
| Análisis de dependencias | Librerías con vulnerabilidades conocidas | Bajo |

En sitios web, una verificación automática de que cada página responde 200, tiene su canonical correcta y no tiene enlaces rotos evita muchos problemas de posicionamiento después de una publicación.

## Herramientas habituales

| Herramienta | Comentario |
| --- | --- |
| GitHub Actions | Integrada a GitHub, con plan gratuito |
| GitLab CI | Integrada a GitLab |
| Plataformas como Vercel o Netlify | Despliegan automáticamente cada cambio y crean vistas previas |
| Docker | Empaqueta la aplicación para desplegarla igual en cualquier servidor. Ver [qué es Docker](/blog/docker-que-es-para-que-sirve-explicacion-simple-empresas) |

## Cómo empezar en un proyecto chico

1. Código en un repositorio. Ver [qué es GitHub](/blog/github-que-es-para-que-sirve-control-versiones-explicacion).
2. Un pipeline que compile en cada cambio.
3. Despliegue automático a un entorno de prueba.
4. Sumar pruebas de a poco, empezando por los flujos críticos (cobro, registro, formulario de contacto).
5. Despliegue a producción con aprobación manual al principio.

## Errores comunes

- **Pipelines lentos** que nadie espera y se terminan salteando: optimiza con caché de dependencias.
- **Pruebas que fallan al azar** y se ignoran: una prueba inestable es peor que ninguna.
- **Secretos expuestos** en los registros del pipeline.
- **Desplegar sin poder volver atrás**: siempre conservar la versión anterior lista.
- **Automatizar la publicación sin pruebas**: se publica más rápido, pero también los errores.

## Preguntas frecuentes

### ¿Qué es CI/CD?

La automatización del camino del código: cada cambio se compila y se prueba automáticamente (CI) y se publica en prueba o en producción si pasa las verificaciones (CD).

### ¿Para qué sirve en una empresa?

Para publicar cambios con menos errores, con más frecuencia y con la posibilidad de volver atrás rápido si algo falla.

### ¿GitHub Actions es gratis?

Tiene minutos gratuitos mensuales para repositorios privados y es gratuito para repositorios públicos, con planes pagos para más uso.

### ¿Un proyecto chico necesita CI/CD?

Una versión simple, sí: compilar y desplegar automáticamente ya evita errores. Las pruebas se suman a medida que el proyecto crece.

## Publicaciones seguras

En Websy trabajamos con despliegues automáticos y verificaciones de cada publicación. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
