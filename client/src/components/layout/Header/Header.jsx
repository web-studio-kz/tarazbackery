import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { selectCartTotalQuantity } from '../../../store/cartSlice';
import { setIsAuth, setUser } from '../../../store/userSlice';
import { MENU_ROUTE, CART_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../../../utils/consts';
import LanguageSwitcher from '../../ui/LanguageSwitcher/LanguageSwitcher';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

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
            <Link to={MENU_ROUTE} className={styles.logo}>
                KFC
            </Link>

            <div className={styles.nav}>
                <LanguageSwitcher />

                <Link to={CART_ROUTE} className={styles.iconButton}>
                    <div className={styles.cartIconWrapper}>
                        <FiShoppingCart />
                        {totalQuantity > 0 && (
                            <span className={styles.cartBadge}>{totalQuantity}</span>
                        )}
                    </div>
                </Link>

                <button onClick={handleUserIconClick} className={styles.iconButton}>
                    <FiUser />
                </button>

                {isAuth && (
                    <button onClick={logout} className={styles.iconButton} title="Выйти">
                        <FiLogOut />
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;