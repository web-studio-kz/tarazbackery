import React from 'react';
import styles from '../styles/StaticPage.module.css';
import { useTranslation } from 'react-i18next';
const FaqPage = () => {

    const { t } = useTranslation('faq')

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <>
                    <h1>{ t('title') }</h1>
                    <h3>{ t('h3_q1') }</h3>
                    <p>{ t('p1') }</p>
                    <h3>{ t('h3_q2') }</h3>
                    <p>{ t('p2') }</p>
                    <h3>{ t('h3_q3') }</h3>
                    <p>{ t('p3') }</p>
                    <h3>{ t('h3_q4') }</h3>
                    <p>{ t('p4') }</p>
                </>
            </div>
        </div>
    );
};

export default FaqPage;