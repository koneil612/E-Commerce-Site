/**
 * Router for API endpoints. Mounted at /api.
 */
'use strict';

const router = require('express').Router();
const user = require('../models/user');
const product = require('../models/product');
const order = require('../models/order');


router.post('/user/signup', user.createUser);
router.post('/user/update', user.auth, user.updateUser);
router.post('/user/login', user.loginUser);
router.post('/cart', user.auth, product.addToCart);

router.get('/products', product.viewAll);
router.get('/products/:productId', product.viewProduct);

router.route('/cart/checkout')
    .get(user.auth, order.getCart)
    .post(user.auth, order.createOrder);

module.exports = router;
