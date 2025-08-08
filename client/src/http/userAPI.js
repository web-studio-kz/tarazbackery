import { $host, $authHost } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password, name, phone) => {
    const { data } = await $host.post('api/users/registration', { email, password, name, phone, role: 'USER' });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/users/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

// // Проверка токена при перезагрузке страницы
// export const check = async () => {
//     const { data } = await $authHost.get('api/users/auth');
//     localStorage.setItem('token', data.token);
//     return jwtDecode(data.token);
// }
export const finalRegistration = async (tempToken, phone) => {
    // Используем $host, так как у нас еще нет постоянного токена авторизации
    const { data } = await $host.post('api/users/register/final', { tempToken, phone });
    return data; // Ожидаем, что вернется { token: '...' }
};

export const check = async () => {
    // Используем $authHost, который автоматически подставит токен из localStorage в заголовки
    const { data } = await $authHost.get('api/users/auth/check');
    // Сохраняем свежий токен, который вернул бэкенд
    localStorage.setItem('token', data.token);
    // Декодируем и возвращаем данные пользователя
    return jwtDecode(data.token);
}