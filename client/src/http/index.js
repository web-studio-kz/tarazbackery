import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const $host = axios.create({
    baseURL: API_URL,
    withCredentials: true // Обязательно
});

const $authHost = axios.create({
    baseURL: API_URL,
    withCredentials: true // Обязательно
});

// Интерцептор на запрос УДАЛЕН (он больше не нужен)

$authHost.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // ОЧЕНЬ ВАЖНО: 
            // Просто выводим в консоль, НО НЕ ДЕЛАЕМ window.location.href = '/login'
            // Иначе гость никогда не попадет на главную!
            console.log("Сессия отсутствует или истекла");
        }
        return Promise.reject(error);
    }
);

export { $host, $authHost };