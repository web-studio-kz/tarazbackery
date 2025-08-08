import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Массив товаров в корзине
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Редьюсер для добавления товара
        addItem: (state, action) => {
            const newItem = action.payload;
            // Ищем, есть ли уже такой товар в корзине (по id)
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                // Если есть, увеличиваем его количество
                existingItem.quantity++;
            } else {
                // Если нет, добавляем новый товар с количеством 1
                state.items.push({ ...newItem, quantity: 1 });
            }
        },
        // Редьюсер для удаления товара
        removeItem: (state, action) => {
            const idToRemove = action.payload;
            state.items = state.items.filter(item => item.id !== idToRemove);
        },
        // Редьюсер для увеличения количества
        incrementItem: (state, action) => {
            const idToIncrement = action.payload;
            const item = state.items.find(item => item.id === idToIncrement);
            if (item) {
                item.quantity++;
            }
        },
        // Редьюсер для уменьшения количества
        decrementItem: (state, action) => {
            const idToDecrement = action.payload;
            const item = state.items.find(item => item.id === idToDecrement);
            if (item && item.quantity > 1) {
                item.quantity--;
            } else if (item && item.quantity === 1) {
                // Если количество 1, то удаляем товар из корзины
                state.items = state.items.filter(item => item.id !== idToDecrement);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    }
});

export const { addItem, removeItem, incrementItem, decrementItem, clearCart } = cartSlice.actions;

// Селекторы для удобного получения данных из состояния
export const selectCartItems = state => state.cart.items;
export const selectCartTotalQuantity = state => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = state => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;