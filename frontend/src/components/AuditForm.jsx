import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { saveCotizacion, sendCotizacionEmail } from '../firebaseLazy';
import { COUNTRIES, RUBROS } from '../siteConfig';
import { trackFormSubmit } from '../lib/tracking';

const COPY = {
  vos: {
    noWeb: 'Todavía no tengo web',
    error: 'No pudimos enviar el pedido. Probá de nuevo o escribinos por WhatsApp.',
    required: 'Completá tu nombre, rubro y WhatsApp.',
  },
  tu: {
    noWeb: 'Todavía no tengo web',
    error: 'No pudimos enviar la solicitud. Intenta de nuevo o escríbenos por WhatsApp.',
    required: 'Completa tu nombre, giro y WhatsApp.',
  },
};

const emptyForm = (defaultCountry, defaultRubro) => ({
  name: '',
  website: '',
  noWebsite: false,
  rubro: defaultRubro || '',
  country: defaultCountry,
  whatsapp: '',
});

/**
 * Formulario de auditoría web gratuita (punto 2): web (opcional), rubro, WhatsApp con código de país.
 * tone: 'vos' (Argentina) | 'tu' (México / neutro). source: identifica el origen en el CRM y en los eventos.
 */
export const AuditForm = ({ tone = 'vos', defaultCountry = 'AR', defaultRubro = '', source = 'auditoria', dark = false }) => {
  const copy = COPY[tone];
  const [form, setForm] = useState(() => emptyForm(defaultCountry, defaultRubro));
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  const country = COUNTRIES.find((c) => c.code === form.country) || COUNTRIES[0];
  const rubroLabel = tone === 'tu' ? 'Giro de tu negocio' : 'Rubro de tu negocio';

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.rubro.trim() || !form.whatsapp.trim()) {
      setError(copy.required);
      return;
    }
    setError('');
    setStatus('sending');

    const phone = `${country.dial} ${form.whatsapp.trim()}`.trim();
    const website = form.noWebsite ? 'No tiene web' : (form.website.trim() || 'No indicó');
    const message = `Pedido de auditoría web gratuita.\nWeb: ${website}\nRubro: ${form.rubro}\nPaís: ${country.name}\nWhatsApp: ${phone}\nOrigen: ${source}`;
    const record = {
      name: form.name.trim(),
      email: 'No pedido (responder por WhatsApp)',
      phone,
      whatsapp: phone,
      country: country.name,
      website,
      rubro: form.rubro,
      projectType: 'Auditoría web gratuita',
      source,
      message,
    };

    try {
      const docId = await saveCotizacion(record);
      try {
        await sendCotizacionEmail({ cotizacionId: docId, ...record });
      } catch (fnErr) {
        console.error('Failed to send audit email notification:', fnErr);
      }
      try {
        await fetch('https://backend.websysrl.com/api/public/forms/websy-contacto-landing/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData: record }),
        });
      } catch (crmErr) {
        console.error('Failed to send audit to CRM:', crmErr);
      }
      trackFormSubmit(source);
      setStatus('done');
    } catch (err) {
      console.error('Error saving audit request:', err);
      setError(copy.error);
      setStatus('error');
    }
  };

  const labelCls = `block text-xs sm:text-sm font-semibold mb-1.5 ${dark ? 'text-gray-200' : 'text-[#182A2C]'}`;
  const inputCls = `w-full px-3 sm:px-4 py-3 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#d9fb06] ${
    dark ? 'bg-white/5 border-white/20 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-[#182A2C]'
  }`;

  if (status === 'done') {
    return (
      <div className={`rounded-xl p-8 text-center ${dark ? 'bg-white/5 border border-white/15' : 'bg-[#f8fafc] border border-gray-200'}`} role="status">
        <CheckCircle2 size={44} className="mx-auto mb-4 text-[#7a9400]" />
        <p className={`text-xl sm:text-2xl font-black mb-2 ${dark ? 'text-white' : 'text-[#182A2C]'}`}>
          ¡Listo, {form.name.trim().split(' ')[0]}!
        </p>
        <p className={`text-base ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
          Te mandamos por WhatsApp 3 mejoras concretas{form.noWebsite ? ' para empezar a vender online' : ' para tu web'}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor={`${source}-name`} className={labelCls}>Nombre *</label>
        <input id={`${source}-name`} name="name" value={form.name} onChange={update} className={inputCls} autoComplete="name" required />
      </div>

      <div>
        <label htmlFor={`${source}-website`} className={labelCls}>Dirección de tu web</label>
        <input
          id={`${source}-website`}
          name="website"
          value={form.noWebsite ? '' : form.website}
          onChange={update}
          disabled={form.noWebsite}
          placeholder="www.tunegocio.com"
          className={`${inputCls} disabled:opacity-50`}
          inputMode="url"
          autoComplete="url"
        />
        <label className={`mt-2 inline-flex items-center gap-2 text-sm cursor-pointer ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
          <input type="checkbox" name="noWebsite" checked={form.noWebsite} onChange={update} className="h-4 w-4 accent-[#182A2C]" />
          {copy.noWeb}
        </label>
      </div>

      <div>
        <label htmlFor={`${source}-rubro`} className={labelCls}>{rubroLabel} *</label>
        <input
          id={`${source}-rubro`}
          name="rubro"
          value={form.rubro}
          onChange={update}
          list={`${source}-rubros`}
          placeholder="Ej.: inmobiliaria, estudio jurídico, gastronomía"
          className={inputCls}
          required
        />
        <datalist id={`${source}-rubros`}>
          {RUBROS.map((r) => <option key={r} value={r} />)}
        </datalist>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4">
        <div>
          <label htmlFor={`${source}-country`} className={labelCls}>País *</label>
          <select id={`${source}-country`} name="country" value={form.country} onChange={update} className={inputCls}>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code} className="text-[#182A2C]">
                {c.name}{c.dial ? ` (${c.dial})` : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${source}-whatsapp`} className={labelCls}>WhatsApp *</label>
          <div className="flex">
            <span className={`flex items-center px-3 border border-r-0 rounded-l text-sm font-bold ${dark ? 'border-white/20 text-gray-200 bg-white/10' : 'border-gray-300 text-[#182A2C] bg-gray-50'}`}>
              {country.dial || '+'}
            </span>
            <input
              id={`${source}-whatsapp`}
              name="whatsapp"
              type="tel"
              value={form.whatsapp}
              onChange={update}
              placeholder={form.country === 'AR' ? '9 388 123-4567' : 'Número con código de área'}
              className={`${inputCls} rounded-l-none`}
              autoComplete="tel-national"
              required
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm font-semibold text-red-600" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 bg-[#d9fb06] hover:bg-[#c5e405] text-[#182A2C] font-black px-6 py-4 rounded text-sm uppercase tracking-[0.12em] transition-colors disabled:opacity-60"
      >
        <Send size={18} />
        {status === 'sending' ? 'Enviando...' : 'Quiero mi auditoría gratis'}
      </button>
      <p className={`text-xs text-center ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
        Te respondemos por WhatsApp con 3 mejoras concretas. Sin costo y sin compromiso.
      </p>
    </form>
  );
};
