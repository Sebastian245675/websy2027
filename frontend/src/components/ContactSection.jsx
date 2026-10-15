import React, { useEffect, useState } from 'react';
import { saveCotizacion, sendCotizacionEmail } from '../firebase';
import { trackFormSubmit } from '../lib/tracking';
import { BUDGET_RANGES, CONTACT, CONTACT_PHOTO, COUNTRIES, PROJECT_NEEDS, whatsappUrl } from '../siteConfig';
import useVisitorCountry from '../hooks/useVisitorCountry';

const EMPTY = { name: '', phone: '', country: 'AR', need: '', budget: '' };

export const ContactSection = () => {
  const [formData, setFormData] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(null); // nombre y pedido de la última consulta enviada

  // El código de país del teléfono arranca en el país del visitante, si todavía no lo cambió
  const visitorCountry = useVisitorCountry();
  useEffect(() => {
    if (COUNTRIES.some((c) => c.code === visitorCountry && c.dial)) {
      setFormData((prev) => (prev.country === 'AR' && !prev.phone ? { ...prev, country: visitorCountry } : prev));
    }
  }, [visitorCountry]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dial = (COUNTRIES.find((c) => c.code === formData.country) || COUNTRIES[0]).dial;
    const phone = formData.phone ? `${dial} ${formData.phone}`.trim() : '';
    const message = `Necesita: ${formData.need} · Presupuesto aproximado: ${formData.budget} · Página: ${window.location.pathname}`;
    try {
      const docId = await saveCotizacion({
        name: formData.name,
        phone,
        email: '',
        message,
        projectType: formData.need,
        budget: formData.budget,
      });

      try {
        // La función de aviso (functions/index.js) exige email: el formulario ya no lo pide, va el WhatsApp
        await sendCotizacionEmail({
          cotizacionId: docId,
          name: formData.name,
          phone,
          email: `Sin email · WhatsApp ${phone}`,
          projectType: formData.need,
          budget: formData.budget,
          message
        });
      } catch (fnErr) {
        console.error('Failed to send email notification:', fnErr);
      }

      // ENVIAR A CRM WEBSY
      try {
        await fetch('https://backend.websysrl.com/api/public/forms/websy-contacto-landing/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formData: {
              name: formData.name,
              email: '',
              phone,
              message
            }
          })
        });
      } catch (crmErr) {
        console.error('Failed to send to CRM:', crmErr);
      }

      trackFormSubmit('contacto_rapido');
      setSent({ name: formData.name.split(' ')[0], need: formData.need, budget: formData.budget });
      setFormData(EMPTY);
    } catch (err) {
      console.error(err);
      alert('No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectCls = 'w-full bg-transparent border-b border-gray-600 py-4 text-lg focus:outline-none focus:border-[#d9fb06] transition-all duration-300 cursor-pointer';

  return (
    <section id="contacto" className="relative bg-[#1a1a1a] overflow-hidden">
      {/* Precision Top Divider - Matches the "Inverse V / Angle" in the image */}
      <div className="absolute -top-[2px] left-0 w-full h-24 bg-[#eeeeef] clip-path-v-peak z-20"></div>
      
      <div className="flex flex-col lg:flex-row min-h-[900px] relative z-10">
        
        {/* Left Side: Dark Form Area - Increased to 70% as requested */}
        <div className="w-full lg:w-[70%] px-6 md:px-16 lg:px-24 py-32 md:py-48 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <span className="text-[#182A2C] font-black tracking-[0.3em] uppercase text-[10px] mb-8 block bg-[#d9fb06] w-fit px-2 py-1">
              CONTACTO RÁPIDO
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-white leading-[1.1] mb-10 tracking-tight">
              Tu negocio está a un mensaje de transformarse
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-loose mb-16 max-w-xl font-medium opacity-80">
              Cada consulta que recibimos la tratamos con compromiso y detalle: entendemos tu empresa, tus metas y tus desafíos para darte la estrategia exacta que necesitás para crecer.
              <br /><br />
              Dejanos un mensaje y nosotros nos encargamos del resto.
            </p>

            {sent ? (
              <div className="border border-[#d9fb06]/40 p-8 md:p-10" role="status">
                <p className="text-[#d9fb06] font-black uppercase tracking-[0.2em] text-[11px] mb-4">Consulta recibida</p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-6">Gracias{sent.name ? `, ${sent.name}` : ''}. Esto es lo que sigue:</h3>
                <ol className="space-y-3 text-gray-300 text-base mb-8 list-decimal list-inside">
                  <li>Te escribimos por WhatsApp en el día hábil para entender tu proyecto.</li>
                  <li>Si hace falta, coordinamos una videollamada de 20 minutos.</li>
                  <li>Te enviamos la propuesta con precio cerrado y plazo por escrito.</li>
                </ol>
                <a
                  href={whatsappUrl(`Hola! Acabo de dejar mis datos en la web. Necesito: ${sent.need}. Presupuesto aproximado: ${sent.budget}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-location="inicio_gracias"
                  className="inline-block bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black py-4 px-8 uppercase tracking-[0.15em] text-[11px]"
                >
                  ¿Apurado? Escribinos ahora por WhatsApp
                </a>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="* Nombre"
                  autoComplete="name"
                  className="w-full bg-transparent border-b border-gray-600 py-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-[#d9fb06] transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <div className="flex items-center border-b border-gray-600 focus-within:border-[#d9fb06] transition-all duration-300">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    aria-label="País"
                    className="bg-transparent pr-2 py-4 text-[11px] font-bold text-gray-300 uppercase tracking-widest focus:outline-none cursor-pointer"
                  >
                    {COUNTRIES.filter((c) => c.dial).map((c) => (
                      <option key={c.code} value={c.code} className="text-[#182A2C] normal-case">{c.code} ({c.dial})</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="* WhatsApp"
                    autoComplete="tel-national"
                    className="w-full bg-transparent py-4 text-white text-lg placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <select name="need" value={formData.need} onChange={handleChange} required aria-label="Qué necesitás"
                    className={`${selectCls} ${formData.need ? 'text-white' : 'text-gray-400'}`}>
                    <option value="" disabled>* ¿Qué necesitás?</option>
                    {PROJECT_NEEDS.map((n) => <option key={n} value={n} className="text-[#182A2C]">{n}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <select name="budget" value={formData.budget} onChange={handleChange} required aria-label="Presupuesto aproximado"
                    className={`${selectCls} ${formData.budget ? 'text-white' : 'text-gray-400'}`}>
                    <option value="" disabled>* Presupuesto aproximado</option>
                    {BUDGET_RANGES.map((b) => <option key={b} value={b} className="text-[#182A2C]">{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black py-4 px-12 transition-all duration-500 uppercase tracking-[0.2em] text-[11px] shadow-2xl relative overflow-hidden group"
                >
                  <span className="relative z-10">{isSubmitting ? 'ENVIANDO...' : 'PEDIR PROPUESTA'}</span>
                  <div className="absolute inset-0 bg-[#182A2C] transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
                <p className="mt-4 text-xs text-gray-500">Te respondemos por WhatsApp en el día hábil. Sin compromiso.</p>
              </div>
            </form>
            )}
          </div>
        </div>

        {/* Right Side: real photo of the team once available (siteConfig.CONTACT_PHOTO), otherwise direct contact data */}
        <div className="w-full lg:w-[30%] relative min-h-[420px] bg-[#35affb]/80">
          {CONTACT_PHOTO && (
            <>
              <img src={CONTACT_PHOTO} alt="Equipo de Websy" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/85 via-[#1a1a1a]/20 to-transparent" />
            </>
          )}
          {!CONTACT_PHOTO && (
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }} />
          )}
          <div className="relative h-full flex flex-col justify-end p-10 lg:p-12 lg:pb-48 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-white/80">Contacto directo</p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-wa-location="inicio_contacto" className="block text-2xl font-black tracking-tight mb-1 hover:underline">
              {CONTACT.phoneDisplay}
            </a>
            <p className="text-sm text-white/80 mb-6">WhatsApp · respondemos en el día hábil</p>
            <a href={`mailto:${CONTACT.email}`} className="block text-lg font-bold mb-1 break-words hover:underline">{CONTACT.email}</a>
            <p className="text-sm text-white/80">{CONTACT.location}</p>
          </div>
        </div>
      </div>

      <style>{`
        /* Dynamic "Inverse V" Clip Path for the top section boundary */
        .clip-path-v-peak {
          clip-path: polygon(0 0, 100% 0, 100% 15%, 50% 100%, 0 15%);
        }
        @media (min-width: 1024px) {
          .clip-path-v-peak {
            clip-path: polygon(0 0, 100% 0, 100% 45%, 50% 100%, 0 45%);
          }
        }
      `}</style>
    </section>
  );
};