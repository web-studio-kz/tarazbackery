import React from 'react';
import styles from './AppLayout.module.css';
import Header from '../Header/Header';
import BottomNav from '../BottomNav/BottomNav'
import Footer from '../Footer/Footer';


const AppLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.container}>
        {children}
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
};

export default AppLayout;