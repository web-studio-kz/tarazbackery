import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { authRoutes, publicRoutes } from '../routes'; 
// Импортируем HOME_ROUTE
import { HOME_ROUTE } from '../utils/consts'; 

const AppRouter = () => {
    const { isAuth } = useSelector(state => state.user); 

    return (
        <Routes>
            {/* Приватные маршруты */}
            {isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}

            {/* Публичные маршруты */}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}

            {/* Редирект на ЛЕНДИНГ, если адрес не найден */}
            <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;