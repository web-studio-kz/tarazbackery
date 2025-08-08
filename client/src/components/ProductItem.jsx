import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector добавлен
import { addItem, selectCartItems } from '../store/cartSlice'; // selectCartItems добавлен

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const imageUrl = `http://localhost:5001/${product.imageUrl}`;

    // 1. Получаем все товары из корзины с помощью селектора
    const cartItems = useSelector(selectCartItems);

    // 2. Проверяем, есть ли ТЕКУЩИЙ продукт в корзине
    const isInCart = cartItems.some(item => item.id === product.id);

    const handleAddToCart = () => {
        // Мы отправляем действие, даже если товар уже в корзине.
        // Наша логика в cartSlice сама разберется: увеличить quantity или добавить новый.
        dispatch(addItem(product));
    };

    // 3. Определяем стили для кнопки в зависимости от того, в корзине ли товар
    const buttonStyle = {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s, color 0.3s', // Плавный переход цвета
    };

    const inCartStyle = {
        ...buttonStyle,
        backgroundColor: '#e31837', // Красный цвет KFC
        color: 'white',
        cursor: 'default', // Можно сделать курсор обычным, показывая, что действие выполнено
    };

    const notInCartStyle = {
        ...buttonStyle,
        backgroundColor: '#f0f0f0', // Стандартный серый цвет
        color: 'black',
    };

    return (
        <div style={{ border: '1px solid #eee', padding: '15px', width: '220px', textAlign: 'center' }}>
            <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
            <h4>{product.name}</h4>
            <p>Цена: <strong>{product.price} тг.</strong></p>
            <button
                onClick={handleAddToCart}
                // Отключаем кнопку, если товар уже в корзине, чтобы избежать повторных кликов
                disabled={isInCart}
                // Применяем стили в зависимости от состояния
                style={isInCart ? inCartStyle : notInCartStyle}
            >
                {isInCart ? 'В корзине' : 'В корзину'}
            </button>
        </div>
    );
};

export default ProductItem;