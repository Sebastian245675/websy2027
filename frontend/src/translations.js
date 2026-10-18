import { es } from './locales/es';
import { en } from './locales/en';

// Spanish and English power the visible selector, so both are available on first paint.
// This avoids briefly rendering Spanish for visitors who already selected English.
export const translations = {
  es,
  en
};

export const loadLanguage = async (lang) => {
  if (translations[lang]) return translations[lang];

  try {
    let module;
    switch (lang) {
      case 'zh':
        module = await import('./locales/zh');
        break;
      case 'ja':
        module = await import('./locales/ja');
        break;
      default:
        // Fallback or unknown language
        return translations.es;
    }

    if (module && module[lang]) {
      translations[lang] = module[lang];
      return translations[lang];
    }
    return translations.es;
  } catch (error) {
    console.error(`Failed to load language: ${lang}`, error);
    return translations.es;
  }
};

const traverse = (obj, keys) => {
  let current = obj;
  for (const k of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[k];
  }
  return current;
};

export const getTranslation = (lang, key) => {
  const keys = key.split('.');

  // Try to get translation in requested language
  // If language not loaded, this will be undefined
  let result = undefined;
  if (translations[lang]) {
    result = traverse(translations[lang], keys);
  }

  // If not found, fallback to Spanish
  if (result === undefined) {
    result = traverse(translations.es, keys);
  }

  // Preserve valid empty strings, zeroes and booleans; only expose the key when it is truly missing.
  return result === undefined ? key : result;
};
