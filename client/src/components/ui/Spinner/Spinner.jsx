import React from 'react';
import styles from './Spinner.module.css';


const Spinner = ({ fullPage = false }) => {
    if (fullPage) {
        return (
            <div className={styles.wrapper} style={{ height: '100vh' }}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return <div className={styles.spinner}></div>;
};

export default Spinner;