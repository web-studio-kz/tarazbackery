import { useState, useEffect } from 'react';

const MOBILE_QUERY = '(max-width: 768px)';

export const useMatchMedia = () => {
  // 1. Начинаем с неопределенного состояния (null). Мы еще не знаем, мобильное ли устройство.
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    // 2. Весь код, использующий `window`, находится внутри useEffect.
    //    useEffect гарантированно запускается только в браузере, ПОСЛЕ первого рендера.
    const mediaQueryList = window.matchMedia(MOBILE_QUERY);

    // 3. Устанавливаем ПРАВИЛЬНОЕ начальное значение, когда компонент смонтирован.
    setIsMobile(mediaQueryList.matches);

    const listener = (event) => setIsMobile(event.matches);
    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  // 4. Возвращаем состояние. В самый первый момент оно будет `null`.
  return { isMobile };
};