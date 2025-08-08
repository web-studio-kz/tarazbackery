import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { finalRegistration } from '../http/userAPI'; 
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '../store/userSlice';
import styles from './FinishRegistrationPage.module.css';
import { LOGIN_ROUTE, MENU_ROUTE } from '../utils/consts';
import Spinner from '../components/ui/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const FinishRegistrationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const tempToken = searchParams.get('tempToken');


    const [phoneDigits, setPhoneDigits] = useState('');
    const { t } = useTranslation('auth');

    useEffect(() => {
        if (!tempToken) {
            toast.error("Ошибка регистрации. Пожалуйста, попробуйте войти снова.");
            navigate(LOGIN_ROUTE);
            return;
        }
        try {
            const decoded = jwtDecode(tempToken);
            setName(decoded.name);
        } catch (e) {
            toast.error("Недействительная или просроченная ссылка для регистрации.");
            navigate(LOGIN_ROUTE);
        }
    }, [tempToken, navigate]);

    const handlePhoneChange = (e) => {
        const inputDigits = e.target.value.replace(/\D/g, '');
        let cleanDigits = inputDigits.startsWith('7') ? inputDigits.substring(1) : inputDigits;
        
        if (cleanDigits.length > 10) {
            cleanDigits = cleanDigits.substring(0, 10);
        }
        setPhoneDigits(cleanDigits);
    };

    const formatPhoneNumber = (digits) => {
        const d = digits.split('');
        let formatted = '+7';
        if (d.length > 0) formatted += ' (' + d.slice(0, 3).join('');
        if (d.length > 3) formatted += ') ' + d.slice(3, 6).join('');
        if (d.length > 6) formatted += ' ' + d.slice(6, 8).join('');
        if (d.length > 8) formatted += ' ' + d.slice(8, 10).join('');
        return formatted;
    };

    const displayPhoneValue = formatPhoneNumber(phoneDigits);

    const handleSubmit = async () => {
        if (phoneDigits.length !== 10) {
            return toast.warn("Пожалуйста, введите полный номер телефона (10 цифр).");
        }
        setLoading(true);
        try {
            const fullPhoneNumber = `+7${phoneDigits}`;
            const response = await finalRegistration(tempToken, fullPhoneNumber);
            const finalToken = response.token;
            
            localStorage.setItem('token', finalToken);
            const userData = jwtDecode(finalToken);
            dispatch(setUser(userData));
            dispatch(setIsAuth(true));
            
            toast.success("Добро пожаловать! Регистрация успешно завершена!");
            navigate(MENU_ROUTE);
        } catch (e) {
            toast.error(e.response?.data?.message || "Произошла непредвиденная ошибка");
            setLoading(false);
        }
    };

    if (!name) {
        return <Spinner fullPage={true} />;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <h2>{t('finish_reg_greeting', { name: name })}</h2>
                <p className={styles.subtitle}>{t('finish_reg_subtitle')}</p>
                
                <div className={styles.warning}>
                <strong>{t('finish_reg_warning_strong')}</strong>
                </div>

                <input
                    className={styles.input}
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={displayPhoneValue}
                    onChange={handlePhoneChange}
                    disabled={loading}
                />
                <button onClick={handleSubmit} className={styles.button} disabled={loading}>
                    {loading ? t('finishing_reg_button') : t('finish_reg_button')}
                </button>
            </div>
        </div>
    );
};

export default FinishRegistrationPage;