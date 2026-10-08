import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { saveCotizacion, sendCotizacionEmail } from '../firebase';
import { trackFormSubmit } from '../lib/tracking';
import { CONTACT, CONTACT_PHOTO, COUNTRIES, whatsappUrl } from '../siteConfig';

export const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: 'AR',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dial = (COUNTRIES.find((c) => c.code === formData.country) || COUNTRIES[0]).dial;
    const phone = formData.phone ? `${dial} ${formData.phone}`.trim() : '';
    try {
      const docId = await saveCotizacion({
        name: formData.name,
        phone,
        email: formData.email,
        message: formData.message,
        projectType: 'Quick Contact (Home)'
      });

      try {
        await sendCotizacionEmail({
          cotizacionId: docId,
          name: formData.name,
          phone,
          email: formData.email,
          projectType: 'Quick Contact (Home)',
          message: formData.message
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
              email: formData.email,
              phone,
              message: formData.message
            }
          })
        });
      } catch (crmErr) {
        console.error('Failed to send to CRM:', crmErr);
      }

      trackFormSubmit('contacto_rapido');
      alert('¡Mensaje enviado! Te contactamos en menos de 24 horas.');
      setFormData({ name: '', phone: '', country: 'AR', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Field 1: Name */}
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="* Nombre Completo"
                  className="w-full bg-transparent border-b border-gray-600 py-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-[#d9fb06] transition-all duration-300"
                />
              </div>

              {/* Row: Phone and Email */}
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 relative group">
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
                      placeholder="WhatsApp"
                      className="w-full bg-transparent py-4 text-white text-lg placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1 relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="* Email"
                    className="w-full bg-transparent border-b border-gray-600 py-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-[#d9fb06] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Field: Message */}
              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="* Mensaje"
                  rows="1"
                  className="w-full bg-transparent border-b border-gray-600 py-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-[#d9fb06] transition-all duration-300 resize-none min-h-[40px]"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black py-4 px-12 transition-all duration-500 uppercase tracking-[0.2em] text-[11px] shadow-2xl relative overflow-hidden group"
                >
                  <span className="relative z-10">{isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}</span>
                  <div className="absolute inset-0 bg-[#182A2C] transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              </div>
            </form>
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
            <p className="text-sm text-white/80 mb-6">WhatsApp · respondemos en menos de 24 horas</p>
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