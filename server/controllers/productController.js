const { Product, Category } = require('../models');
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
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
        limit = limit || 9;
        let offset = page * limit - limit;

        const options = {
            limit,
            offset,
            attributes: ['id', 'name', 'price', 'imageUrl', 'categoryId'] 
        };
    
        if (categoryId) {
            options.where = { categoryId };
        }
    
        const products = await Product.findAndCountAll(options);
    
        return res.json(products);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            include: [{ model: Category, as: 'Category' }]
        });
        return res.json(product);
    }
}

module.exports = new ProductController();