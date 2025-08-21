// src/components/ui/LanguageSwitcher/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className={styles.switcher}>
            <button
                className={i18n.language === 'ru' ? styles.active : ''}
                onClick={() => changeLanguage('ru')}
                disabled={i18n.language === 'ru'}
            >
                RU
            </button>
            <div className={styles.divider}></div>
            <button
                className={i18n.language === 'kz' ? styles.active : ''}
                onClick={() => changeLanguage('kz')}
                disabled={i18n.language === 'kz'}
            >
                KZ
            </button>
        </div>
    );
};

export default LanguageSwitcher;