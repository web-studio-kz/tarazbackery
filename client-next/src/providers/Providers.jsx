'use client';

import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';

import { store, persistor } from '../store'; 
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import BottomNav from '../components/layout/BottomNav/BottomNav';

import '../i18n';
import { check } from '../http/userAPI';
import { setIsAuth, setUser } from '../store/userSlice';

const AppInitializer = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            check()
                .then(data => {
                    dispatch(setUser(data));
                    dispatch(setIsAuth(true));
                })
                .catch(() => {
                    console.error("Ошибка проверки токена, токен удален.");
                    localStorage.removeItem('token');
                });
        }
    }, [dispatch]);
    return <>{children}</>;
};

export default function Providers({ children }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppInitializer>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flexGrow: 1, width: '100%', maxWidth: '1240px', margin: '0 auto', padding: '20px 15px' }}>
                {children}
              </main>
              <Footer />
              <BottomNav />
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
          </AppInitializer>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  );
}