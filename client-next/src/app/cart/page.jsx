'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import styles from './CartPage.module.css';
import { useTranslation } from 'react-i18next';

import {
    clearCart,
    selectCartItems,
    selectCartTotalPrice,
    incrementItem,
    decrementItem
} from '../../store/cartSlice';
import { createOrder } from '../../http/orderAPI';
import { getCartSignature } from '../../http/cartAPI';
import { LOGIN_ROUTE, MENU_ROUTE, PROFILE_ROUTE } from '../../utils/consts';
import Modal from '../../components/ui/Modal/Modal';
import MapPicker from '../../components/MapPicker/MapPicker';

export default function CartPage() {
    const { t } = useTranslation(['cart', 'product', 'common']);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const itemsTotal = useSelector(selectCartTotalPrice); 
    const cartItems = useSelector(selectCartItems);
    const { isAuth } = useSelector(state => state.user);

    const [deliveryMethod, setDeliveryMethod] = useState('PICKUP');
    const DELIVERY_COST = 1000;
    const finalTotal = deliveryMethod === 'DELIVERY' ? itemsTotal + DELIVERY_COST : itemsTotal;

    const [mapModalActive, setMapModalActive] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const [isAddressValid, setIsAddressValid] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const handleAddressSelect = (addressData) => {
        setDeliveryAddress(addressData);
        setIsAddressValid(addressData.isValid);
    };
    
    const handleProceedToCheckout = () => {
        if (!isAuth) {
            toast.warn(t('common:toasts.login_required'));
            return router.push(LOGIN_ROUTE);
        }
        
        if (deliveryMethod === 'DELIVERY') {
            setMapModalActive(true);
        } else {
            handleFinalizeOrder();
        }
    };
    
    const handleFinalizeOrder = async () => {
        setIsProcessing(true);
        try {
            const signature = await getCartSignature(cartItems);

            let orderData = {
                items: cartItems,
                totalPrice: finalTotal,
                deliveryType: deliveryMethod,
                signature: signature,
            };

            if (deliveryMethod === 'DELIVERY') {
                if (!deliveryAddress || !isAddressValid) {
                    throw new Error(t('cart:address_error'));
                }
                orderData = { ...orderData, ...deliveryAddress };
            }
            
            const response = await createOrder(orderData);
            toast.success(response.message || t('common:toasts.order_success'));
            dispatch(clearCart());
            setMapModalActive(false);
            router.push(PROFILE_ROUTE);
        } catch (e) {
            const errorMessage = e.response?.data?.message || e.message || "Произошла ошибка";
            toast.error(errorMessage);
            if (e.response && e.response.status === 401) {
                // ... обработка 401
            }
        } finally {
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) { 
        return (
            <div className={styles.emptyCart}>
                <h2>{t('cart:empty_title')}</h2>
                <Link href={MENU_ROUTE} className={styles.emptyCartButton}>
                    {t('cart:back_to_menu')}
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <h1>{t('cart:title')}</h1>

            {/* --- ВОТ ВОССТАНОВЛЕННЫЙ БЛОК --- */}
            <div className={styles.cartItems}>
                {cartItems.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`}
                            alt={t(`product:products.${item.id}.name`)}
                            className={styles.itemImage}
                        />
                        <div className={styles.itemDetails}>
                            <span className={styles.itemName}>
                                {t(`product:products.${item.id}.name`)}
                            </span>
                            <div className={styles.itemControls}>
                                <button onClick={() => dispatch(decrementItem(item.id))}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => dispatch(incrementItem(item.id))}>+</button>
                            </div>
                        </div>
                        <span className={styles.itemPrice}>
                            {(item.price * item.quantity).toFixed(2)} тг.
                        </span>
                    </div>
                ))}
            </div>
            {/* --- КОНЕЦ ВОССТАНОВЛЕННОГО БЛОКА --- */}

            <div className={styles.deliveryOptions}>
                 <h2>{t('cart:delivery_method_title')}</h2>
                 <div className={styles.methodButtons}>
                     <button 
                         className={deliveryMethod === 'PICKUP' ? styles.activeMethod : styles.methodButton}
                         onClick={() => setDeliveryMethod('PICKUP')}
                     >
                         {t('cart:pickup')}
                     </button>
                     <button 
                         className={deliveryMethod === 'DELIVERY' ? styles.activeMethod : styles.methodButton}
                         onClick={() => setDeliveryMethod('DELIVERY')}
                     >
                         {t('cart:delivery_with_cost', { cost: DELIVERY_COST })}
                     </button>
                 </div>
            </div>

            <div className={styles.totalSection}>
                <strong className={styles.totalPrice}>{t('common:total')}: {finalTotal.toFixed(2)} тг.</strong>
                <button onClick={handleProceedToCheckout} disabled={isProcessing} className={styles.orderButton}>
                    {isProcessing ? "Обработка..." : t('go_to_checkout')}
                </button>
            </div>
            
            <Modal active={mapModalActive} setActive={setMapModalActive}>
                <div className={styles.deliverySection}>
                    <h2>{t('delivery_address_title')}</h2>
                    <p>{t('delivery_address_subtitle')}</p>
                    <MapPicker onAddressSelect={handleAddressSelect} />
                    {deliveryAddress && (
                        <div className={isAddressValid ? styles.addressInfo : styles.addressError}>
                            <p><b>{t('selected_address')}</b> {deliveryAddress.address}</p>
                            {!isAddressValid && <p><b>{t('address_error')}</b></p>}
                        </div>
                    )}
                    <div className={styles.modalFooter}>
                        <button
                            onClick={handleFinalizeOrder}
                            disabled={!deliveryAddress || !isAddressValid || isProcessing}
                            className={styles.orderButton}
                        >
                            {isProcessing ? "Обработка..." : t('confirm_order')}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};