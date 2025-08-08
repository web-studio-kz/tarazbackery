import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage"; 
import ProfilePage from "./pages/ProfilePage";
import { CART_ROUTE, MENU_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

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