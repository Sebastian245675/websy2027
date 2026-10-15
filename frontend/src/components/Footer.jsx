import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { CONTACT, SOCIAL, whatsappUrl } from '../siteConfig';
import { countryPages } from '../countryPages';

// SVG icons inline
const icons = {
  Instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  TikTok: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.25-1.33 2.1-.04.7.06 1.42.45 2.01.39.73 1.15 1.19 1.98 1.25 1.32.1 2.59-.88 2.89-2.1.02-.31.01-.62.01-.93V.02z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const siteLinks = [
    { name: t('footer.links.services'), to: '/servicios' },
    { name: t('footer.links.cases'), to: '/casos-de-exito' },
    { name: t('footer.links.investment'), to: '/planes' },
    { name: 'Quiénes somos', to: '/quienes-somos' },
    { name: 'Cotizador', to: '/cotizador' },
    { name: 'Auditoría web gratis', to: '/auditoria-gratis' },
    { name: t('footer.links.blog'), to: '/blog' },
    { name: 'Diseño web en Salta', to: '/diseno-web-salta' },
    ...countryPages.map((c) => ({ name: `Websy ${c.code === 'US' ? 'EE. UU.' : c.name}`, to: c.path })),
    { name: t('footer.links.contact'), to: '/contacto' },
  ];

  const headingCls = 'text-sm font-semibold mb-3 text-[#333]';
  const linkCls = 'text-xs hover:underline transition-colors text-[#666] leading-[1.5]';

  return (
    <footer className="bg-[#f5f5f5] border-t border-[#e0e0e0]">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand + WhatsApp */}
        <div className="bg-[#182A2C] px-6 py-10 md:px-10 lg:px-14">
          <div className="text-xl font-black uppercase tracking-tighter text-white">Websy</div>
          <p className="mt-2 text-sm text-white/70 max-w-xs">{t('footer.description')}</p>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-wa-location="pie"
            className="mt-6 inline-flex items-center justify-center py-3 px-5 rounded-lg font-black text-xs uppercase tracking-widest bg-[#d9fb06] text-[#182A2C] hover:bg-white transition-colors"
          >
            {t('footer.whatsappCta')}
          </a>

          <p className="mt-8 mb-3 text-xs font-bold uppercase tracking-widest text-white/60">{t('footer.followUs')}</p>
          <div className="flex gap-4">
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} de Websy`} className="text-white hover:text-[#d9fb06] transition-colors">
                {icons[s.name]}
              </a>
            ))}
          </div>
        </div>

        {/* Site links */}
        <div className="bg-white md:bg-transparent px-6 py-8 md:py-10">
          <h4 className={headingCls}>{t('footer.sitemap')}</h4>
          <ul className="space-y-2">
            {siteLinks.map((item) => (
              <li key={item.to}><Link to={item.to} className={linkCls}>{item.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact data */}
        <div className="bg-white md:bg-transparent px-6 pb-8 md:py-10">
          <h4 className={headingCls}>{t('footer.contactTitle')}</h4>
          <ul className="space-y-2">
            <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-wa-location="pie_telefono" className={linkCls}>{CONTACT.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className={linkCls}>{CONTACT.email}</a></li>
            <li><Link to="/diseno-web-salta" className={linkCls}>{CONTACT.address}</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="bg-white md:bg-transparent px-6 pb-10 md:py-10">
          <h4 className={headingCls}>{t('footer.legalTitle')}</h4>
          <ul className="space-y-2">
            <li><Link to="/politica-de-privacidad" className={linkCls}>{t('footer.links.privacy')}</Link></li>
          </ul>
          <p className="mt-8 text-[10px] uppercase font-black tracking-widest text-[#182A2C]/50">
            © {currentYear} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
