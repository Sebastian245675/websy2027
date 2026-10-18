import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { translations, getTranslation, loadLanguage } from './translations';

const LanguageContext = createContext();
const SUPPORTED_LANGUAGES = ['es', 'en'];

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Keep the first render aligned with the Spanish prerendered HTML, then restore a saved
  // language before the browser paints. English is imported eagerly, so this is synchronous.
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const requestId = useRef(0);

  const changeLanguage = useCallback(async (langCode) => {
    if (!SUPPORTED_LANGUAGES.includes(langCode)) return false;
    if (langCode === currentLanguage && translations[langCode]) {
      requestId.current += 1;
      setIsLoading(false);
      try {
        localStorage.setItem('websy_language', langCode);
      } catch (_) {
        // Private browsing or disabled storage must not break the selector.
      }
      return true;
    }

    const activeRequest = ++requestId.current;
    setIsLoading(true);
    try {
      if (!translations[langCode]) {
        const loaded = await loadLanguage(langCode);
        if (!loaded || !translations[langCode]) throw new Error(`Language ${langCode} could not be loaded`);
      }
      if (activeRequest !== requestId.current) return false;
      setCurrentLanguage(langCode);
      try {
        localStorage.setItem('websy_language', langCode);
      } catch (_) {
        // Private browsing or disabled storage must not break the selector.
      }
      return true;
    } catch (error) {
      console.error('Error changing language:', error);
      return false;
    } finally {
      if (activeRequest === requestId.current) setIsLoading(false);
    }
  }, [currentLanguage]);

  useLayoutEffect(() => {
    try {
      const storedLang = localStorage.getItem('websy_language');
      if (storedLang && storedLang !== 'es') changeLanguage(storedLang);
    } catch (_) {
      // Keep Spanish when storage is unavailable.
    }
  }, [changeLanguage]);

  const t = useCallback((key) => {
    // Check if translation exists for current language, fallback to es is handled in getTranslation
    return getTranslation(currentLanguage, key);
  }, [currentLanguage]);

  const value = useMemo(() => ({
    currentLanguage,
    changeLanguage,
    t,
    translations: translations[currentLanguage] || translations['es'],
    isLoading,
    supportedLanguages: SUPPORTED_LANGUAGES
  }), [changeLanguage, currentLanguage, isLoading, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
