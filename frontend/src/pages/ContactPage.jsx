import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { companyInfo } from '../mockData';
import { useLanguage } from '../LanguageContext';
import { SEOHead } from '../components/SEOHead';
// Use lazy Firebase loader - only loads Firebase when form is submitted
import { saveCotizacion, sendCotizacionEmail } from '../firebaseLazy';
import { AuditForm } from '../components/AuditForm';
import { trackFormSubmit } from '../lib/tracking';
import { whatsappUrl } from '../siteConfig';

// SVG icons inline
const SendIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const MapPinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const ContactPage = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  const initialPlan = searchParams.get('plan') || '';
  const initialBudget = searchParams.get('budget') || '';
  const initialType = searchParams.get('type') || '';
  const wantsAudit = searchParams.get('tipo') === 'auditoria' || /auditor/i.test(initialPlan);
  const [activeTab, setActiveTab] = useState(wantsAudit ? 'auditoria' : 'cotizacion');

  // Si ya estás en /contacto y llegás desde otro botón de auditoría, cambiar de pestaña
  useEffect(() => {
    if (wantsAudit) setActiveTab('auditoria');
  }, [wantsAudit]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: initialType || (initialPlan ? 'web' : ''),
    budget: initialBudget || '',
    message: initialPlan && !wantsAudit
      ? `¡Hola! Me interesa pedir presupuesto por el servicio/plan: ${initialPlan}.`
      : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message || !formData.projectType) {
      alert('Completá todos los campos obligatorios.');
      setIsSubmitting(false);
      return;
    }

    try {
      const docId = await saveCotizacion({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        projectType: formData.projectType,
        budget: formData.budget || null,
        message: formData.message
      });

      try {
        await sendCotizacionEmail({
          cotizacionId: docId,
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          projectType: formData.projectType,
          budget: formData.budget || null,
          message: formData.message
        });
      } catch (fnErr) {
        console.error('Failed to call sendCotizacionEmail function:', fnErr);
      }

      // ENVIAR A CRM WEBSY
      try {
        await fetch('https://backend.websysrl.com/api/public/forms/websy-contacto-landing/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formData: {
              name: formData.name,
              email: formData.email,
              company: formData.company,
              projectType: formData.projectType,
              budget: formData.budget,
              message: formData.message
            }
          })
        });
      } catch (crmErr) {
        console.error('Failed to send to CRM:', crmErr);
      }

      trackFormSubmit('contacto');
      alert('¡Gracias por tu consulta! Te contactamos en menos de 24 horas.');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: ''
      });
    } catch (err) {
      console.error('Error saving cotizacion:', err);
      alert('No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)', paddingTop: '68px' }}>
      <SEOHead
        title="Contacto y Cotización Gratuita | Websy"
        description="Solicitá una cotización personalizada sin compromiso en 24hs para tu proyecto de desarrollo web, app móvil o automatización con IA."
      />
      {/* Contact Form Section - Clean CGI Style */}
      <section id="contact-form" className="py-8 sm:py-12 md:py-24 lg:py-32" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#182A2C] tracking-tight mb-3">Hablemos de tu proyecto</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl">Pedí una auditoría gratuita de tu web o una cotización a medida. Respondemos en menos de 24 horas.</p>

            <div role="tablist" aria-label="Tipo de consulta" className="inline-flex flex-wrap gap-2 mb-8 sm:mb-10">
              {[
                { id: 'auditoria', label: 'Auditoría web gratuita' },
                { id: 'cotizacion', label: 'Pedir cotización' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-xs sm:text-sm font-black uppercase tracking-[0.12em] border-2 transition-colors ${
                    activeTab === tab.id ? 'bg-[#182A2C] border-[#182A2C] text-[#d9fb06]' : 'bg-white border-gray-200 text-[#182A2C] hover:border-[#182A2C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">

              {activeTab === 'auditoria' ? (
                <div id="auditoria">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Auditoría web gratuita
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Revisamos tu web (o tu negocio, si todavía no tenés) y te mandamos por WhatsApp 3 mejoras concretas para conseguir más clientes.
                  </p>
                  <AuditForm source="auditoria" />
                </div>
              ) : (
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {t('contact.requestQuote')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                        {t('contact.formLabels.nameRequired')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded text-sm sm:text-base"
                        style={{
                          backgroundColor: 'var(--bg-page)',
                          borderColor: 'var(--border-medium)',
                          color: 'var(--text-primary)'
                        }}
                        placeholder={t('contact.placeholders.fullName')}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                        {t('contact.formLabels.email')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded text-sm sm:text-base"
                        style={{
                          backgroundColor: 'var(--bg-page)',
                          borderColor: 'var(--border-medium)',
                          color: 'var(--text-primary)'
                        }}
                        placeholder={t('contact.placeholders.email')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('contact.formLabels.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded text-sm sm:text-base"
                      style={{
                        backgroundColor: 'var(--bg-page)',
                        borderColor: 'var(--border-medium)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder={t('contact.placeholders.companyName')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                        {t('contact.formLabels.projectType')}
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded text-sm sm:text-base"
                        style={{
                          backgroundColor: 'var(--bg-page)',
                          borderColor: 'var(--border-medium)',
                          color: 'var(--text-primary)'
                        }}
                        required
                      >
                        <option value="">{t('contact.selectOptions.select')}</option>
                        <option value="app">App</option>
                        <option value="web">Desarrollo Web</option>
                        <option value="custom">Sistema Personalizado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                        {t('contact.formLabels.budget')}
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded text-sm sm:text-base"
                        style={{
                          backgroundColor: 'var(--bg-page)',
                          borderColor: 'var(--border-medium)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <option value="">{t('contact.selectOptions.select')}</option>
                        <option value="0-50">{t('contact.budgetRanges.range1')}</option>
                        <option value="50-100">{t('contact.budgetRanges.range2')}</option>
                        <option value="100-200">{t('contact.budgetRanges.range3')}</option>
                        <option value="1500+">{t('contact.budgetRanges.range4')}</option>
                        <option value="a-cotizar">{t('contact.budgetRanges.aCotizar')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t('contact.formLabels.projectDescription')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded resize-none text-sm sm:text-base"
                      style={{
                        backgroundColor: 'var(--bg-page)',
                        borderColor: 'var(--border-medium)',
                        color: 'var(--text-primary)'
                      }}
                      rows="5"
                      placeholder={t('contact.placeholders.projectDetails')}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--brand-primary)',
                      color: '#000',
                      borderRadius: '4px'
                    }}
                  >
                    {isSubmitting ? 'Enviando...' : (
                      <>
                        <span className="sm:w-5 sm:h-5 inline-block mr-2"><SendIcon size={18} /></span>
                        Enviar Solicitud
                      </>
                    )}
                  </button>
                </form>
              </div>
              )}

              {/* Contact Information */}
              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {t('contact.contactInfo')}
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <span className="sm:w-6 sm:h-6 flex-shrink-0 inline-block" style={{ color: 'var(--brand-primary)', marginTop: '4px' }}>
                      <MapPinIcon size={20} />
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        Ubicación
                      </h3>
                      <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                        {companyInfo.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <span className="sm:w-6 sm:h-6 flex-shrink-0 inline-block" style={{ color: 'var(--brand-primary)', marginTop: '4px' }}>
                      <PhoneIcon size={20} />
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        Teléfono
                      </h3>
                      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-wa-location="contacto_datos" className="text-sm sm:text-base hover:underline" style={{ color: 'var(--text-secondary)' }}>
                        {companyInfo.phone} (WhatsApp)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <span className="sm:w-6 sm:h-6 flex-shrink-0 inline-block" style={{ color: 'var(--brand-primary)', marginTop: '4px' }}>
                      <MailIcon size={20} />
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        Email
                      </h3>
                      <a href={`mailto:${companyInfo.email}`} className="text-sm sm:text-base break-words hover:underline" style={{ color: 'var(--text-secondary)' }}>
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

