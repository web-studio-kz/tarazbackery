'use client'; 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Link from 'next/link'; // 1. Импортируем Link из Next.js
import { usePathname, useRouter } from 'next/navigation'; // 2. Импортируем хуки Next.js

import styles from './BottomNav.module.css';
import { MENU_ROUTE, CART_ROUTE, PROFILE_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import { selectCartTotalQuantity } from '../../../store/cartSlice';
import { setUser, setIsAuth } from '../../../store/userSlice';
import { FiHome, FiShoppingCart, FiUser, FiLogOut, FiGlobe } from 'react-icons/fi';

const BottomNav = () => {
    const { t, i18n } = useTranslation('bottomNav');
    const dispatch = useDispatch();
    const router = useRouter(); // 3. Используем useRouter вместо useNavigate
    const pathname = usePathname(); // 4. Используем usePathname вместо useLocation
    
    const { isAuth } = useSelector(state => state.user);
    const totalQuantity = useSelector(selectCartTotalQuantity);

    const logout = () => {
        dispatch(setUser({}));
        dispatch(setIsAuth(false));
        localStorage.removeItem('token');
        router.push(LOGIN_ROUTE); // 5. Метод `navigate()` меняется на `router.push()`
    };

    const handleProfileClick = () => {
        if (isAuth) {
            router.push(PROFILE_ROUTE);
        } else {
            router.push(LOGIN_ROUTE);
        }
    };
    
    // 6. Функция для определения активного класса
    const getLinkClass = (path) => {
        // Если path это '/', то проверяем на точное совпадение
        const isActive = (path === '/') ? pathname === path : pathname.startsWith(path);
        return isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;
    };

    const toggleLanguage = () => {
        const nextLanguage = i18n.language === 'ru' ? 'kz' : 'ru';
        i18n.changeLanguage(nextLanguage);
    };

    return (
        <nav className={styles.navBar}>
            {/* Меню */}
            <Link href={MENU_ROUTE} className={getLinkClass(MENU_ROUTE)}>
                <FiHome className={styles.icon} />
                <span className={styles.text}>{t('menu')}</span>
            </Link>

            {/* Язык */}
            <div className={styles.navLink} onClick={toggleLanguage}>
                <FiGlobe className={styles.icon} />
                <span className={styles.text}>{i18n.language.toUpperCase()}</span>
            </div>
            
            {/* Корзина */}
            <Link href={CART_ROUTE} className={getLinkClass(CART_ROUTE)}>
                <div className={styles.cartIconWrapper}>
                    <FiShoppingCart className={styles.icon} />
                    {totalQuantity > 0 && (
                        <span className={styles.cartBadge}>{totalQuantity}</span>
                    )}
                </div>
                <span className={styles.text}>{t('cart')}</span>
            </Link>

            {/* Профиль/Выход */}
            {pathname === PROFILE_ROUTE && isAuth ? (
                <div className={styles.navLink} onClick={logout}>
                    <FiLogOut className={styles.icon} />
                    <span className={styles.text}>{t('logout')}</span>
                </div>
            ) : (
                <div 
                    className={getLinkClass(PROFILE_ROUTE)} 
                    onClick={handleProfileClick}
                >
                    <FiUser className={styles.icon} />
                    <span className={styles.text}>{t('profile')}</span>
                </div>
            )}
        </nav>
    );
};

export default BottomNav;