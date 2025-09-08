import React from 'react';
import styles from './CategoryBar.module.css';
import { useTranslation } from 'react-i18next';

const categoryIdToKeyMap = {
    1: 'category_burgers',
    2: 'category_baskets',
    3: 'category_drinks',
    4: 'category_cheesy',
};

const CategoryBar = ({ categories, selectedCategory, onSelectCategory }) => {

    const { t } = useTranslation('menu');

    return (
        <div className={styles.wrapper}>
        <button
            onClick={() => onSelectCategory(null)}
            className={selectedCategory === null ? styles.activeButton : styles.button}
        >
             {t('all_category')}
        </button>
    {categories.map(category => (
        <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={selectedCategory?.id === category.id ? styles.activeButton : styles.button}
        >
            {t(categoryIdToKeyMap[category.id])}
        </button>
    ))}
</div>
    );
};

export default CategoryBar;