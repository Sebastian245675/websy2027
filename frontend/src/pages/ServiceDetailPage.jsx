import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { servicesData } from '../servicesSeoData';

// Inline SVG icons
const FiCheck = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const FiArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const FiChevronDown = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
);
const FiChevronUp = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
);

const FAQItem = ({ question, answer, isOpen, toggle }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between py-5 px-1 text-left hover:bg-gray-50/50 transition-colors"
    >
      <span className="text-base md:text-lg font-bold text-[#182A2C] pr-4">{question}</span>
      {isOpen ? <FiChevronUp className="text-[#d9fb06] shrink-0" size={20} /> : <FiChevronDown className="text-gray-400 shrink-0" size={20} />}
    </button>
    {isOpen && (
      <div className="pb-5 px-1 text-gray-600 leading-relaxed text-base animate-fadeIn">
        {answer}
      </div>
    )}
  </div>
);

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = servicesData[slug];
  const [openFaq, setOpenFaq] = React.useState(0);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-[100px]">
        <SEOHead title="Servicio no encontrado | Websy" noindex breadcrumbs={false} />
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#182A2C] mb-4">Servicio no encontrado</h1>
          <Link to="/servicios" className="text-[#d9fb06] bg-[#182A2C] px-6 py-3 font-bold">
            Ver todos los servicios
          </Link>
        </div>
      </div>
    );
  }

  const IconComp = service.icon;

  // Build FAQ schema for this page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.seoDescription,
    "provider": {
      "@type": "Organization",
      "name": "Websy",
      "url": "https://www.websysrl.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Argentina"
    },
    "serviceType": service.title
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.websysrl.com/" },
      { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://www.websysrl.com/servicios" },
      { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://www.websysrl.com/servicios/${service.slug}` }
    ]
  };

  const relatedServices = service.relatedServices
    .map(s => servicesData[s])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white" style={{ overflowX: 'hidden' }}>
      <SEOHead
        title={service.seoTitle}
        description={service.seoDescription}
        url={`https://www.websysrl.com/servicios/${service.slug}`}
        breadcrumbs={false}
      />

      {/* Inject schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section */}
      <section className="relative pt-[100px] md:pt-[120px] pb-16 md:pb-24 bg-[#182A2C] overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${service.color}40, transparent)` }} />
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, ${service.color}20, transparent)` }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link to="/servicios" className="hover:text-white transition-colors">Servicios</Link>
            <span className="opacity-30">/</span>
            <span className="text-white">{service.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${service.color}30` }}>
                  <IconComp size={16} style={{ color: service.color }} />
                </div>
                <span className="text-sm font-bold text-white/80">{service.priceRange}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] mb-6">
                {service.heroTitle} <br />
                <span className="px-2 py-1" style={{ backgroundColor: service.color, color: '#182A2C' }}>
                  {service.heroHighlight}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-8">
                {service.heroSubtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate(`/contacto?type=${service.slug}`)}
                  className="group flex items-center gap-2 text-[#182A2C] font-black text-sm uppercase tracking-[0.15em] px-8 py-4 transition-all hover:scale-105"
                  style={{ backgroundColor: service.color }}
                >
                  {service.ctaText}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="https://wa.me/5493884846695"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-2 border-white/20 text-white font-bold text-sm uppercase tracking-[0.15em] px-8 py-4 hover:bg-white/10 transition-all"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="w-full lg:w-auto lg:min-w-[320px]">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Incluye</h3>
                <ul className="space-y-3">
                  {service.features.slice(0, 6).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/90">
                      <FiCheck className="shrink-0 mt-1" style={{ color: service.color }} size={16} />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#182A2C] mb-8 leading-tight">
            ¿Por qué elegir <span className="bg-[#d9fb06] px-2">Websy</span> para {service.title.toLowerCase()}?
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            {service.description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-base md:text-lg">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-16 md:py-20 bg-[#f9fafb]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-black text-[#182A2C] mb-10 text-center">
            Todo lo que incluye nuestro servicio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-[#d9fb06] hover:shadow-md transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${service.color}20` }}>
                  <FiCheck size={12} style={{ color: service.color }} />
                </div>
                <span className="text-sm font-semibold text-[#182A2C]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">Tecnologías que utilizamos</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {service.technologies.map((tech, i) => (
              <span
                key={i}
                className="bg-[#182A2C] text-white px-4 py-2 text-xs font-bold tracking-wider rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#182A2C] mb-2 text-center">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Resolvé tus dudas sobre {service.title.toLowerCase()}
          </p>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
            {service.faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 md:py-20 bg-[#f9fafb]">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-black text-[#182A2C] mb-8 text-center">
              Servicios Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map(rs => {
                const RSIcon = rs.icon;
                return (
                  <Link
                    key={rs.slug}
                    to={`/servicios/${rs.slug}`}
                    className="group bg-white rounded-xl border border-gray-100 p-6 hover:border-[#d9fb06] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${rs.color}20` }}>
                      <RSIcon size={20} style={{ color: rs.color }} />
                    </div>
                    <h3 className="text-lg font-black text-[#182A2C] mb-2 group-hover:text-[#182A2C]">{rs.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{rs.seoDescription}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold mt-4 uppercase tracking-wider group-hover:gap-2 transition-all" style={{ color: rs.color }}>
                      Ver más <FiArrowRight size={12} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#182A2C]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Contactanos y recibí una cotización gratuita en menos de 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(`/contacto?type=${service.slug}`)}
              className="font-black text-sm uppercase tracking-[0.15em] px-10 py-5 transition-all hover:scale-105"
              style={{ backgroundColor: service.color, color: '#182A2C' }}
            >
              {service.ctaText}
            </button>
            <a
              href="https://wa.me/5493884846695"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/20 text-white font-black text-sm uppercase tracking-[0.15em] px-10 py-5 hover:bg-white/10 transition-all text-center"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
