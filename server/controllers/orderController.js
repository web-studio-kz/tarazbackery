const { Order, OrderItem, Product, User } = require('../models');
const ApiError = require('../error/ApiError');
const mailService = require('../services/mailService');

const DELIVERY_COST = 1000;

class OrderController {
    async create(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { items, deliveryType, address, latitude, longitude } = req.body;

            if (!items || items.length === 0) {
                return next(ApiError.badRequest('Корзина не может быть пустой'));
            }
            if (!deliveryType) {
                return next(ApiError.badRequest('Не указан тип доставки'));
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
            return next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res) {
        const { id: userId } = req.user;
        const orders = await Order.findAll({
            where: { userId },
            include: [{ model: OrderItem, as: 'items', include: ['Product'] }]
        });
        return res.json(orders);
    }
}

module.exports = new OrderController();