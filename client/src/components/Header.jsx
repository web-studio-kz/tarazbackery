// src/components/Header.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Импортируем нужные экшены и селекторы из наших "срезов"
import { selectCartTotalQuantity } from '../store/cartSlice';
import { setIsAuth, setUser } from '../store/userSlice';

// Импортируем константы с путями
import { MENU_ROUTE, CART_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const Header = () => {
    // Получаем состояние авторизации из Redux
    const { isAuth } = useSelector(state => state.user);
    // Получаем общее количество товаров в корзине
    const totalQuantity = useSelector(selectCartTotalQuantity);

    // Хуки для навигации и отправки действий в Redux
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Функция для выхода из системы
    const logout = () => {
        // Очищаем данные пользователя в Redux
        dispatch(setUser({}));
        dispatch(setIsAuth(false));
        // Удаляем токен из локального хранилища браузера
        localStorage.removeItem('token');
        // Перенаправляем на страницу входа (опционально, но хорошая практика)
        navigate(LOGIN_ROUTE);
    }

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between', // Changed to space-between for better alignment
            alignItems: 'center',
            padding: '10px 40px', // Increased padding
            background: '#e31837',
            color: 'white'
        }}>
            {/* Ссылка на главную страницу */}
            <Link to={MENU_ROUTE} style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
                KFC
            </Link>

            {/* Правая часть шапки */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Ссылка на корзину */}
                <Link to={CART_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
                    Корзина {totalQuantity > 0 && `(${totalQuantity})`}
                </Link>

                {/* Условный рендеринг кнопок */}
                {isAuth ? (
                    // Если пользователь авторизован, показываем кнопку "Выйти"
                    <button
                        onClick={logout}
                        style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '5px 10px', cursor: 'pointer' }}
                    >
                        Выйти
                    </button>
                ) : (
                    // Если не авторизован, показываем кнопку "Войти"
                    <button
                        onClick={() => navigate(LOGIN_ROUTE)}
                        style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '5px 10px', cursor: 'pointer' }}
                    >
                        Войти
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;