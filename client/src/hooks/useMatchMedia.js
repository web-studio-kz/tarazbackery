// src/hooks/useMatchMedia.js
import { useState, useEffect } from 'react';

// Наш брейкпоинт для мобильных устройств
const MOBILE_QUERY = '(max-width: 768px)';

export const useMatchMedia = () => {
  // Получаем начальное значение
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    // Создаем экземпляр mediaQueryList
    const mediaQueryList = window.matchMedia(MOBILE_QUERY);

    // Функция-обработчик, которая будет вызываться при изменении
    const listener = (event) => setIsMobile(event.matches);

    // Подписываемся на изменения
    // Использование addEventListener предпочтительнее, чем addListener
    mediaQueryList.addEventListener('change', listener);

    // Важно! Отписываемся от события при размонтировании компонента,
    // чтобы избежать утечек памяти.
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []); // Пустой массив зависимостей, чтобы эффект выполнился один раз

  return { isMobile };
};