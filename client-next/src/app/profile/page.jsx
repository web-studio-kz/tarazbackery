'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchOrders } from '../../http/orderAPI';
import Spinner from '../../components/ui/Spinner/Spinner';

const ProfilePage = () => {
    const { t } = useTranslation(['profile', 'product']);
    const user = useSelector(state => state.user.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchOrders()
            .then(data => setOrders(data))
            .catch(error => console.error("Ошибка при загрузке заказов:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '400px'
            }}>
                <Spinner />
            </div>
        );
    }
    
    return (
        <div>
            <h1>{t('title')}</h1>
            
            <div style={{ marginBottom: '40px', background: 'white', padding: '20px', borderRadius: '12px' }}>
                <h3>{t('my_data')}</h3>
                <p><strong>{t('name')}:</strong> {user.name || 'Не указано'}</p>
                <p><strong>{t('email')}:</strong> {user.email}</p>
                <p><strong>{t('phone')}:</strong> {user.phone || 'Не указан'}</p>
            </div>

            <div>
                <h3>{t('my_orders')}</h3>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} style={{ border: '1px solid #eee', background: 'white', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <p><strong>{t('order_number', { id: order.id })}</strong> {t('order_date', { date: new Date(order.createdAt).toLocaleDateString() })}</p>
                            <p><strong>{t('status')}:</strong> {order.status}</p>
                            {order.address && (
                                <p><strong>{t('delivery_address')}:</strong> {order.address}</p>
                            )}
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {t(`product:products.${item.Product.id}.name`, item.Product?.name || 'Название утеряно')} - {item.quantity} шт.
                                    </li>
                                ))}
                            </ul>
                            <p style={{ textAlign: 'right' }}><strong>{t('total')}: {order.totalPrice} тг.</strong></p>
                        </div>
                    ))
                ) : (
                    <p>{t('no_orders')}</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;