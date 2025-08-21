import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../store/productSlice'; // Проверьте путь
import styles from './Pages.module.css';

const Pages = () => {
    const dispatch = useDispatch();
    const { totalCount, limit, currentPage } = useSelector(state => state.products);

    const pageCount = Math.ceil(totalCount / limit);
    
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    if (pageCount <= 1) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            {pages.map(page =>
                <div
                    key={page}
                    className={currentPage === page ? styles.currentPage : styles.page}
                    onClick={() => dispatch(setCurrentPage(page))}
                >
                    {page}
                </div>
            )}
        </div>
    );
};

export default Pages;