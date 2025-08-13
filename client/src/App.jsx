// src/App.jsx (Исправленная версия)

import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from './components/AppRouter';
import AppLayout from './components/layout/AppLayout/AppLayout';
import Spinner from './components/ui/Spinner/Spinner';
import { check } from './http/userAPI';
import { setIsAuth, setUser } from './store/userSlice';
import { useViewportFix } from './hooks/useViewportFix';

// 1. Создаем внутренний компонент для логики
const AppContent = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const isViewportReady = useViewportFix();

    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const userData = await check();
                    dispatch(setUser(userData));
                    dispatch(setIsAuth(true));
                } catch (e) {
                    console.error("Ошибка проверки токена:", e.response?.data?.message);
                    localStorage.removeItem('token');
                }
            }
        };
        checkAuth().finally(() => setLoading(false));
    }, [dispatch]);

    // Условие остается тем же
    if (loading || !isViewportReady) {
        return <Spinner fullPage={true} />;
    }

    // Но теперь мы возвращаем только контент, БЕЗ BrowserRouter
    return (
        <AppLayout>
            <AppRouter />
        </AppLayout>
    );
};


// 2. Главный компонент App теперь СУПЕР ПРОСТОЙ
const App = () => {
    return (
        // BrowserRouter находится здесь, на самом верху, и никогда не исчезает
        <BrowserRouter>
            <AppContent /> {/* Вся логика теперь внутри */}
            <ToastContainer
                className="my-toast-container"
                position="bottom-right"
                autoClose={3000}
                theme="light"
            />
        </BrowserRouter>
    );
};

export default App;