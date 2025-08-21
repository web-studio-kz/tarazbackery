import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const $host = axios.create({
    baseURL: API_URL
});

const $authHost = axios.create({
    baseURL: API_URL
});

const authInterceptor = config => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
    }
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (typeof window !== 'undefined' && error.response && error.response.status === 401) {
            console.log("INTERCEPTOR: Получена ошибка 401. Токен истек.");
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);


export {
    $host,
    $authHost
};