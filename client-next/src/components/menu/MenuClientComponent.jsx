'use client'; // <-- 1. "Магическая" директива!

import { useState, useEffect } from 'react';
import CategoryBar from '../CategoryBar/CategoryBar';
import ProductList from '../ProductList/ProductList';
// Нам все равно нужно будет получать данные на клиенте для фильтрации

// 2. Компонент принимает начальные данные как props
export default function MenuClientComponent({ initialCategories, initialProducts }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(initialProducts);

  // 3. Логика фильтрации на клиенте
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const categoryId = selectedCategory ? selectedCategory.id : null;
      // Здесь мы делаем запрос к API, чтобы отфильтровать товары
      // Это можно будет оптимизировать позже
      const res = await fetch(`/api/products?categoryId=${categoryId || ''}`); // Используем относительный URL
      const data = await res.json();
      setProducts(data.rows);
    };

    if (selectedCategory !== null) { // Условие для загрузки при смене категории
        fetchFilteredProducts();
    } else {
        setProducts(initialProducts); // Возвращаем начальные, если выбрано "Все"
    }
  }, [selectedCategory, initialProducts]);

  return (
    <>
      <CategoryBar 
        categories={initialCategories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      <ProductList products={products} />
    </>
  );
}