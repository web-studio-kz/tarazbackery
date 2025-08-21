// src/components/ProductItem/ProductItem.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { addItem, selectCartItems } from '../../store/cartSlice'; 
import styles from './ProductItem.module.css'; 
import { PRODUCT_ROUTE } from '../../utils/consts';

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation(['product', 'common']);
    
    // --- 1. ДОБАВЛЯЕМ ЗАЩИТУ ---
    // Если по какой-то причине продукт не пришел, рендерим "заглушку" или ничего
    if (!product) {
        return null; 
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`;
    const cartItems = useSelector(selectCartItems);
    const isInCart = cartItems.some(item => item.id === product.id);
    
    const productName = t(`products.${product.id}.name`);

    const handleAddToCart = () => {
        dispatch(addItem(product));
        toast.success(
            t('common:toasts.add_to_cart_success', { name: productName })
        );
    };

    const buttonClassName = isInCart ? styles.inCartButton : styles.button;

    return (
        <div className={styles.card}>
            {/* --- 2. ИСПРАВЛЯЕМ `Link` --- */}
            <Link href={`${PRODUCT_ROUTE}/${product.id}`} className={styles.linkWrapper}>
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={productName} className={styles.image} />
                </div>
                <h4 className={styles.title}>{productName}</h4>
                <p className={styles.price}>{t('product:price_label', { price: product.price })}</p>
            </Link>
            <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={buttonClassName} 
            >
                 {isInCart ? t('in_cart') : t('add_to_cart')}
            </button>
        </div>
    );
};

export default ProductItem;