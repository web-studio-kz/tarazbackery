import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCartTotalQuantity } from '../store/cartSlice';
import { setIsAuth, setUser } from '../store/userSlice';
import { MENU_ROUTE, CART_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const Header = () => {
    const { isAuth } = useSelector(state => state.user);
    const totalQuantity = useSelector(selectCartTotalQuantity);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setUser({}));
        dispatch(setIsAuth(false));
        localStorage.removeItem('token');
        navigate(LOGIN_ROUTE);
    }

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '10px 40px',
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