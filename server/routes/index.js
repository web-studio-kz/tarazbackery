const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');

const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const orderRouter = require('./orderRouter');

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);

module.exports = router;