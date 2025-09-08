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
            localStorage.setItem('token', token);
            window.location.href = MENU_ROUTE;
        } else {
            toast.error("Ошибка авторизации. Попробуйте снова.");
            navigate(LOGIN_ROUTE);
        }

    }, [searchParams, navigate]); 
    return <Spinner fullPage={true} />;
};

export default AuthCallbackPage;


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