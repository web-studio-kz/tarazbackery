import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from '../../store/cartSlice'; 
import styles from './ProductItem.module.css'; 
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../../utils/consts';
import { useTranslation } from 'react-i18next';


const ProductItem = ({ product, index }) => {
    const dispatch = useDispatch();
    const imageUrl = `${import.meta.env.VITE_API_URL}${product.imageUrl}`;
    const cartItems = useSelector(selectCartItems);
    const isInCart = cartItems.some(item => item.id === product.id);
    const { t } = useTranslation('product', 'common');

    const handleAddToCart = () => {
        dispatch(addItem(product));
        toast.success(t(`products.${product.id}.name`) + ' ' + t('common:toasts.add_to_cart_success'));
    };

    const buttonClassName = isInCart ? styles.inCartButton : styles.button;

    return (
        <div className={styles.card}>
            <Link to={PRODUCT_ROUTE + '/' + product.id} className={styles.linkWrapper}>
                <div className={styles.imageContainer}>
                <img
                    src={imageUrl} 
                    alt={product.name} 
                    className={styles.image} 
                    width="250"     
                    height="180"    
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchpriority={index === 0 ? "high" : "auto"}
                />  
                </div>
                <h4 className={styles.title}>{t(`products.${product.id}.name`)}</h4>
                <p className={styles.price}>{t('price_label')} <strong>{product.price} тг.</strong></p>
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