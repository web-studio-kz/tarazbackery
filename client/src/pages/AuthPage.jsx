
import React from 'react';
import styles from './AuthPage.module.css'; // Создадим этот файл стилей
import { useTranslation } from 'react-i18next';


// URL нашего бэкенда для инициации входа через Google
// const GOOGLE_AUTH_URL = `${import.meta.env.VITE_API_URL}api/users/google`;
// const YANDEX_AUTH_URL = `${import.meta.env.VITE_API_URL}api/users/yandex`;
const GOOGLE_AUTH_URL = 'https://tarazbackery.onrender.com/api/users/google';
const YANDEX_AUTH_URL = 'https://tarazbackery.onrender.com/api/users/yandex';

const AuthPage = () => {

    const googleLogin = () => {
        // Не переходим по ссылке, а просто выводим ее в alert
        alert('URL для перехода: ' + GOOGLE_AUTH_URL); 
        // window.location.href = GOOGLE_AUTH_URL; // временно комментируем переход
    };
    const yandexLogin = () => { window.location.href = YANDEX_AUTH_URL; };
    const { t } = useTranslation('auth');

    return (
        <div className={styles.wrapper}>
            <div className={styles.authForm}>
                <h2>{ t('login_title') }</h2>
                <p>{ t('login_subtitle') }</p>
                <div className={styles.buttonGroup}>
                    <button onClick={googleLogin} className={styles.socialButton}>
                        <img src="/google-icon.svg" alt="Google icon" className={styles.icon} />
                        {/* Войти через Google */}
                        { t('login_with_google') }
                    </button>
                    <button onClick={yandexLogin} className={styles.socialButton}>
                        <img src="/yandex-icon.svg" alt="Yandex icon" className={styles.icon} />
                        { t('login_with_yandex') }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;