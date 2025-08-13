// src/pages/AuthCallbackPage.jsx (Самая надежная версия)

import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/ui/Spinner/Spinner';
import { MENU_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const AuthCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            // 1. Сохраняем токен в localStorage. Это единственное,
            //    что нам нужно сделать на этой странице.
            localStorage.setItem('token', token);

            // 2. Делаем "жесткий" редирект на главную страницу.
            //    Это не React-навигация, а полная перезагрузка браузера на новый адрес.
            //    Это полностью очистит состояние viewport и URL.
            window.location.href = MENU_ROUTE; // MENU_ROUTE это '/'

        } else {
            // Если токена нет, что-то пошло не так.
            toast.error("Ошибка авторизации. Попробуйте снова.");
            navigate(LOGIN_ROUTE);
        }

    }, [searchParams, navigate]); // Зависимости остаются для корректной работы

    // Пока происходит редирект, пользователь видит спиннер.
    return <Spinner fullPage={true} />;
};

export default AuthCallbackPage;