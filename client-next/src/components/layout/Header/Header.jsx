// src/components/layout/Header/Header.jsx

'use client'; // <-- ОБЯЗАТЕЛЬНО! Этот компонент интерактивный.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link'; // 1. Импортируем Link из Next.js
import { useRouter } from 'next/navigation'; // 2. Импортируем useRouter
import styles from './Header.module.css';

import { selectCartTotalQuantity } from '../../../store/cartSlice';
import { setIsAuth, setUser } from '../../../store/userSlice';
import { MENU_ROUTE, CART_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../../../utils/consts';
import LanguageSwitcher from '../../ui/LanguageSwitcher/LanguageSwitcher';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useTranslation } from 'react-i18next'; // 3. Добавляем для title

const Header = () => {
    const { t } = useTranslation('header'); // 3. Инициализируем
    const { isAuth, user } = useSelector(state => state.user);
    const totalQuantity = useSelector(selectCartTotalQuantity);
    const router = useRouter(); // 4. Используем useRouter
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setUser({}));
        dispatch(setIsAuth(false));
        localStorage.removeItem('token');
        router.push(LOGIN_ROUTE); // 5. Используем router.push()
    };
    
    const handleUserIconClick = () => {
        if (isAuth) {
            router.push(PROFILE_ROUTE); 
        } else {
            router.push(LOGIN_ROUTE); 
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Link href={MENU_ROUTE} className={styles.logo}> {/* 6. `to` -> `href` */}
                    KFC
                </Link>
                <LanguageSwitcher />
            </div>

            <div className={styles.nav}>
                <Link href={CART_ROUTE} className={styles.iconButton} title={t('cart')}> {/* 6. `to` -> `href` */}
                    <div className={styles.cartIconWrapper}>
                        <FiShoppingCart />
                        {totalQuantity > 0 && (
                            <span className={styles.cartBadge}>{totalQuantity}</span>
                        )}
                    </div>
                </Link>

                <button onClick={handleUserIconClick} className={styles.iconButton} title={t('profile')}>
                    <FiUser />
                </button>

                {isAuth && (
                    <button onClick={logout} className={styles.iconButton} title={t('logout')}>
                        <FiLogOut />
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;