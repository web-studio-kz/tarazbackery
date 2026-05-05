import React, { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Проверяем, нажимал ли пользователь уже "Ок"
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>
                Мы используем файлы cookie, чтобы сделать ваш отдых на сайте вкуснее и удобнее. 
                Оставаясь с нами, вы соглашаетесь с нашей политикой.
            </p>
            <button onClick={handleAccept} className={styles.button}>
                Понятно
            </button>
        </div>
    );
};

export default CookieConsent;