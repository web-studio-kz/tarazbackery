import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], 
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload;
            state.items = state.items.filter(item => item.id !== idToRemove);
        },
        incrementItem: (state, action) => {
            const idToIncrement = action.payload;
            const item = state.items.find(item => item.id === idToIncrement);
            if (item) {
                item.quantity++;
            }
        },
        decrementItem: (state, action) => {
            const idToDecrement = action.payload;
            const item = state.items.find(item => item.id === idToDecrement);
            if (item && item.quantity > 1) {
                item.quantity--;
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter(item => item.id !== idToDecrement);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    }
});

export const { addItem, removeItem, incrementItem, decrementItem, clearCart } = cartSlice.actions;
export const selectCartItems = state => state.cart.items;
export const selectCartTotalQuantity = state => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = state => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export default cartSlice.reducer;