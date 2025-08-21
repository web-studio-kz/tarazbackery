import React from 'react';
import styles from '../styles/StaticPage.module.css';
import { useTranslation } from 'react-i18next';


const ContactsPage = () => {
    const { t } = useTranslation('contacts');

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <>
                    <h1>{ t('title') }</h1>
                    <p>{ t('p1') }</p>
                    <h3>{ t('h3_support') }</h3>
                    <p>{ t('p2') }</p>
                    <ul>
                        <li><strong>{ t('li1') } :</strong> 8 (800) 555-35-35</li>
                        <li><strong>Email:</strong> support@kfc-clone.example</li>
                        <li><strong>{ t('li1') } : </strong> { t('time') }</li>
                    </ul>
                    <h3>{ t('h3_office') }</h3>
                    <p>{ t('p3') }</p>
                </>
            </div>
        </div>
    );
};

export default ContactsPage;