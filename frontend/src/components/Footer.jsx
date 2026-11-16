import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { CONTACT, contactForPath, SOCIAL, whatsappUrl } from '../siteConfig';
import { countryPages } from '../countryPages';
import { cityPages } from '../cityPages';
import { saveCountry } from '../lib/geo';
import { isArgentinaView, withArgentina } from '../lib/argentinaView';

const COUNTRY_LINKS = countryPages.map(({ code, name, path }) => ({ code, name, path }));

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
  const { t, currentLanguage } = useLanguage();
  const { pathname, search } = useLocation();
  const regionalContact = contactForPath(pathname);
  const currentYear = new Date().getFullYear();

  const regionalContent = pathname.startsWith('/colombia')
    ? {
        description: 'Diseño y desarrollo web, software y automatización para empresas de Colombia. Trabajo remoto, precios en COP y casos reales.',
        address: 'Sede administrativa: Salta, Argentina',
      }
    : pathname.startsWith('/mexico')
      ? {
          description: 'Diseño y desarrollo web, sistemas y automatización para empresas de México. Trabajo remoto, precios en MXN y un caso multisucursal real.',
          address: 'Sede administrativa: Salta, Argentina',
        }
      : pathname.startsWith('/estados-unidos')
        ? {
            description: currentLanguage === 'en'
              ? 'Bilingual websites and lead automation for businesses in the United States. Remote service in English and Spanish.'
              : 'Páginas web bilingües y automatización de consultas para negocios de Estados Unidos. Atención remota en español e inglés.',
            address: currentLanguage === 'en' ? 'Administrative office: Salta, Argentina' : 'Sede administrativa: Salta, Argentina',
          }
        : null;

  const siteLinks = [
    { name: t('footer.links.services'), to: '/servicios' },
    { name: t('footer.links.cases'), to: '/casos-de-exito' },
    { name: t('footer.links.investment'), to: '/planes' },
    { name: t('footer.links.about'), to: '/quienes-somos' },
    { name: t('footer.links.quote'), to: '/cotizador' },
    { name: t('footer.links.audit'), to: '/auditoria-gratis' },
    { name: t('footer.links.blog'), to: '/blog' },
    { name: t('footer.links.salta'), to: '/diseno-web-salta' },
    { name: t('footer.links.contact'), to: '/contacto' },
  ];

  const headingCls = 'text-sm font-semibold mb-3 text-[#333]';
  const linkCls = 'text-xs hover:underline transition-colors text-[#666] leading-[1.5]';

  // Versión Argentina: pie mínimo de un solo color, con los mismos apartados del menú de arriba
  if (isArgentinaView(pathname, search)) {
    const en = currentLanguage === 'en';
    const arLinks = [
      { name: t('nav.home'), to: '/argentina' },
      { name: en ? 'Products' : 'Productos', to: '/argentina#productos' },
      { name: t('nav.portfolio'), to: withArgentina('/casos-de-exito') },
      { name: 'Blog', to: withArgentina('/blog') },
      { name: t('nav.contact'), to: '/argentina#plan' },
    ];
    return (
      <footer className="bg-[#182A2C] text-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <div className="text-xl font-black uppercase tracking-tighter">Websy</div>
            <p className="mt-2 text-sm text-white/70 max-w-xs">
              {en ? 'Argentina · 100% online service' : 'Argentina · Atención 100 % en línea'} · {CONTACT.phoneDisplay}
            </p>
          </div>
          <nav aria-label={t('footer.sitemap')}>
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
              {arLinks.map((item) => (
                <li key={item.to}><Link to={item.to} className="text-white/80 hover:text-[#d9fb06] transition-colors">{item.name}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-white/10">
          <p className="container mx-auto px-6 md:px-10 lg:px-14 py-5 text-[10px] uppercase font-black tracking-widest text-white/40">
            © {currentYear} {t('footer.copyright')} · <Link to="/politica-de-privacidad" className="hover:text-white">{t('footer.links.privacy')}</Link>
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#f5f5f5] border-t border-[#e0e0e0]">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand + WhatsApp */}
        <div className="bg-[#182A2C] px-6 py-10 md:px-10 lg:px-14">
          <div className="text-xl font-black uppercase tracking-tighter text-white">Websy</div>
          <p className="mt-2 text-sm text-white/70 max-w-xs">{regionalContent?.description || t('footer.description')}</p>

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
            <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-wa-location="pie_telefono" className={linkCls}>{regionalContact.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className={linkCls}>{CONTACT.email}</a></li>
            <li><Link to="/diseno-web-salta" className={linkCls}>{regionalContent?.address || CONTACT.address}</Link></li>
          </ul>
          {/* Enlace a cada página de ciudad desde todo el sitio: sin esto Google tardaba semanas en encontrarlas */}
          <h4 className={`${headingCls} mt-8`}>Diseño web por ciudad</h4>
          <ul className="space-y-2">
            {cityPages.map((c) => (
              <li key={c.slug}><Link to={c.path} className={linkCls}>{c.breadcrumb}</Link></li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="bg-white md:bg-transparent px-6 pb-10 md:py-10">
          <h4 className={headingCls}>{t('footer.legalTitle')}</h4>
          <ul className="space-y-2">
            <li><Link to="/politica-de-privacidad" className={linkCls}>{t('footer.links.privacy')}</Link></li>
          </ul>
          {/* Selector de país: guarda la elección, así el inicio deja de llevar a la versión detectada */}
          <h4 className={`${headingCls} mt-8`}>{t('footer.chooseCountry')}</h4>
          <ul className="space-y-2">
            {COUNTRY_LINKS.map((c) => (
              <li key={c.code}><Link to={c.path} onClick={() => saveCountry(c.code)} className={linkCls}>{c.name}</Link></li>
            ))}
          </ul>
          <p className="mt-8 text-[10px] uppercase font-black tracking-widest text-[#182A2C]/50">
            © {currentYear} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
