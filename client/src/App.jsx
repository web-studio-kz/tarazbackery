import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from './components/AppRouter';
import AppLayout from './components/layout/AppLayout/AppLayout';
import Spinner from './components/ui/Spinner/Spinner';
import { check } from './http/userAPI';
import { setIsAuth, setUser } from './store/userSlice';


const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <Spinner fullPage={true} />
    }
    
    return (
        <BrowserRouter>
            <AppLayout>
                <AppRouter />
            </AppLayout>
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