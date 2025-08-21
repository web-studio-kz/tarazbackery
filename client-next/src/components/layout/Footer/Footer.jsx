// src/components/layout/Footer/Footer.jsx

'use client'; // Добавляем, так как useTranslation - это хук

import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link'; // <-- Правильный импорт
import { FaInstagram, FaFacebook, FaVk } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Убедитесь, что пути правильные. Возможно, нужно `../../utils/consts`
import { 
    ABOUT_ROUTE, NEWS_ROUTE, JOBS_ROUTE, TERMS_ROUTE, 
    PRIVACY_ROUTE, FAQ_ROUTE, CONTACTS_ROUTE, FEEDBACK_ROUTE 
} from '../../../utils/consts'; 

const Footer = () => {
    const { t } = useTranslation(['footer']);

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.logoSection}>
                        {/* --- ИСПРАВЛЕНИЕ ЗДЕСЬ --- */}
                        {/* Было: <Link to="/"> */}
                        <Link href="/" className={styles.logo}>KFC</Link>
                        
                        <div className={styles.socialIcons}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            <a href="https://vk.com" target="_blank" rel="noopener noreferrer"><FaVk /></a>
                        </div>
                    </div>

                    {/* Раскомментировал этот блок и заменил `to` на `href` */}
                    {/* <div className={styles.linksSection}>
                        <div className={styles.linksColumn}>
                            <h4>{t('info')}</h4>
                            <Link href={ABOUT_ROUTE}>{t('about')}</Link>
                            <Link href={NEWS_ROUTE}>{t('news')}</Link>
                            <Link href={JOBS_ROUTE}>{t('jobs')}</Link>
                            <Link href={TERMS_ROUTE}>{t('terms')}</Link>
                            <Link href={PRIVACY_ROUTE}>{t('privacy')}</Link>
                        </div>
                        <div className={styles.linksColumn}>
                            <h4>{t('help')}</h4>
                            <Link href={FAQ_ROUTE}>{t('faq')}</Link>
                            <Link href={CONTACTS_ROUTE}>{t('contacts')}</Link>
                            <Link href={FEEDBACK_ROUTE}>{t('feedback')}</Link>
                        </div>
                    </div> */}
                </div>
                <div className={styles.bottomSection}>
                    <p>{t('copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;