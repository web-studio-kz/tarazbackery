// server/controllers/productController.js

const { Product, Category } = require('../models');
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
            // Логика создания продукта будет сложнее из-за картинок, пока оставим так
            const { name, price, description, categoryId } = req.body;
            const product = await Product.create({ name, price, description, categoryId, imageUrl: 'default.jpg' });
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { categoryId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9; // 9 продуктов на странице
        let offset = page * limit - limit;

        let products;
        if (!categoryId) {
            // Если категория не выбрана, показываем все товары
            products = await Product.findAndCountAll({ limit, offset });
        } else {
            // Если выбрана, фильтруем по ней
            products = await Product.findAndCountAll({ where: { categoryId }, limit, offset });
        }

        return res.json(products);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            // Включаем информацию о категории в ответ
            include: [{ model: Category, as: 'Category' }]
        });
        return res.json(product);
    }
}

module.exports = new ProductController();