// src/pages/ProductPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams для получения id из URL
import { fetchOneProduct } from '../http/productAPI';
import { useTranslation } from 'react-i18next';
import Spinner from '../components/ui/Spinner/Spinner';
import styles from './ProductPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from '../store/cartSlice';
import { toast } from 'react-toastify';

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation(['product', 'common']);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const isInCart = product ? cartItems.some(item => item.id === product.id) : false;

    useEffect(() => {
        setLoading(true);
        fetchOneProduct(id)
            .then(data => setProduct(data))
            .catch(e => {
                console.error(e);
                toast.error("Товар не найден");
                navigate('/'); // Если товар не найден, уводим на главную
            })
            .finally(() => setLoading(false));
    }, [id, navigate]); // Эффект будет перезапускаться, если id в URL изменится

    const handleAddToCart = () => {
        dispatch(addItem(product));
        toast.success(
            t('common:toasts.add_to_cart_success', { 
                name: t(`products.${product.id}.name`) 
            })
        );
    };

    if (loading) {
        return <Spinner fullPage={true} />;
    }

    if (!product) {
        return <h2>Товар не найден</h2>; // На случай, если что-то пошло не так
    }

    return (
        <div className={styles.productPage}>
            <div className={styles.imageColumn}>
                <img 
                    src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`} 
                    alt={t(`products.${product.id}.name`)} // 3. Переводим alt-текст
                />
            </div>
            <div className={styles.infoColumn}>
                <h1>{t(`products.${product.id}.name`)}</h1>
                <p className={styles.description}>{t(`products.${product.id}.description`)}</p>
                <div className={styles.footer}>
                    
                    <div className={styles.priceContainer}> {/* Добавляем обертку */}
                    <span className={styles.price}>{t('price_label')} {product.price} тг.</span>
                    </div>
                    <button 
                        onClick={handleAddToCart} 
                        className={isInCart ? styles.inCartButton : styles.addButton} // Условный класс
                        disabled={isInCart} // Блокируем, если в корзине
                    >
                        {isInCart ? t('in_cart') : t('add_to_cart')} {/* Условный текст */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;