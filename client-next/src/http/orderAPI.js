import { $authHost } from "./index";

export const createOrder = async (orderData) => {
    const { data } = await $authHost.post('api/orders', orderData);
    return data;
}

export const fetchOrders = async () => {
    const { data } = await $authHost.get('api/orders');
    return data;
}