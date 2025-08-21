import React from 'react';
import styles from '../styles/StaticPage.module.css';
import { useTranslation } from 'react-i18next';
import { i18n } from 'i18next';

export default async function AboutPage({ params: { lng } }) {
    const { t } = await i18n.changeLanguage(lng);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>{t('about:title')}</h1>
                <p>{t('about:p1')}</p>
                <h3>{t('about:h3_mission')}</h3>
                <p>{t('about:p2')}</p>
                <h3>{t('about:h3_quality')}</h3>
                <p>{t('about:p3')}</p>
            </div>
        </div>
    );
};