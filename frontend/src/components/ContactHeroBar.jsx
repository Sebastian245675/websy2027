import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export const ContactHeroBar = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative py-8 md:py-10 lg:py-12 flex items-center justify-center" style={{ backgroundColor: 'transparent' }}>
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #182A2C 0%, #344445 100%)'
        }}
      ></div>
      
      <div className="container relative z-10 px-4 md:px-6 lg:px-8 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white"
            style={{ fontWeight: 400, fontFamily: 'sans-serif' }}
          >
            {t('contact.subtitle')}
          </h1>
          
          <button 
            onClick={() => navigate('/contacto')}
            className="px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium transition-all duration-300 hover:opacity-90 rounded-lg"
            style={{
              backgroundColor: '#DC143C',
              color: '#fff',
              borderRadius: '8px',
              border: 'none'
            }}
          >
            {t('contact.title')}
          </button>
        </div>
      </div>
    </section>
  );
};

