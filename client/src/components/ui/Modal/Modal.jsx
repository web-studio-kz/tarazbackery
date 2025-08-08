import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ active, setActive, children }) => {
    return (
        // При клике на фон (overlay), закрываем модальное окно
        <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}>
            {/* 
              При клике на сам контент, останавливаем всплытие события,
              чтобы модальное окно не закрывалось.
            */}
            <div 
                className={active ? `${styles.modalContent} ${styles.active}` : styles.modalContent} 
                onClick={e => e.stopPropagation()}
            >
                <div onClick={() => setActive(false)} className={styles.closeButton}>
                    ✖ {/* Это HTML-символ "тяжелый крестик" */}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;