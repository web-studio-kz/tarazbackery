// src/hooks/useViewportFix.js
import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 769; 

export const useViewportFix = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setTimeout(() => {
          setIsReady(true);
        }, 50); 
      } else {
        setIsReady(true);
      }
    };

    checkViewport();
  }, []); // Пустой массив зависимостей, чтобы хук выполнился только один раз

  return isReady;
};