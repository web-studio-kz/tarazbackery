// src/components/layout/AppLayout/AppLayout.jsx (ФИНАЛЬНАЯ, ПРАВИЛЬНАЯ ВЕРСИЯ)

import React from 'react';
import styles from './AppLayout.module.css';
import Header from '../Header/Header';
import BottomNav from '../BottomNav/BottomNav';
import Footer from '../Footer/Footer';

import { useMatchMedia } from '../../../hooks/useMatchMedia';

const AppLayout = ({ children }) => {
  const { isMobile } = useMatchMedia();

  // Пока мы не определили тип устройства (isMobile === null),
  // мы не рендерим ничего. Это предотвратит "моргание"
  // и гарантирует, что мы покажем сразу правильный интерфейс.
  if (isMobile === null) {
    return null; // Или можно вернуть <Spinner />, но null быстрее
  }

  return (
    <div className={styles.wrapper}>
      {isMobile ? <BottomNav /> : <Header />}
      
      <main className={styles.container}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default AppLayout;