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
    // Язык по умолчанию, если никакой другой не определен
    fallbackLng: "ru",

    // Включаем логи в консоль только в режиме разработки
    debug: false,
    supportedLngs: ['ru', 'kz'],
    // --- ИСПРАВЛЕНИЕ №1: Правильный и единственный список пространств имен ---
    ns: [
      "about", "common", "header", "bottomNav", "menu", "product", 
      "cart", "auth", "profile", "footer", "terms", 
      "privacy", "faq", "contacts"
    ],
    // Пространство имен по умолчанию
    defaultNS: "common",
    
    // Настройки для определения языка пользователя
    detection: {      
        order: ['localStorage', 'cookie', 'navigator'],      
        caches: ['localStorage', 'cookie'],
    },

    // Настройки интерполяции (для вставки переменных в строки)
    interpolation: {
      escapeValue: false, 
    },

    // --- ИСПРАВЛЕНИЕ №2: `backend` вынесен на правильный уровень ---
    // Настройки для загрузки файлов перевода
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;