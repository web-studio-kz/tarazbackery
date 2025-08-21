// src/store/PersistGateWrapper.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './index';

export default function PersistGateWrapper({ children }) {
    // --- КЛЮЧЕВОЕ ИЗМЕНЕНИЕ ---
    // Мы рендерим PersistGate только после того, как компонент "смонтировался" на клиенте.
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Если компонент еще не смонтирован (т.е. это серверный рендер),
    // или если persistor не был создан, мы просто рендерим children без PersistGate.
    if (!isMounted || !persistor) {
        return <>{children}</>;
    }

    // Как только компонент смонтировался на клиенте, мы оборачиваем children в PersistGate.
    return (
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    );
}