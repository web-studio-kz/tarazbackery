import { $host } from "./index";

export const fetchCategories = async () => {
    const { data } = await $host.get('api/categories');
    return data;
}

export const fetchProducts = async (categoryId, page, limit = 9) => {
    const { data } = await $host.get('api/products', {
        params: {
            categoryId,
            page,
            limit
        }
    });
    return data;
}

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get('api/products/' + id);
    return data;
}