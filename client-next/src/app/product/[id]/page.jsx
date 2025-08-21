'use client'; 
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { fetchOneProduct } from '../../../http/productAPI';
import { addItem, selectCartItems } from '../../../store/cartSlice';
import Spinner from '../../../components/ui/Spinner/Spinner';
import styles from './ProductPage.module.css';

const ProductPage = () => {
    const { t } = useTranslation(['product', 'common']);
    const dispatch = useDispatch();
    
    
    const params = useParams(); 
    const router = useRouter();   
    const { id } = params;      

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const cartItems = useSelector(selectCartItems);
    const isInCart = product ? cartItems.some(item => item.id === product.id) : false;

    useEffect(() => {
        if (!id) return; 

        setLoading(true);
        fetchOneProduct(id)
            .then(data => setProduct(data))
            .catch(e => {
                console.error(e);
                toast.error(t('common:product_not_found')); 
                router.push('/'); 
            })
            .finally(() => setLoading(false));
    }, [id, router, t, dispatch]); 

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
        return <h2>{t('common:product_not_found')}</h2>;
    }

    return (
        <div className={styles.productPage}>
            <div className={styles.imageColumn}>
                <img 
                    
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`} 
                    alt={t(`products.${product.id}.name`)}
                />
            </div>
            <div className={styles.infoColumn}>
                <h1>{t(`products.${product.id}.name`)}</h1>
                <p className={styles.description}>{t(`products.${product.id}.description`)}</p>
                <div className={styles.footer}>
                    
                    <span className={styles.price}>{t('product:price_label')}: {product.price} тг.</span>
                    <button 
                        onClick={handleAddToCart} 
                        className={isInCart ? styles.inCartButton : styles.addButton}
                        disabled={isInCart}
                    >
                        {isInCart ? t('product:in_cart') : t('product:add_to_cart')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;