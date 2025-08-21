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
        // Весь компонент теперь - одна кнопка
        <button onClick={toggleLanguage} className={styles.toggleButton}>
            {currentLanguage.toUpperCase()}
        </button>
    );
};

export default LanguageSwitcherMobile;