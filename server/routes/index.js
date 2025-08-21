const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');

const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const orderRouter = require('./orderRouter');

const cartRouter = require('./cartRouter');

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/cart', cartRouter);

module.exports = router;