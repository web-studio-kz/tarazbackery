import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaVk } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import { 
    HOME_ROUTE, 
    INSTAGRAM_URL, 
    FACEBOOK_URL, 
    VK_URL 
} from '../../../utils/consts';

const Footer = () => {
    const { t } = useTranslation('footer');

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.logoSection}>
                        <Link to={HOME_ROUTE} className={styles.logo}>Home</Link>
                        
                        <div className={styles.socialIcons}>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={t('social_insta')}>
                                <FaInstagram />
                            </a>
                            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label={t('social_fb')}>
                                <FaFacebook />
                            </a>
                            <a href={VK_URL} target="_blank" rel="noopener noreferrer" aria-label={t('social_vk')}>
                                <FaVk />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomSection}>
                    <p>{t('copyright', { year: new Date().getFullYear() })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;