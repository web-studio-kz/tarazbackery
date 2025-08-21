// src/components/menu/MenuWrapper.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from '@/app/i18n/client';
import CategoryBar from '../CategoryBar/CategoryBar';
import ProductList from '../ProductList/ProductList';
import Spinner from '../ui/Spinner/Spinner';
import { fetchProducts, fetchCategories } from '../../http/productAPI';
import { setProducts, setSelectedCategory, setCategories } from '../../store/productSlice';

export default function MenuWrapper({ initialCategories, initialProducts }) {
    const { t } = useTranslation('menu');
    const dispatch = useDispatch();
    
    const { products, selectedCategory } = useSelector(state => state.products);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(setCategories(initialCategories));
        dispatch(setProducts({ rows: initialProducts, count: initialProducts.length }));
    }, [initialCategories, initialProducts, dispatch]);

    useEffect(() => {
        if (selectedCategory === undefined) return;
        
        if (selectedCategory === null) {
            dispatch(setProducts({ rows: initialProducts, count: initialProducts.length }));
            return;
        }

        setLoading(true);
        const categoryId = selectedCategory ? selectedCategory.id : null;
        fetchProducts(categoryId, 1, 9).then(data => {
            dispatch(setProducts(data));
        }).finally(() => {
            setLoading(false);
        });
    }, [selectedCategory, dispatch, initialProducts]);
    
    const handleSelectCategory = (category) => {
        dispatch(setSelectedCategory(category));
    };

    return (
        <>
            <CategoryBar
                categories={initialCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
            />
            {loading ? <Spinner /> : <ProductList products={products} />}
        </>
    );
}