// src/components/AppRouter.jsx (ВРЕМЕННАЯ ОТЛАДОЧНАЯ ВЕРСИЯ)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '../routes'; // У нас сейчас все роуты публичные для теста
import { MENU_ROUTE } from '../utils/consts';

const AppRouter = () => {
    console.log("AppRouter рендерится. Список роутов:", publicRoutes);

    return (
        <Routes>
            {/* Рендерим ВСЕ роуты, которые есть в publicRoutes */}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}

            {/* Если ничего не подошло, перенаправляем на главную */}
            <Route path="*" element={<Navigate to={MENU_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;