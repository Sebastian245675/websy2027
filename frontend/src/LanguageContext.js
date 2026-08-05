import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, getTranslation, loadLanguage } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if there's a stored language preference
    const storedLang = localStorage.getItem('websy_language');
    if (storedLang && storedLang !== 'es' && ['en', 'zh', 'ja'].includes(storedLang)) {
      changeLanguage(storedLang);
    }
  }, []);

  const changeLanguage = async (langCode) => {
    if (langCode === currentLanguage && translations[langCode]) return;

    setIsLoading(true);
    try {
      if (!translations[langCode]) {
        await loadLanguage(langCode);
      }
      setCurrentLanguage(langCode);
      localStorage.setItem('websy_language', langCode);
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const t = (key) => {
    // Check if translation exists for current language, fallback to es is handled in getTranslation
    return getTranslation(currentLanguage, key);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translations: translations[currentLanguage] || translations['es'],
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};