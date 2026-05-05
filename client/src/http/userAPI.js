import { $host, $authHost } from "./index";

export const registration = async (email, password, name, phone) => {
    const { data } = await $host.post('api/users/registration', { email, password, name, phone, role: 'USER' });
    return data; 
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/users/login', { email, password });
    return data;
}

export const finalRegistration = async (tempToken, phone) => {
    const { data } = await $host.post('api/users/register/final', { tempToken, phone });
    return data; 
};

export const check = async () => {
    const { data } = await $authHost.get('api/users/auth/check');
    return data; 
}

export const logout = async () => {
    const { data } = await $authHost.post('api/users/logout');
    return data;
}