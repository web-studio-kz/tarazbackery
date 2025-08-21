import { $authHost } from "./index";

export const getCartSignature = async (items) => {
    const { data } = await $authHost.post('api/cart/signature', { items });
    return data.signature;
};