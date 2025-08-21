export const fallbackLng = 'ru';
export const languages = [fallbackLng, 'kz'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true, // Включите для отладки
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
}