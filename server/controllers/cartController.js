const crypto = require('crypto');
const ApiError = require('../error/ApiError');

/**
 * Создает каноническую строку из массива товаров.
 * Это критически важно, чтобы строка всегда была одинаковой для одного и того же состава корзины.
 * 1. Сортируем товары по ID, чтобы порядок не имел значения.
 * 2. Преобразуем в формат "id:quantity;".
 * @param {Array<object>} items - Массив товаров, например [{ id: 3, quantity: 1 }, { id: 1, quantity: 2 }]
 * @returns {string} - Каноническая строка, например "1:2;3:1;"
 */
const createCanonicalString = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        return '';
    }
    return items
        .slice() // Создаем копию, чтобы не изменять оригинальный массив
        .sort((a, b) => a.id - b.id)
        .map(item => `${item.id}:${item.quantity}`)
        .join(';') + ';';
};

class CartController {
    createSignature(req, res, next) {
        try {
            const { items } = req.body;
            if (!items) {
                return next(ApiError.badRequest('Отсутствует состав корзины'));
            }

            // 1. Создаем каноническую строку из полученных товаров.
            const canonicalString = createCanonicalString(items);

            // 2. Создаем HMAC-хэш (подпись) с использованием нашего секретного ключа.
            const signature = crypto
                .createHmac('sha256', process.env.SECRET_KEY)
                .update(canonicalString)
                .digest('hex');
            
            // 3. Возвращаем сгенерированную подпись клиенту.
            res.json({ signature });

        } catch (e) {
            next(ApiError.internal('Ошибка при создании подписи'));
        }
    }
}

module.exports = new CartController();