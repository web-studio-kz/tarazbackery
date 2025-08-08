// src/store/index.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';

// 1. Импортируем все необходимое из redux-persist
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // <-- Используем localStorage

// Импортируем наши редьюсеры, как и раньше
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

// 2. Создаем конфигурацию для persist
const persistConfig = {
    key: 'root',      // Ключ, под которым все будет храниться в localStorage
    storage,          // Хранилище (мы выбрали localStorage)
    whitelist: ['cart'] // <-- ВАЖНО: Указываем, какие "срезы" состояния нужно сохранять.
                      // Мы хотим сохранять только корзину.
};

// 3. Объединяем наши редьюсеры в один корневой редьюсер
const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
});

// 4. Оборачиваем наш корневой редьюсер в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 5. Создаем store, используя persistedReducer
export const store = configureStore({
    reducer: persistedReducer, // <-- Используем новый редьюсер
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Эта настройка нужна, чтобы избежать ошибок с несериализуемыми данными,
            // которые redux-persist добавляет в экшены.
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// 6. Создаем persistor, который будет управлять процессом сохранения
export const persistor = persistStore(store);