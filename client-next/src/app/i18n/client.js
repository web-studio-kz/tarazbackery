'use client';

import { useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { useCookies } from 'react-cookie';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getOptions, languages, cookieName } from './settings';

const runsOnServerSide = typeof window === 'undefined';

// Инициализируем i18next на стороне клиента
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`../../../public/locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // Позволяем детектору определить язык
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie']
    },
    preload: runsOnServerSide ? languages : []
  });

export function useTranslation(lng, ns, options) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }

  useEffect(() => {
    if (i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  useEffect(() => {
    if (cookies.i18next === lng) return;
    setCookie(cookieName, lng, { path: '/' });
  }, [lng, cookies.i18next, setCookie]);

  return ret;
}