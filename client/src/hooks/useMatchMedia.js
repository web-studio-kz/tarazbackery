import { useState, useEffect } from 'react';

const MOBILE_QUERY = '(max-width: 768px)';

export const useMatchMedia = () => {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(MOBILE_QUERY);

    // Этот обработчик будет нашим единым источником правды.
    // Он будет вызываться и при изменении размера, и при смене ориентации.
    const updateMobileState = () => {
      setIsMobile(mediaQueryList.matches);
    };

    // 1. САМОЕ ГЛАВНОЕ: Слушаем событие 'resize'.
    // Оно сработает после закрытия окна авторизации Google.
    window.addEventListener('resize', updateMobileState);

    // 2. Также слушаем 'change' на случай, если пользователь повернет телефон.
    mediaQueryList.addEventListener('change', updateMobileState);

    // 3. Вызываем обработчик один раз при монтировании, чтобы установить начальное состояние.
    updateMobileState();

    // 4. Отписываемся от ОБОИХ событий при размонтировании.
    return () => {
      window.removeEventListener('resize', updateMobileState);
      mediaQueryList.removeEventListener('change', updateMobileState);
    };
  }, []);

  return { isMobile };
};