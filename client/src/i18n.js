// src/i18n.js (ИСПРАВЛЕННАЯ ВЕРСЯ)

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';

i18n  
  .use(HttpApi)  
  .use(LanguageDetector)  
  .use(initReactI18next)
  .init({    
    fallbackLng: "ru",
    debug: false,
    supportedLngs: ['ru', 'kz'],
    ns: [
      "about", "common", "header", "bottomNav", "menu", "product", 
      "cart", "auth", "profile", "footer", "terms", 
      "privacy", "faq", "contacts"
    ],
    defaultNS: "common",    
    detection: {      
        order: ['localStorage', 'cookie', 'navigator'],      
        caches: ['localStorage', 'cookie'],
    },

    interpolation: {
      escapeValue: false, 
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;