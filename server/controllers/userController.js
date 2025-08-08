const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
}

class UserController {
    async registration(req, res, next) {
        const { email, password, name, phone } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, name, phone, password: hashPassword });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Указан неверный логин или пароль!'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный логин или пароль!'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    // Проверка авторизации пользователя по токену
    async check(req, res, next) {
        // Данные о пользователе (id, email, role) добавляются в req.user нашим middleware
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();