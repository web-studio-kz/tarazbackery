'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

import { setIsAuth, setUser } from '../../../store/userSlice';
import Spinner from '../../../components/ui/Spinner/Spinner';
import { MENU_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';

// Внутренний компонент, который использует хуки
function CallbackProcessor() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    // --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            
            try {
                const userData = jwtDecode(token);
                dispatch(setUser(userData));
                dispatch(setIsAuth(true));
                sessionStorage.setItem('showLoginSuccess', 'true');
                router.push(MENU_ROUTE);
            } catch (error) {
                console.error("Ошибка декодирования токена:", error);
                toast.error("Ошибка авторизации: неверный формат токена.");
                router.push(LOGIN_ROUTE);
            }

        } else {
            toast.error("Ошибка авторизации. Токен не получен.");
            router.push(LOGIN_ROUTE);
        }
    // Мы хотим, чтобы этот эффект выполнился только один раз при монтировании
    }, []); // <-- Оставляем массив зависимостей пустым

    return <Spinner fullPage={true} />;
}


// Основной компонент страницы
export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<Spinner fullPage={true} />}>
            <CallbackProcessor />
        </Suspense>
    );
};


//без перезагрузки после входа
// import React, { useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';
// import { setIsAuth, setUser } from '../store/userSlice';
// import Spinner from '../components/ui/Spinner/Spinner';
// import { MENU_ROUTE, LOGIN_ROUTE } from '../utils/consts';

// const AuthCallbackPage = () => {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const token = searchParams.get('token');

//         if (token) {
//             // 1. Сохраняем все данные, как и раньше
//             localStorage.setItem('token', token);
//             const userData = jwtDecode(token);
//             dispatch(setUser(userData));
//             dispatch(setIsAuth(true));

//             // 2. ПОКАЗЫВАЕМ УВЕДОМЛЕНИЕ ПРЯМО ЗДЕСЬ
//             toast.success(`Добро пожаловать, ${userData.name}!`);

//             // 3. Устанавливаем ТАЙМЕР для перенаправления
//             // Даем пользователю 2 секунды, чтобы увидеть уведомление
//             const timer = setTimeout(() => {
//                 navigate(MENU_ROUTE);
//             }, 2000); // 2000 миллисекунд = 2 секунды

//             // 4. (Важно для React) Очищаем таймер, если компонент размонтируется раньше времени
//             return () => clearTimeout(timer);

//         } else {
//             toast.error("Ошибка авторизации. Токен не получен.");
//             navigate(LOGIN_ROUTE);
//         }
//     }, [searchParams, navigate, dispatch]);

//     // Пользователь будет видеть спиннер на протяжении этих 2 секунд
//     return <Spinner fullPage={true} />;
// };

// export default AuthCallbackPage;