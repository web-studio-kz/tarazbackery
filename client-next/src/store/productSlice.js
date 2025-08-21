import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    products: [],
    selectedCategory: null,
    currentPage: 1,
    totalCount: 0, 
    limit: 8,     
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setProducts: (state, action) => {
            if (action.payload && Array.isArray(action.payload.rows)) {
                state.products = action.payload.rows;
                state.totalCount = action.payload.count;
            } else {
                console.error("setProducts ожидал объект вида { count, rows }, но получил:", action.payload);
            }
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setCategories, setProducts, setSelectedCategory, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;