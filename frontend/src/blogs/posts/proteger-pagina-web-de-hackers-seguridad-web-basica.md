**Para proteger una página web de hackers, lo que más impacto tiene es: mantener todo actualizado (sistema, CMS, plugins y librerías), usar contraseñas únicas con verificación en dos pasos en todos los accesos, tener copias de seguridad automáticas y probadas, usar HTTPS, poner un firewall o CDN con protección delante del sitio y dar a cada usuario solo los permisos que necesita.** La mayoría de los ataques a webs de pymes son automáticos: buscan versiones viejas y contraseñas débiles, no a tu empresa en particular.

En esta guía tienes cómo atacan realmente a las webs de pymes, las medidas de seguridad por prioridad, un plan específico para WordPress, qué hacer si tu web fue hackeada y un checklist mensual.

## Cómo atacan las webs de pymes

| Ataque | Cómo funciona | Prevención principal |
| --- | --- | --- |
| Explotación de versiones viejas | Robots buscan plugins o CMS con fallas conocidas | Actualizaciones al día |
| Robo o adivinación de contraseñas | Prueban combinaciones o usan contraseñas filtradas | Contraseñas únicas y verificación en dos pasos |
| Formularios vulnerables | Inyección de código en campos mal validados | Validación en el servidor, código seguro |
| Archivos subidos maliciosos | Se sube un archivo que ejecuta código | Restringir tipos de archivo y dónde se guardan |
| Spam y bots | Formularios llenados en masa, cuentas falsas | Protección anti-bots |
| Denegación de servicio | Tráfico masivo para tirar la web | CDN o firewall con protección |

## Medidas por prioridad

### Prioridad 1: lo que evita la mayoría de los incidentes

1. **Actualizaciones**: del CMS, plugins, temas, librerías y servidor. Activa las automáticas cuando sea seguro.
2. **Contraseñas y accesos**: únicas, largas, en un gestor de contraseñas, con verificación en dos pasos en el panel, el hosting, el dominio y el correo.
3. **Copias de seguridad**: automáticas, guardadas fuera del servidor y probadas restaurando.
4. **HTTPS** en todo el sitio. Ver [qué es un certificado SSL](/blog/certificado-ssl-https-que-es-por-que-es-obligatorio-web).

### Prioridad 2: protección activa

5. **Firewall o CDN con protección** (por ejemplo Cloudflare) para filtrar tráfico malicioso. Ver [qué es un CDN](/blog/cloudflare-vs-cloudfront-cdn-para-acelerar-y-proteger-tu-web).
6. **Límite de intentos de inicio de sesión** y protección anti-bots en formularios.
7. **Permisos mínimos**: cada persona con su usuario y solo los permisos que necesita; eliminar usuarios que ya no trabajan contigo.

### Prioridad 3: detección y respuesta

8. **Monitoreo**: alertas si la web se cae o cambia sin aviso.
9. **Registro de accesos** al panel y al servidor.
10. **Plan de respuesta**: quién hace qué si hay un incidente.

## WordPress: medidas específicas

WordPress es seguro si se mantiene; la mayoría de los problemas vienen de plugins y temas.

- Usa solo plugins y temas de fuentes oficiales, actualizados y con buena reputación. Elimina los que no usas.
- Nunca instales temas o plugins "nulled" (pirateados): suelen traer código malicioso.
- Cambia el usuario "admin" y protege el acceso al panel.
- Usa un hosting administrado con copias y escaneo de malware.

Si estás evaluando cambiar de tecnología, mira [React vs WordPress](/blog/desarrollo-web-react-vs-wordpress-guia-comparativa).

## Si tu web fue hackeada

1. **No borres nada todavía**: puede servir para entender qué pasó.
2. **Cambia todas las contraseñas** (panel, hosting, base de datos, correo, dominio) desde un equipo limpio.
3. **Restaura una copia de seguridad** limpia, anterior al ataque.
4. **Actualiza todo** y cierra la vía de entrada (el plugin vulnerable, el usuario comprometido).
5. **Revisa Google Search Console**: si Google detectó problemas de seguridad, pide la revisión cuando esté limpio.
6. **Avisa a los afectados** si hubo acceso a datos personales, según la ley de tu país.

## Checklist mensual

| Tarea | Hecho |
| --- | --- |
| Actualizaciones aplicadas | |
| Copia de seguridad reciente verificada | |
| Usuarios con acceso revisados | |
| Certificado SSL vigente | |
| Alertas de seguridad de Search Console revisadas | |
| Plugins o dependencias sin uso eliminados | |

## Preguntas frecuentes

### ¿Cómo proteger mi página web de hackers?

Con actualizaciones al día, contraseñas únicas y verificación en dos pasos, copias de seguridad automáticas y probadas, HTTPS, un firewall o CDN con protección y permisos mínimos.

### ¿Por qué hackearían la web de una pyme?

Casi siempre no es personal: robots automáticos buscan sitios con fallas conocidas para usarlos para spam, phishing o publicidad maliciosa.

### ¿WordPress es inseguro?

No, si se mantiene actualizado y se usan plugins y temas confiables. La mayoría de los hackeos de WordPress vienen de plugins viejos o pirateados.

### ¿Qué hago si me hackearon la web?

Cambia todas las contraseñas, restaura una copia limpia, actualiza todo, cierra la vía de entrada y revisa Search Console. Si hubo acceso a datos personales, cumple las obligaciones de aviso de tu país.

## Webs seguras desde el inicio

En Websy desarrollamos webs con seguridad, copias y actualizaciones previstas desde el diseño. Mira la [guía de hosting, seguridad y cloud](/blog/guia-hosting-seguridad-y-cloud-para-sitios-web), el [OWASP Top 10](/blog/ciberseguridad-web-owasp-top-10-como-proteger-tu-pagina-o-app) o [escríbenos](/contacto).
