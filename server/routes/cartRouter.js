const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Этот эндпоинт должен быть доступен только авторизованным пользователям,
// чтобы анонимы не могли нагружать сервер генерацией подписей.
router.post('/signature', authMiddleware, cartController.createSignature);

module.exports = router;