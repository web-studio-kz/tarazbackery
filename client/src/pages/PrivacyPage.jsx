import React from 'react';
import styles from './StaticPage.module.css'; 
import { useTranslation } from 'react-i18next';


const PrivacyPage = () => {
    const { t } = useTranslation('privacy');

    return (
        <div className={styles.page}>
            <div className={styles.container}>
            <>
                <h1>{ t('title') }</h1>
                <p>{ t('p1') }</p>
                <h3>{ t('h3_data') }</h3>
                <p>{ t('p2') }</p>
                <h3>{ t('h3_usage') }</h3>
                <p>{ t('p3') }</p>
                <h3>{ t('h3_security') }</h3>
                <p>{ t('p4') }</p>
            </>
            </div>
        </div>
    );
};

export default PrivacyPage;