import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';
import { MENU_ROUTE } from '../../../utils/consts';

const Hero = () => {
    const { t } = useTranslation('home');

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{t('hero.title')}</h1>
                    <p className={styles.subtitle}>{t('hero.subtitle')}</p>
                    <Link to={MENU_ROUTE} className={styles.cta}>
                        {t('hero.cta')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;