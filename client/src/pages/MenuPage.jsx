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
    const { t } = useTranslation(['menu', 'common']);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const categoryId = selectedCategory ? selectedCategory.id : null;
            try {
                const [productsData, categoriesData] = await Promise.all([
                    fetchProducts(categoryId, currentPage, limit),
                    fetchCategories()
                ]);
                if (isMounted) {
                    dispatch(setProducts(productsData));
                    dispatch(setCategories(categoriesData));
                }
            } catch (error) {
                console.error("Ошибка загрузки:", error);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [selectedCategory?.id, currentPage, limit, dispatch]);

    const handleSelectCategory = (category) => {
        dispatch(setSelectedCategory(category));
    };

    return (
        <div>
            <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>{t('title')}</h1>
            
            <CategoryBar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
            />
            
            {/* Теперь товары и пагинация снова на экране */}
            <ProductList products={products} />
            <Pages />
        </div>
    );
};

export default MenuPage;