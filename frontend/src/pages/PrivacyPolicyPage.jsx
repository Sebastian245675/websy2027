import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { CONTACT } from '../siteConfig';

const LAST_UPDATE = '5 de octubre de 2026';

const Section = ({ title, children }) => (
  <section className="mt-10">
    <h2 className="text-xl md:text-2xl font-black text-[#182A2C] tracking-tight mb-3">{title}</h2>
    <div className="space-y-3 text-base leading-relaxed text-gray-700">{children}</div>
  </section>
);

export const PrivacyPolicyPage = () => (
  <div className="bg-white pt-[120px] md:pt-[140px] pb-24">
    <SEOHead
      title="Política de privacidad | Websy"
      description="Cómo Websy recolecta, usa y protege los datos personales que dejás en websysrl.com."
      url="https://www.websysrl.com/politica-de-privacidad"
    />
    <article className="container mx-auto px-5 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-black text-[#182A2C] tracking-tight">Política de privacidad</h1>
      <p className="mt-3 text-sm text-gray-500">Última actualización: {LAST_UPDATE}</p>

      <Section title="Quiénes somos">
        <p>
          Websy es una agencia de desarrollo web y automatizaciones con base en {CONTACT.location}. Somos responsables de los datos
          personales que se recolectan a través de www.websysrl.com. Para cualquier consulta sobre esta política podés escribirnos
          a <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> o al WhatsApp {CONTACT.phoneDisplay}.
        </p>
      </Section>

      <Section title="Qué datos recolectamos">
        <p>Solo los que vos nos das al completar un formulario o escribirnos:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Nombre, email, teléfono o WhatsApp y país.</li>
          <li>Nombre de tu empresa, rubro y dirección de tu sitio web.</li>
          <li>El mensaje o la información del proyecto que nos cuentes.</li>
        </ul>
        <p>
          Además, al navegar el sitio se registran datos técnicos y de uso (páginas visitadas, tipo de dispositivo, origen de la visita)
          mediante cookies y herramientas de medición.
        </p>
      </Section>

      <Section title="Para qué los usamos">
        <ul className="list-disc pl-6 space-y-1">
          <li>Responder tu consulta, enviarte la auditoría o la cotización que pediste y hacer el seguimiento comercial.</li>
          <li>Medir qué páginas y anuncios funcionan, para mejorar el sitio y nuestras campañas.</li>
          <li>Mostrarte anuncios de Websy en otras plataformas si ya visitaste el sitio.</li>
        </ul>
        <p>No vendemos ni alquilamos tus datos a terceros.</p>
      </Section>

      <Section title="Cookies y herramientas de terceros">
        <p>Usamos estos servicios, que pueden instalar cookies o identificadores en tu navegador:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Analytics</strong>: estadísticas de visitas y conversiones.</li>
          <li><strong>Píxel de Meta</strong> (Facebook e Instagram) y <strong>píxel de TikTok</strong>: medición de anuncios y audiencias.</li>
          <li><strong>PostHog</strong>: análisis de uso del sitio.</li>
          <li><strong>Google Maps / Places</strong>: para mostrar nuestras reseñas de Google.</li>
        </ul>
        <p>Podés bloquear o borrar las cookies desde la configuración de tu navegador; el sitio va a seguir funcionando.</p>
      </Section>

      <Section title="Dónde se guardan">
        <p>
          Los datos de los formularios se guardan en servicios de Google Cloud (Firebase) y en nuestro sistema interno de gestión de
          clientes, y se nos notifican por email. Solo el equipo de Websy tiene acceso. Los conservamos mientras sean necesarios para
          atender tu consulta o la relación comercial, o hasta que nos pidas borrarlos.
        </p>
      </Section>

      <Section title="Tus derechos">
        <p>
          Podés pedir en cualquier momento acceder a tus datos, corregirlos, actualizarlos o eliminarlos escribiendo
          a <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Respondemos dentro de los plazos que fija la
          Ley N° 25.326 de Protección de Datos Personales.
        </p>
        <p>
          El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a
          intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el
          artículo 14, inciso 3 de la Ley N° 25.326.
        </p>
        <p>
          La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución
          de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las
          normas vigentes en materia de protección de datos personales.
        </p>
      </Section>

      <Section title="Cambios en esta política">
        <p>Si cambiamos esta política, vamos a publicar la nueva versión en esta misma página con su fecha de actualización.</p>
      </Section>
    </article>
  </div>
);
