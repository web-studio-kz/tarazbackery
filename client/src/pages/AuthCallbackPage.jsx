import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/ui/Spinner/Spinner';
import { MENU_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { check } from '../http/userAPI';
import { setIsAuth, setUser } from '../store/userSlice';

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Создаем "предохранитель"
    const isMounted = useRef(false);

    useEffect(() => {
        // Если предохранитель уже сработал — выходим
        if (isMounted.current) return;
        
        const verifyAuth = async () => {
            try {
                // Ставим предохранитель в положение "сработано"
                isMounted.current = true;

                const userData = await check(); 
                dispatch(setUser(userData));
                dispatch(setIsAuth(true));
                
                toast.success(`С возвращением, ${userData.name || 'пользователь'}!`);
                // navigate(MENU_ROUTE);
                window.location.href = MENU_ROUTE;
            } catch (e) {
                console.error("Ошибка авторизации:", e);
                // Если произошла реальная ошибка, позволяем попробовать снова при след. монтировании
                isMounted.current = false; 
                toast.error("Ошибка входа.");
                navigate(LOGIN_ROUTE);
            }
        };

        verifyAuth();
    }, [navigate, dispatch]);

    return <Spinner fullPage={true} />;
};

export default AuthCallbackPage;