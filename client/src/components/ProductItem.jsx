import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector добавлен
import { addItem, selectCartItems } from '../store/cartSlice'; // selectCartItems добавлен

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const imageUrl = `http://localhost:5001/${product.imageUrl}`;
    const cartItems = useSelector(selectCartItems);
    const isInCart = cartItems.some(item => item.id === product.id);
    const handleAddToCart = () => {
        dispatch(addItem(product));
    };

    const buttonStyle = {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s, color 0.3s', 
    };

    const inCartStyle = {
        ...buttonStyle,
        backgroundColor: '#e31837',
        color: 'white',
        cursor: 'default', 
    };

    const notInCartStyle = {
        ...buttonStyle,
        backgroundColor: '#f0f0f0', 
        color: 'black',
    };

    return (
        <div style={{ border: '1px solid #eee', padding: '15px', width: '220px', textAlign: 'center' }}>
            <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
            <h4>{product.name}</h4>
            <p>Цена: <strong>{product.price} тг.</strong></p>
            <button
                onClick={handleAddToCart}
                disabled={isInCart}
                style={isInCart ? inCartStyle : notInCartStyle}
            >
                {isInCart ? 'В корзине' : 'В корзину'}
            </button>
        </div>
    );
};

export default ProductItem;