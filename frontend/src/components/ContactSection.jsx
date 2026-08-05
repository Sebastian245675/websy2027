import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { saveCotizacion, sendCotizacionEmail } from '../firebase';

export const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
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
    try {
      const docId = await saveCotizacion({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        projectType: 'Quick Contact (Home)'
      });

      try {
        await sendCotizacionEmail({
          cotizacionId: docId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          projectType: 'Quick Contact (Home)',
          message: formData.message
        });
      } catch (fnErr) {
        console.error('Failed to send email notification:', fnErr);
      }

      alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error al enviar el mensaje.');
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
              Cada consulta que recibimos la tratamos con compromiso y detalle: entendemos tu empresa, tus metas y tus desafíos para brindarte la estrategia exacta que necesitas para crecer.
              <br /><br />
              Danos un mensaje y nosotros nos encargamos del resto.
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
                     <div className="flex items-center gap-3 pr-4 py-4">
                        {/* Placeholder Flag Icon */}
                        <div className="w-5 h-3 bg-gray-500 rounded-sm"></div>
                        <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">ARG (+54)</span>
                     </div>
                     <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+54"
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

        {/* Right Side: Image Overlay Area - Decreased to 30% */}
        <div className="w-full lg:w-[30%] relative min-h-[500px]">
          {/* Real Team Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="/contact_team.webp" 
              alt="Websy Team" 
              className="w-full h-full object-cover grayscale opacity-50"
            />
          </div>
          
          {/* VIBRANT CYAN OVERLAY - Restored as requested */}
          <div className="absolute inset-0 bg-[#35affb]/80 mix-blend-multiply transition-opacity duration-1000 group-hover:bg-[#35affb]/70"></div>
          
          {/* Subtle Soft Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 flex items-center justify-center p-12">
             {/* Pattern over the blue overlay */}
             <div className="w-full h-full border border-white/10 opacity-30 relative overflow-hidden pointer-events-none">
                {/* Zig Zag CSS Pattern */}
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
                  backgroundSize: '24px 24px' 
                }}></div>
                {/* Larger SVG Zig Zag */}
                <div className="absolute top-10 left-10 opacity-20">
                   <svg width="80" height="40" viewBox="0 0 80 40" stroke="white" strokeWidth="2" fill="none">
                     <path d="M0 20 L20 0 L40 20 L60 0 L80 20" />
                   </svg>
                </div>
                <div className="absolute bottom-10 right-10 opacity-20 rotate-180">
                   <svg width="80" height="40" viewBox="0 0 80 40" stroke="white" strokeWidth="2" fill="none">
                     <path d="M0 20 L20 0 L40 20 L60 0 L80 20" />
                   </svg>
                </div>
             </div>
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