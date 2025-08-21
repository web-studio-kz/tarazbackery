import React from 'react';
import styles from './StaticPage.module.css'; // Используем общие стили
import { useTranslation } from 'react-i18next';


const AboutPage = () => {
    const { t } = useTranslation('about');
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <>
                    <h1>{t('title')}</h1>
                    <p>{t('p1')}</p>
                    <h3>{t('h3_mission')}</h3>
                    <p>{t('p2')}</p>
                    <h3>{t('h3_quality')}</h3>
                    <p>{t('p3')}</p>
                </>
            </div>
        </div>
    );
};

export default AboutPage;