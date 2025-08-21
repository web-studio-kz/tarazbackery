const crypto = require('crypto'); // <-- ВОТ НЕДОСТАЮЩАЯ СТРОКА
const { Order, OrderItem, Product, User } = require('../models');
const ApiError = require('../error/ApiError');
const mailService = require('../services/mailService');

const DELIVERY_COST = 1000;

const createCanonicalString = (items) => {
    if (!Array.isArray(items) || items.length === 0) return '';
    return items
        .slice()
        .sort((a, b) => a.id - b.id)
        .map(item => `${item.id}:${item.quantity}`)
        .join(';') + ';';
};

class OrderController {
    async create(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { items, deliveryType, address, latitude, longitude, signature } = req.body;

            if (!items || items.length === 0 || !signature) {
                return next(ApiError.badRequest('Неполные данные для создания заказа.'));
            }

            const canonicalString = createCanonicalString(items);
            const expectedSignature = crypto
                .createHmac('sha256', process.env.SECRET_KEY)
                .update(canonicalString)
                .digest('hex');

            const receivedSignBuffer = Buffer.from(signature, 'hex');
            const expectedSignBuffer = Buffer.from(expectedSignature, 'hex');

            if (receivedSignBuffer.length !== expectedSignBuffer.length || !crypto.timingSafeEqual(receivedSignBuffer, expectedSignBuffer)) {
                return next(ApiError.badRequest('Ошибка проверки целостности корзины.'));
            }

            const productIds = items.map(item => item.id);
            const productsFromDb = await Product.findAll({ where: { id: productIds } });

            if (productsFromDb.length !== productIds.length) {
                return next(ApiError.badRequest('Один или несколько товаров не найдены в базе данных.'));
            }

            const productMap = new Map(productsFromDb.map(p => [p.id, p]));
            let itemsTotalPrice = 0;
            for (const item of items) {
                const product = productMap.get(item.id);
                itemsTotalPrice += product.price * item.quantity;
            }
            
            let finalPrice = itemsTotalPrice;
            if (deliveryType === 'DELIVERY') {
                finalPrice += DELIVERY_COST;
            }

            const orderData = {
                userId,
                totalPrice: finalPrice,
                status: 'PENDING',
                deliveryType,
            };

            if (deliveryType === 'DELIVERY') {
                if (!address || !latitude || !longitude) {
                    return next(ApiError.badRequest('Для доставки необходимо указать адрес на карте.'));
                }
                orderData.address = address;
                orderData.latitude = latitude;
                orderData.longitude = longitude;
            }

            const order = await Order.create(orderData);
            
            const orderItems = items.map(item => {
                const product = productMap.get(item.id); 
                return {
                    orderId: order.id,
                    productId: item.id,
                    quantity: item.quantity,
                    price: product.price
                };
            });
            await OrderItem.bulkCreate(orderItems);

            const user = await User.findByPk(userId);
            const itemsWithProducts = await OrderItem.findAll({
                where: { orderId: order.id },
                include: [{ model: Product, as: 'Product' }]
            });
            
            mailService.sendNewOrderNotification(order, user, itemsWithProducts);
            
            return res.json({ message: "Заказ успешно создан!", orderId: order.id });

        } catch (e) {
            console.error("!!! ОШИБКА В CREATE ORDER:", e); // Оставим отладку на всякий случай
            return next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res) {
        const { id: userId } = req.user;
        const orders = await Order.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']], // Добавим сортировку
            include: [{ model: OrderItem, as: 'items', include: ['Product'] }]
        });
        return res.json(orders);
    }
}

module.exports = new OrderController();