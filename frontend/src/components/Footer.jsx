import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

// SVG icons inline
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0', paddingTop: '0', paddingBottom: isMobile ? '0' : '2rem' }}>
      <div className="flex flex-col md:block">
        {/* Mobile Layout - Two columns */}
        <div className="grid grid-cols-2 md:hidden">
          {/* Left Column - Dark Navy background */}
          <div style={{ backgroundColor: '#182A2C', padding: '2rem 1.5rem' }}>
            <h3 className="text-base font-bold mb-2 uppercase tracking-tighter" style={{ color: '#ffffff' }}>
              {t('footer.discoverMore')}
            </h3>
            <p className="text-sm mb-4 opacity-70" style={{ color: '#ffffff' }}>
              {t('footer.stayInformed')}
            </p>
            <button
              className="w-full py-3 px-4 rounded-lg font-black text-sm transition-all uppercase tracking-widest hover:bg-white hover:text-[#182A2C]"
              style={{
                backgroundColor: '#d9fb06',
                color: '#182A2C',
                border: 'none'
              }}
            >
              {t('footer.subscribe')}
            </button>

            <h3 className="text-base font-bold mt-8 mb-4 uppercase tracking-tighter" style={{ color: '#ffffff' }}>
              {t('footer.followUs')}
            </h3>
            <div className="flex gap-4">
              <span className="inline-block hover:text-[#d9fb06] transition-colors" style={{ color: '#ffffff' }}><FacebookIcon size={24} /></span>
              <span className="inline-block hover:text-[#d9fb06] transition-colors" style={{ color: '#ffffff' }}><LinkedinIcon size={24} /></span>
              <span className="inline-block hover:text-[#d9fb06] transition-colors" style={{ color: '#ffffff' }}><TwitterIcon size={24} /></span>
              <span className="inline-block hover:text-[#d9fb06] transition-colors" style={{ color: '#ffffff' }}><YoutubeIcon size={24} /></span>
            </div>
          </div>

          {/* Right Column - White background */}
          <div style={{ backgroundColor: '#fff', padding: '2rem 1.5rem' }}>
            {/* Compañía */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3" style={{ color: '#333' }}>
                {t('footer.company.title')}
              </h4>
              <ul className="space-y-2">
                {[
                  { name: t('footer.company.about'), href: '#nosotros' },
                  { name: t('footer.company.esg'), href: '#' },
                  { name: t('footer.company.news'), href: '#' },
                  { name: t('footer.company.offices'), href: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-xs hover:underline transition-colors text-left"
                      style={{ color: '#666', lineHeight: '1.5' }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Centro de Recursos */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3" style={{ color: '#333' }}>
                {t('footer.resources.title')}
              </h4>
              <ul className="space-y-2">
                {[
                  { name: t('footer.resources.articles'), href: '#' },
                  { name: t('footer.resources.blogs'), href: '#' },
                  { name: t('footer.resources.successCases'), href: '#portfolio' },
                  { name: t('footer.resources.seeMore'), href: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-xs hover:underline transition-colors text-left"
                      style={{ color: '#666', lineHeight: '1.5' }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ayuda */}
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: '#333' }}>
                {t('footer.help.title')}
              </h4>
              <ul className="space-y-2">
                {[
                  { name: t('footer.help.accessibility'), href: '#' },
                  { name: t('footer.help.legal'), href: '#' },
                  { name: t('footer.help.privacy'), href: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-xs hover:underline transition-colors text-left"
                      style={{ color: '#666', lineHeight: '1.5' }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original */}
        <div className="container px-4 md:px-6 lg:px-8 hidden md:block" style={{ paddingTop: '2rem' }}>
          {/* Main Footer Grid - Compact CGI Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Company Info - Left Column */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="text-xl font-bold mb-2 uppercase tracking-tighter" style={{ color: '#182A2C', letterSpacing: '0.5px' }}>
                Websy Desarrollo & Tecnología®
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: '#666', lineHeight: '1.5' }}>
                {t('footer.description')}
              </p>
              <p className="text-[10px] uppercase font-black tracking-widest mt-4" style={{ color: '#182A2C', opacity: 0.5 }}>
                © {currentYear} {t('footer.copyright')}
              </p>
            </div>

            {/* Compañía */}
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: '#333' }}>
                {t('footer.company.title')}
              </h4>
              <ul className="space-y-1.5">
                {[
                  { name: t('footer.company.about'), href: '#nosotros' },
                  { name: t('footer.company.esg'), href: '#' },
                  { name: t('footer.company.news'), href: '#' },
                  { name: t('footer.company.offices'), href: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-xs hover:underline transition-colors text-left"
                      style={{ color: '#666', lineHeight: '1.5' }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Centro de Recursos */}
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: '#333' }}>
                {t('footer.resources.title')}
              </h4>
              <ul className="space-y-1.5">
                {[
                  { name: t('footer.resources.articles'), href: '#' },
                  { name: t('footer.resources.blogs'), href: '#' },
                  { name: t('footer.resources.successCases'), href: '#portfolio' },
                  { name: t('footer.resources.seeMore'), href: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-xs hover:underline transition-colors text-left"
                      style={{ color: '#666', lineHeight: '1.5' }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ayuda */}
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: '#333' }}>
                {t('footer.help.title')}
              </h4>
              <ul className="space-y-1.5">
                {[
                  { name: t('footer.help.accessibility'), href: '#' },
                  { name: t('footer.help.legal'), href: '#' },
                  { name: t('footer.help.privacy'), href: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-xs hover:underline transition-colors text-left"
                      style={{ color: '#666', lineHeight: '1.5' }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};