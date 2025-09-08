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

export const finalRegistration = async (tempToken, phone) => {
    const { data } = await $host.post('api/users/register/final', { tempToken, phone });
    return data; 
};

export const check = async () => {
    const { data } = await $authHost.get('api/users/auth/check');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}