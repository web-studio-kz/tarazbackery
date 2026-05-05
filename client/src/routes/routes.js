import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage"; 
import ProfilePage from "./pages/ProfilePage";
// 1. Импортируй HomePage
import HomePage from "./pages/HomePage"; 
import { HOME_ROUTE, CART_ROUTE, MENU_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const publicRoutes = [
    // 2. Добавь его в список
    {
        path: HOME_ROUTE, // это '/'
        Component: HomePage
    },
    {
        path: MENU_ROUTE, // это '/menu'
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
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    }
];

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    }
];