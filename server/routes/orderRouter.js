const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const { sensitiveActionsLimiter } = require('../middleware/rateLimiter');

router.use(authMiddleware);

router.post('/', sensitiveActionsLimiter, orderController.create);
router.get('/', orderController.getAll);

module.exports = router;