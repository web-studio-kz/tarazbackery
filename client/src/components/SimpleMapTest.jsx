// src/components/SimpleMapTest.jsx

import React from 'react';
import { YMaps, Map } from '@pbe/react-yandex-maps';

const SimpleMapTest = () => {

    // Простейшая функция, которая просто пишет в консоль
    const handleMapClick = (e) => {
        const coords = e.get('coords');
        console.log('--- КЛИК ПО КАРТЕ СРАБОТАЛ! ---');
        console.log('Координаты:', coords);
    };

    return (
        <div>
            <h2>Тестовая карта</h2>
            <p>Пожалуйста, кликните по любому месту на карте ниже.</p>
            <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAP_API_KEY }}>
                <Map
                    defaultState={{ center: [42.90, 71.37], zoom: 12 }}
                    width="100%"
                    height="400px"
                    onClick={handleMapClick} // <-- Единственное событие, которое нас интересует
                />
            </YMaps>
        </div>
    );
};

export default SimpleMapTest;