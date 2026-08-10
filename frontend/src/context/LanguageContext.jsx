import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const savedLang = localStorage.getItem('carshop_lang');
      return savedLang && ['en', 'uz', 'ru'].includes(savedLang) ? savedLang : 'en';
    } catch (e) {
      return 'en';
    }
  });

  useEffect(() => {
    localStorage.setItem('carshop_lang', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Fallback to key if not found
      }
    }
    return result;
  };

  const changeLanguage = (lang) => {
    if (['en', 'uz', 'ru'].includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
