import { createContext, useContext, useState, useEffect, createElement } from 'react';
import en from './locales/en';
import zh from './locales/zh';

const I18nContext = createContext();

const locales = {
  en,
  zh
};

const LANGUAGE_KEY = 'starbuddy_language';

export function I18nProvider({ children }) {
  const [currentLocale, setCurrentLocale] = useState(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    return savedLanguage || 'en';
  });

  const changeLanguage = (lang) => {
    if (locales[lang]) {
      setCurrentLocale(lang);
      localStorage.setItem(LANGUAGE_KEY, lang);
    }
  };

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = locales[currentLocale];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = locales.en;
        for (const k of keys) {
          if (value && typeof value === 'object') {
            value = value[k];
          } else {
            return key;
          }
        }
        break;
      }
    }
    
    if (typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }
    
    return value;
  };

  const Provider = I18nContext.Provider;
  return createElement(Provider, { value: { t, currentLocale, changeLanguage } }, children);
}



export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
