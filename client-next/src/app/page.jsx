import React from 'react';
import { useTranslation } from './i18n'; // <-- Импортируем наш СЕРВЕРНЫЙ хук
import MenuWrapper from '../components/menu/MenuWrapper'; // <-- Создадим этот компонент

// Функция для получения данных на сервере
async function getData() {
    try {
        const categoriesRes = await fetch(`${process.env.API_URL}/api/categories`, { next: { revalidate: 3600 } });
        const productsRes = await fetch(`${process.env.API_URL}/api/products`, { next: { revalidate: 3600 } });
        
        if (!categoriesRes.ok || !productsRes.ok) {
            throw new Error('Failed to fetch data');
        }

        const categories = await categoriesRes.json();
        const productsData = await productsRes.json();
        
        return { categories, products: productsData.rows };
    } catch (error) {
        console.error("Data fetching error on server:", error);
        return { categories: [], products: [] };
    }
}

// metadata для SEO
export async function generateMetadata({ params: { lng } }) {
    const { t } = await useTranslation(lng, 'menu');
    return {
      title: t('title')
    }
}

// Сама страница - это СЕРВЕРНЫЙ компонент
export default async function HomePage({ params: { lng } }) {
    const { categories, products } = await getData();
    const { t } = await useTranslation(lng, 'menu');

    return (
        <div style={{ padding: '20px' }}>
            <h1>{t('title')}</h1>
            {/* 
              Мы передаем данные, полученные на сервере, в КЛИЕНТСКИЙ компонент-обертку,
              который будет отвечать за всю интерактивность.
            */}
            <MenuWrapper initialCategories={categories} initialProducts={products} />
        </div>
    );
}