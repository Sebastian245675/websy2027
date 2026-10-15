import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { CONTACT, whatsappUrl } from '../siteConfig';

// SVG icons inline
const MenuIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const XIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const GlobeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChevronDownIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const PhoneIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.784h-2.96v-3.429h2.96v-2.532c0-2.932 1.791-4.528 4.405-4.528 1.252 0 2.329.093 2.643.135v3.064h-1.813c-1.423 0-1.698.676-1.698 1.668v2.188h3.391l-.441 3.429h-2.95v8.784h6.145c.733 0 1.326-.593 1.326-1.324v-21.351c0-.732-.593-1.325-1.326-1.325z" />
  </svg>
);

const TikTokIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.25-1.33 2.1-.04.7.06 1.42.45 2.01.39.73 1.15 1.19 1.98 1.25 1.32.1 2.59-.88 2.89-2.1.02-.31.01-.62.01-.93V.02z" />
  </svg>
);

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Section IDs for scroll spy - memoized to prevent infinite loops
  const sectionIds = useMemo(() => ['inicio', 'servicios', 'portfolio', 'planes', 'nosotros', 'testimonios', 'contacto'], []);
  const activeSection = useScrollSpy(sectionIds);

  // Memoize navItems to prevent recreation on every render
  const navItems = useMemo(() => [
    { name: t('nav.home'), href: '/', isRoute: true },
    { name: t('nav.services'), href: '/servicios', isRoute: true },
    { name: t('nav.portfolio'), href: '/casos-de-exito', isRoute: true },
    { name: t('nav.plans') || 'Inversión', href: '/planes', isRoute: true },
    { name: 'Blog', href: '/blog', isRoute: true }
  ], [t]);

  // Contact item separate for right side
  const contactItem = useMemo(() => ({
    name: t('nav.contact'),
    href: '/contacto',
    isRoute: true
  }), [t]);

  // Sin banderas: el español del sitio es para toda Latinoamérica (una bandera de un país confunde al resto)
  // y así no se descargan imágenes de un sitio externo en cada página
  const languages = useMemo(() => [
    { code: 'es', name: 'Español', short: 'ES' },
    { code: 'en', name: 'English', short: 'EN' }
  ], []);


  // Performance logging
  useEffect(() => {
    const navStart = performance.now();
    console.log('🧭 [NAV] Navigation mounted');

    return () => {
      const navEnd = performance.now();
      console.log('✅ [NAV] Navigation total time:', Math.round(navEnd - navStart), 'ms');
    };
  }, []);

  const scrollToSection = useCallback((href, isRoute = false) => {
    setIsOpen(false);
    if (isRoute) {
      if (href === '/') {
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        navigate(href);
      }
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [navigate, location.pathname]);

  const handleLanguageChange = useCallback((language) => {
    changeLanguage(language.code);
    setIsLanguageOpen(false);
    console.log(`Cambiando idioma a: ${language.name}`);
  }, [changeLanguage]);

  const toggleLanguageDropdown = useCallback(() => {
    setIsLanguageOpen(prev => !prev);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Top Info Bar - RE-ENABLED for Mobile & Desktop (CIMA STYLE) */}
      <div className="w-full text-white overflow-hidden relative h-[50px] md:h-[40px] bg-white border-b border-gray-100">
        {/* Polygon background - Websy Lime for high impact */}
        <div
          className="absolute left-0 top-0 h-full z-10"
          style={{
            width: '65%',
            background: 'linear-gradient(90deg, #d9fb06 0%, #aeca04 100%)',
            clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'
          }}
        />

        <div className="container relative z-20 h-full flex justify-between items-center text-[10px] md:text-[11px] font-black tracking-tighter sm:tracking-wider">
          <div className="flex items-center space-x-2 pl-2 sm:pl-4 text-[#182A2C]">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-wa-location="encabezado" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-[#182A2C]/10 p-1.5 rounded-full">
                <PhoneIcon size={12} />
              </div>
              <div className="flex flex-col leading-[1.1]">
                <span className="opacity-70 text-[8px]">WHATSAPP</span>
                <span className="font-bold">{CONTACT.phoneDisplay}</span>
              </div>
            </a>
          </div>

          <div className="flex items-center space-x-3 text-[#182A2C] pr-2 sm:pr-4">
            <div className="flex items-center space-x-2.5 border-r border-gray-300/80 pr-3">
              <a href="https://www.instagram.com/websyar" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Websy" className="hover:text-[#556902] transition-colors"><InstagramIcon size={14} /></a>
              <a href="https://www.facebook.com/share/18nU64kL9y/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Websy" className="hover:text-[#556902] transition-colors"><FacebookIcon size={14} /></a>
              <a href="https://www.tiktok.com/@websyar" target="_blank" rel="noopener noreferrer" aria-label="TikTok de Websy" className="hover:text-[#556902] transition-colors"><TikTokIcon size={14} /></a>
              <a href="https://www.linkedin.com/company/websy-dev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Websy" className="hover:text-[#556902] transition-colors"><LinkedInIcon size={14} /></a>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center gap-1.5 font-extrabold text-[10px] md:text-[11px] text-[#182A2C] hover:opacity-80 transition-opacity cursor-pointer uppercase tracking-tight py-1"
                aria-label="Seleccionar idioma"
              >
                <span>{currentLanguage === 'es' ? 'Español' : 'English'}</span>
                <ChevronDownIcon size={12} className={`transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-none shadow-2xl border border-gray-200 overflow-hidden z-[100] py-1 animate-fadeIn">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-bold text-left hover:bg-gray-100 transition-colors ${
                        currentLanguage === lang.code ? 'text-[#182A2C] bg-gray-100 font-black' : 'text-gray-600'
                      }`}
                    >
                      <span aria-hidden="true" className="text-[10px] font-black tracking-wider shrink-0 w-5">{lang.short}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="w-full bg-white border-b shadow-sm" style={{ borderColor: '#f0f0f0' }}>
        <div className="container">
          <div className="flex items-center justify-between py-2 md:py-3 h-[60px] md:h-[75px]">
            {/* Logo */}
            <div
              className="flex items-center gap-3 group cursor-pointer pr-8"
              onClick={() => navigate('/')}
            >
              <img
                src="/websy-logo.png"
                alt="Websy"
                className="h-10 md:h-14 w-auto object-contain"
                width="60"
                height="60"
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black tracking-tighter uppercase" style={{ color: '#182A2C', lineHeight: '0.8' }}>
                  Websy
                </span>
                <span className="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-widest">
                  DESARROLLO & TECNOLOGÍA
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Pushed to right */}
            <div className="hidden lg:flex items-center space-x-1 ml-auto">
              <div className="flex items-center space-x-1 mr-4">
                {navItems.map((item, index) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId || (item.isRoute && location.pathname === item.href);

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      title={`Ir a ${item.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href, item.isRoute);
                      }}
                      className={`relative transition-all duration-300 font-bold text-sm px-4 py-3 group ${isActive ? 'text-[#d9fb06]' : 'text-[#182A2C] hover:text-[#d9fb06]'
                        }`}
                    >
                      {item.name}
                      <span className={`absolute bottom-2 left-4 right-4 h-0.5 bg-[#d9fb06] transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`} />
                    </a>
                  );
                })}
              </div>

              {/* Contact Button - Square Lime like CIMA */}
              <a
                href={contactItem.href}
                title="Contacto y presupuesto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(contactItem.href, contactItem.isRoute);
                }}
                className="ml-6 flex items-center justify-center bg-[#d9fb06] hover:bg-[#aeca04] text-[#182A2C] px-8 py-4 rounded-none font-bold text-sm transition-all shadow-lg hover:shadow-lime-100 tracking-wide"
              >
                {contactItem.name.toUpperCase()}
              </a>
            </div>

            {/* Mobile/Tablet Menu Button - CIMA Style but Websy Colors */}
            <button
              className="lg:hidden flex items-center justify-center w-12 h-12 bg-[#d9fb06] hover:bg-[#aeca04] text-[#182A2C] transition-all duration-300 ml-auto border-none shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navigation - Full screen overlay - Outside container */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]" style={{ height: '100vh', width: '100vw' }}>
          {/* Background overlay */}
          <div
            className="absolute inset-0 backdrop-blur-xl"
            style={{ backgroundColor: 'rgba(24, 42, 44, 0.98)', height: '100%', width: '100%' }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />

          {/* Menu content - Full screen scrollable */}
          <div
            className="relative w-full h-full overflow-y-auto z-[61]"
            style={{ height: '100vh', width: '100vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-2xl mx-auto px-6 py-8 pt-32 pb-12 min-h-full flex flex-col justify-center">
              {/* Navigation items */}
              <div className="space-y-4 mb-20">
                {navItems.map((item, index) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToSection(item.href, item.isRoute);
                      }}
                      className={`block w-full text-right px-8 py-4 text-2xl md:text-4xl font-black uppercase tracking-tighter transition-all duration-300 ${
                        isActive ? 'text-[#d9fb06] border-r-8' : 'text-white hover:text-[#d9fb06] hover:border-r-8'
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        borderRightColor: isActive ? '#d9fb06' : 'transparent',
                        opacity: 0.9
                      }}
                    >
                      {item.name}
                    </a>
                  );
                })}

                {/* Contact item in mobile menu */}
                {(() => {
                  const sectionId = contactItem.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={contactItem.name}
                      href={contactItem.href}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToSection(contactItem.href, contactItem.isRoute);
                      }}
                      className={`block w-full text-right px-8 py-4 text-2xl md:text-4xl font-black uppercase tracking-tighter transition-all duration-300 ${
                        isActive ? 'text-[#d9fb06] border-r-8' : 'text-white hover:text-[#d9fb06] hover:border-r-8'
                      }`}
                      style={{
                        animationDelay: `${navItems.length * 0.1}s`,
                        borderRightColor: isActive ? '#d9fb06' : 'transparent',
                        opacity: 0.9
                      }}
                    >
                      {contactItem.name}
                    </a>
                  );
                })()}
              </div>

              {/* Mobile Language Selector */}
              <div className="border-t pt-8" style={{ borderColor: '#e0e0e0' }}>

              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
