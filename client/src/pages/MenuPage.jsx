import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../http/productAPI';
import { setCategories, setProducts, setSelectedCategory } from '../store/productSlice';
import CategoryBar from '../components/CategoryBar/CategoryBar';
import ProductList from '../components/ProductList/ProductList';
import Pages from '../components/ui/Pages/Pages';
import { useTranslation } from 'react-i18next';

const MenuPage = () => {
    const dispatch = useDispatch();
    
    const { categories, products, selectedCategory, currentPage, limit } = useSelector(state => state.products);

    useEffect(() => {
        const categoryId = selectedCategory ? selectedCategory.id : null;
        fetchProducts(categoryId, currentPage, limit).then(data => {
            dispatch(setProducts(data)); 
        });
    }, [selectedCategory, currentPage, limit, dispatch]);
    
    useEffect(() => {
        fetchCategories().then(data => dispatch(setCategories(data)));
    }, [dispatch]);

    const handleSelectCategory = (category) => {
        dispatch(setSelectedCategory(category));
    };
    const { t } = useTranslation('menu');


    return (
        <div>
            <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>{t('title')}</h1>
            
            <CategoryBar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
            />
            
            <ProductList products={products} />
            <Pages />
        </div>
    );
};

export default MenuPage;