import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { selectCartTotalQuantity } from '../../../store/cartSlice';
import { setIsAuth, setUser } from '../../../store/userSlice';
import { HOME_ROUTE, MENU_ROUTE, CART_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../../../utils/consts';
import LanguageSwitcher from '../../ui/LanguageSwitcher/LanguageSwitcher';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation('header');
    const { isAuth } = useSelector(state => state.user);
    const totalQuantity = useSelector(selectCartTotalQuantity);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setUser({}));
        dispatch(setIsAuth(false));
        localStorage.removeItem('token');
        navigate(LOGIN_ROUTE);
    };
    
    const handleUserIconClick = () => {
        if (isAuth) {
            navigate(PROFILE_ROUTE); 
        } else {
            navigate(LOGIN_ROUTE); 
        }
    };

    return (
        <header className={styles.header}>
            <Link to={HOME_ROUTE} className={styles.logo}>
                Home
            </Link>

            <div className={styles.nav}>
                <LanguageSwitcher />

                <Link to={CART_ROUTE} className={styles.iconButton} aria-label="Перейти в корзину" title={t('tooltip_cart')}>
                    <div className={styles.cartIconWrapper}>
                        <FiShoppingCart />
                        {totalQuantity > 0 && <span className={styles.cartBadge}>{totalQuantity}</span>}
                    </div>
                </Link>

                <button onClick={handleUserIconClick} className={styles.iconButton} aria-label="Личный кабинет" title={t('tooltip_profile')}>
                    <FiUser />
                </button>

                {isAuth && (
                    <button onClick={logout} className={styles.iconButton} aria-label="Выйти из аккаунта" title={t('tooltip_logout')}>
                        <FiLogOut />
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;