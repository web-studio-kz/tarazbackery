import React from 'react';
import styles from '../styles/StaticPage.module.css';
import { useTranslation } from 'react-i18next';

const TermsPage = () => {
    const { t } = useTranslation('terms');

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <>
                    <h1>{ t('title') }</h1>
                    <p>{ t('p1') }</p>
                    <h3>{ t('h3_general') }</h3>
                    <p>{ t('p2') }</p>
                    <p>{ t('p3') }</p>
                    <p>{ t('p3') }</p>
                    <h3>{ t('h3_order') }</h3>
                    <p>{ t('p4') }</p>
                    <p>{ t('p5') }</p>
                    <h3>{ t('h3_ip') }</h3>
                    <p>{ t('p6') }</p>
                </>
            </div>
        </div>
    );
};

export default TermsPage;