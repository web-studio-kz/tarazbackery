import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './CartPage.module.css';
import { useTranslation } from 'react-i18next';

import {
    clearCart,
    selectCartItems,
    selectCartTotalPrice,
    incrementItem,
    decrementItem
} from '../store/cartSlice';
import { setUser, setIsAuth } from '../store/userSlice';
import { createOrder } from '../http/orderAPI';
import { LOGIN_ROUTE, MENU_ROUTE, PROFILE_ROUTE } from '../utils/consts';
import Modal from '../components/ui/Modal/Modal';
import MapPicker from '../components/MapPicker/MapPicker';

const CartPage = () => {
    const { t } = useTranslation(['cart', 'product', 'common']);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // --- НАЧАЛО ИЗМЕНЕНИЙ ---

    // 1. Получаем из Redux ТОЛЬКО стоимость товаров
    const itemsTotal = useSelector(selectCartTotalPrice); 
    const cartItems = useSelector(selectCartItems);
    const { isAuth } = useSelector(state => state.user);

    // 2. Добавляем состояние для метода доставки и задаем константу
    const [deliveryMethod, setDeliveryMethod] = useState('PICKUP'); // 'PICKUP' по умолчанию
    const DELIVERY_COST = 1000;

    // 3. Динамически рассчитываем финальную стоимость
    const finalTotal = deliveryMethod === 'DELIVERY' ? itemsTotal + DELIVERY_COST : itemsTotal;

    const [mapModalActive, setMapModalActive] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const [isAddressValid, setIsAddressValid] = useState(false);
    
    const handleAddressSelect = (addressData) => {
        setDeliveryAddress(addressData);
        setIsAddressValid(addressData.isValid);
    };
    
    // 4. Главная кнопка теперь открывает модальное окно с картой или сразу отправляет заказ
    const handleProceedToCheckout = () => {
        if (!isAuth) {
            toast.warn(t('common:toasts.login_required'));
            return navigate(LOGIN_ROUTE);
        }
        
        if (deliveryMethod === 'DELIVERY') {
            setMapModalActive(true);
        } else { // deliveryMethod === 'PICKUP'
            handleFinalizeOrder();
        }
    };
    
    // 5. Функция отправки заказа теперь использует правильную цену и метод
    const handleFinalizeOrder = async () => {
        let orderData = {
            items: cartItems,
            totalPrice: finalTotal, // <-- Отправляем финальную стоимость
            deliveryType: deliveryMethod, // <-- Отправляем выбранный метод
        };

        if (deliveryMethod === 'DELIVERY') {
            if (!deliveryAddress || !isAddressValid) {
                return toast.error(t('cart:address_error'));
            }
            orderData = { ...orderData, ...deliveryAddress };
        }
        
        try {
            const response = await createOrder(orderData);
            toast.success(response.message || t('common:toasts.order_success'));
            dispatch(clearCart());
            setMapModalActive(false);
            navigate(PROFILE_ROUTE);
        } catch (e) {
            // ... (обработка ошибок)
            if (e.response && e.response.status === 401) { /*...*/ } else { /*...*/ }
        }
    };

    // --- КОНЕЦ ИЗМЕНЕНИЙ ---

    if (cartItems.length === 0) { 
        return (
            <div className={styles.emptyCart}>
                <h2>{t('cart:empty_title')}</h2>
                <Link to={MENU_ROUTE} className={styles.emptyCartButton}>
                    {t('cart:back_to_menu')}
                </Link>
            </div>
        );
     }

    return (
        <div className={styles.page}>
            <h1>{t('cart:title')}</h1>

            <div className={styles.cartItems}>
                {cartItems.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <img
                            src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
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
                            {(item.price * item.quantity)} тг.
                        </span>
                    </div>
                ))}
            </div>

            {/* --- 6. НОВЫЙ БЛОК ВЫБОРА ДОСТАВКИ --- */}
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
                {/* 7. Отображаем финальную стоимость */}
                <strong className={styles.totalPrice}>{t('common:total')}: {finalTotal} тг.</strong>
                <button onClick={handleProceedToCheckout} className={styles.orderButton}>
                    {t('go_to_checkout')}
                </button>
            </div>
            
            <Modal active={mapModalActive} setActive={setMapModalActive}>
                <div className={styles.deliverySection}>
                    <h2>{t('delivery_address_title')}</h2>
                    {/* <p>{t('delivery_address_subtitle')}</p> */}
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
                            disabled={!deliveryAddress || !isAddressValid}
                            className={styles.orderButton}
                        >
                            {t('confirm_order')}
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default CartPage;