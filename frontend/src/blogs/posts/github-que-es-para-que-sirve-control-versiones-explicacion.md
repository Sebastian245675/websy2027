**GitHub es una plataforma en línea donde se guarda el código de un proyecto usando Git, un sistema de control de versiones que registra cada cambio: quién lo hizo, cuándo y por qué, y permite volver a cualquier versión anterior.** Para una empresa que contrata desarrollo, tener el código en un repositorio de GitHub (o GitLab o Bitbucket) a nombre de la empresa significa ser dueña de su software, poder cambiar de proveedor y saber qué se hizo en cada momento.

En esta guía verás qué es Git y qué es GitHub, los conceptos básicos (repositorio, commit, rama, pull request), por qué te importa aunque no programes, cómo trabajar con un proveedor y buenas prácticas de seguridad.

## Git y GitHub no son lo mismo

| | Git | GitHub |
| --- | --- | --- |
| Qué es | Programa de control de versiones | Plataforma en línea que aloja repositorios Git |
| Dónde funciona | En la computadora de cada desarrollador | En la nube |
| Para qué | Registrar cambios y versiones | Compartir, colaborar, revisar código, automatizar |
| Alternativas | Prácticamente estándar | GitLab, Bitbucket |

## Conceptos básicos

| Concepto | Qué es | Analogía |
| --- | --- | --- |
| Repositorio | La carpeta del proyecto con todo su historial | El archivo completo de un expediente |
| Commit | Un cambio guardado con su descripción | Una entrada fechada en el expediente |
| Rama (branch) | Una línea de trabajo paralela | Un borrador separado del documento final |
| Pull request | Pedido para incorporar una rama a la principal, con revisión | Enviar el borrador para aprobación |
| Merge | Incorporar los cambios | Aprobar el borrador |

## Por qué te importa aunque no programes

- **Propiedad**: si el repositorio está a nombre de tu empresa, el código es tuyo y puedes cambiar de proveedor sin empezar de cero.
- **Historial**: puedes saber qué se cambió, cuándo y por quién.
- **Recuperación**: si un cambio rompe algo, se vuelve a la versión anterior.
- **Transparencia**: ves el avance real del proyecto.
- **Automatización**: con GitHub Actions, cada cambio puede probarse y publicarse automáticamente. Ver [qué es CI/CD](/blog/ci-cd-pipelines-github-actions-docker-deployment-web).

## Cómo trabajar con tu proveedor de desarrollo

1. **Crea una organización en GitHub a nombre de tu empresa** (o pide que la creen y te transfieran la propiedad).
2. **Invita al proveedor** como colaborador con los permisos necesarios.
3. **Pide que todo el código viva ahí** desde el primer día, no "al final del proyecto".
4. **Al terminar la relación**, quitas los accesos y el código queda contigo.

Es uno de los puntos que recomendamos revisar al elegir proveedor. Ver [cómo elegir una empresa de desarrollo de software](/blog/como-elegir-empresa-de-desarrollo-de-software-sin-ser-estafado).

## Flujo de trabajo habitual

1. El desarrollador crea una rama para una tarea.
2. Hace commits con los cambios.
3. Abre un pull request.
4. Otro desarrollador revisa y se ejecutan pruebas automáticas.
5. Se aprueba y se incorpora a la rama principal.
6. Se publica en producción, manual o automáticamente.

## Buenas prácticas de seguridad

- **Repositorios privados** para el código de la empresa.
- **Verificación en dos pasos** obligatoria para todos los miembros.
- **Nunca subir contraseñas ni claves** al repositorio: usar variables de entorno y secretos de GitHub.
- **Revisar accesos** periódicamente y quitar a quien ya no trabaja en el proyecto.
- **Proteger la rama principal**: cambios solo por pull request aprobado.
- **Alertas de dependencias vulnerables** activadas.

## Qué pedirle a tu proveedor sobre el repositorio

| Pedido | Por qué |
| --- | --- |
| El repositorio en una organización a nombre de tu empresa | Propiedad del código |
| Acceso de lectura para alguien de tu empresa | Transparencia y control |
| Commits con descripciones claras | Historial entendible |
| Un archivo README con cómo instalar y publicar | Que otro equipo pueda continuar |
| Sin contraseñas ni claves en el código | Seguridad |
| Ramas protegidas y revisión de cambios | Calidad |

## Preguntas frecuentes

### ¿Qué es GitHub en palabras simples?

Una plataforma en la nube donde se guarda el código de un proyecto con todo su historial de cambios, para colaborar y no perder ninguna versión.

### ¿GitHub es gratis?

Tiene planes gratuitos con repositorios privados ilimitados y planes pagos con más funciones para equipos y empresas.

### ¿Por qué el código debe estar a nombre de mi empresa?

Para que el software sea tuyo, puedas cambiar de proveedor y no dependas de que alguien te entregue una copia.

### ¿Qué diferencia hay entre Git y GitHub?

Git es el programa que registra versiones; GitHub es el servicio en línea donde se alojan los repositorios Git para colaborar.

## Tu código, a tu nombre

En Websy trabajamos con el código en repositorios de la empresa cliente desde el primer día. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web) o [escríbenos](/contacto).
