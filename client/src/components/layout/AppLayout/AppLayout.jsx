// src/components/layout/AppLayout/AppLayout.jsx (Новая версия)

import React from 'react';
import styles from './AppLayout.module.css';
import Header from '../Header/Header';
import BottomNav from '../BottomNav/BottomNav';

// 1. Импортируем наш новый хук
import { useMatchMedia } from '../../../hooks/useMatchMedia';

const AppLayout = ({ children }) => {
  // 2. Получаем актуальное состояние
  const { isMobile } = useMatchMedia();

  return (
    <div className={styles.wrapper}>
      {/* 3. Рендерим компонент в зависимости от состояния */}
      {isMobile ? <BottomNav /> : <Header />}
      
      <main className={styles.container}>
        {children}
      </main>
      
      {/* Футер остается на месте, но мы можем его скрыть на мобильных, если он дублирует BottomNav */}
      {/* {!isMobile && <Footer />} */}
      <Footer />
    </div>
  );
};

export default AppLayout;