import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaVk } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import { 
    ABOUT_ROUTE, NEWS_ROUTE, JOBS_ROUTE, TERMS_ROUTE, 
    PRIVACY_ROUTE, FAQ_ROUTE, CONTACTS_ROUTE, FEEDBACK_ROUTE 
} from '../../../utils/consts';

const Footer = () => {

    const { t } = useTranslation('footer');

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.logoSection}>
                        <Link to="/" className={styles.logo}>Main</Link>
                        <div className={styles.socialIcons}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            <a href="https://vk.com" target="_blank" rel="noopener noreferrer"><FaVk /></a>
                        </div>
                    </div>

                    {/* <div className={styles.linksSection}> */}
                        {/* <div className={styles.linksColumn}> */}
                            {/* <h4>{t('info')}</h4> */}
                            {/* <Link to={ABOUT_ROUTE}>{t('about')}</Link> */}
                            {/* <Link to={NEWS_ROUTE}>{t('news')}</Link> */}
                            {/* <Link to={JOBS_ROUTE}>{t('jobs')}</Link> */}
                            {/* <Link to={TERMS_ROUTE}>{t('terms')}</Link> */}
                            {/* <Link to={PRIVACY_ROUTE}>{t('privacy')}</Link> */}
                        {/* </div> */}
                        {/* <div className={styles.linksColumn}> */}
                            {/* <h4>{t('help')}</h4> */}
                            {/* <Link to={FAQ_ROUTE}>{t('faq')}</Link> */}
                            {/* <Link to={CONTACTS_ROUTE}>{t('contacts')}</Link> */}
                            {/* <Link to={FEEDBACK_ROUTE}>{t('feedback')}</Link> */}
                        {/* </div> */}
                    {/* </div> */}
                </div>
                <div className={styles.bottomSection}>
                    <p>{t('copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;