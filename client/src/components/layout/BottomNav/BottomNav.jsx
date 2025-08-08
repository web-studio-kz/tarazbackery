import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import styles from './BottomNav.module.css';
import { MENU_ROUTE, CART_ROUTE, PROFILE_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import { selectCartTotalQuantity } from '../../../store/cartSlice';
import { setUser, setIsAuth } from '../../../store/userSlice';

import { FiHome, FiShoppingCart, FiUser, FiLogOut, FiGlobe } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const BottomNav = () => {
    const { t, i18n } = useTranslation('bottomNav');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch(); 
    const { isAuth } = useSelector(state => state.user);
    const totalQuantity = useSelector(selectCartTotalQuantity);

    const logout = () => {
        dispatch(setUser({}));
        dispatch(setIsAuth(false));
        localStorage.removeItem('token');
        navigate(LOGIN_ROUTE);
    };

    const getNavLinkClass = ({ isActive }) => {
        return isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;
    };

    const handleProfileClick = () => {
        if (isAuth) {
            navigate(PROFILE_ROUTE);
        } else {
            navigate(LOGIN_ROUTE);
        }
    };

    const isOnProfilePage = location.pathname === PROFILE_ROUTE;
    

    const toggleLanguage = () => {
        const nextLanguage = i18n.language === 'ru' ? 'kz' : 'ru';
        i18n.changeLanguage(nextLanguage);
    };

    return (
        <nav className={styles.navBar}>
            {/* Меню */}
            <NavLink to={MENU_ROUTE} className={getNavLinkClass} end>
                <FiHome className={styles.icon} />
                <span className={styles.text}>{t('menu')}</span>
            </NavLink>

            <div className={styles.navLink} onClick={toggleLanguage}>
                <FiGlobe className={styles.icon} />
                <span className={styles.text}>{i18n.language.toUpperCase()}</span>
            </div>
            
            {/* Корзина */}
            <NavLink to={CART_ROUTE} className={getNavLinkClass}>
                <div className={styles.cartIconWrapper}>
                    <FiShoppingCart className={styles.icon} />
                    {totalQuantity > 0 && (
                        <span className={styles.cartBadge}>{totalQuantity}</span>
                    )}
                </div>
                <span className={styles.text}>{t('cart')}</span>
            </NavLink>

            {isOnProfilePage && isAuth ? (
                <div className={styles.navLink} onClick={logout}>
                    <FiLogOut className={styles.icon} />
                    <span className={styles.text}>{t('logout')}</span>
                </div>
            ) : (
                <div 
                    className={isOnProfilePage ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} 
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