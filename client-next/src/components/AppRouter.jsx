
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { authRoutes, publicRoutes } from '../routes'; 
import { MENU_ROUTE } from '../utils/consts'; 

const AppRouter = () => {
    const { isAuth } = useSelector(state => state.user); 

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}

            <Route path="*" element={<Navigate to={MENU_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;