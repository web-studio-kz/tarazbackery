import { configureStore, combineReducers } from '@reduxjs/toolkit';
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

import productReducer from './productSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

// Создаем "пустышку" для серверного рендеринга вручную
const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' 
    ? require('redux-persist/lib/storage').default 
    : createNoopStorage();

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);