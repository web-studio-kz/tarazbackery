// src/routes.js (НОВАЯ, ПРАВИЛЬНАЯ ВЕРСИЯ)

import AuthPage from "./pages/AuthPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import FinishRegistrationPage from "./pages/FinishRegistrationPage"; 
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import FaqPage from './pages/FaqPage';
import ContactsPage from './pages/ContactsPage';

import {
    LOGIN_ROUTE,
    CART_ROUTE,
    MENU_ROUTE,
    PROFILE_ROUTE,
    PRODUCT_ROUTE,
    GOOGLE_CALLBACK_ROUTE,
    FINISH_REGISTRATION_ROUTE,
    ABOUT_ROUTE,
    PRIVACY_ROUTE,
    TERMS_ROUTE,
    FAQ_ROUTE,
    CONTACTS_ROUTE
} from "./utils/consts.js";


export const publicRoutes = [
    {
        path: MENU_ROUTE,
        Component: MenuPage
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: GOOGLE_CALLBACK_ROUTE, // ДОБАВЛЯЕМ: это техническая страница для обработки токена
        Component: AuthCallbackPage
    },
    {
        path: FINISH_REGISTRATION_ROUTE,
        Component: FinishRegistrationPage
    },
    { path: ABOUT_ROUTE, Component: AboutPage },
    { path: PRIVACY_ROUTE, Component: PrivacyPage },
    { path: TERMS_ROUTE, Component: TermsPage },
    { path: FAQ_ROUTE, Component: FaqPage },
    { path: CONTACTS_ROUTE, Component: ContactsPage },

];

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    }
];