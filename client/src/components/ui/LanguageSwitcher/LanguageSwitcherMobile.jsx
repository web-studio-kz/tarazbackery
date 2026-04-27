import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcherMobile.module.css';

const LanguageSwitcherMobile = () => {
    const { i18n } = useTranslation();

    const currentLanguage = i18n.language;

    const toggleLanguage = () => {
        const nextLanguage = currentLanguage === 'ru' ? 'kz' : 'ru';
        i18n.changeLanguage(nextLanguage);
    };

    return (
        <button onClick={toggleLanguage} className={styles.toggleButton} aria-label="Сменить язык">
            {currentLanguage.toUpperCase()}
        </button>
    );
};

export default LanguageSwitcherMobile;