/**
 * Router for API endpoints. Mounted at /api.
 */
'use strict';

const router = require('express').Router();
const user = require('../models/user');
const product = require('../models/product');
const order = require('../models/order');

/**
 * User API routes
 */
router.post('/user/signup', user.createUser);
router.post('/user/login', user.loginUser);
router.post('/user/update', user.apiAuth, user.updateUser);

/**
 * Product API routes
 */
router.get('/products', product.viewAll);
router.get('/products/:productId', product.viewProduct);
router.post('/cart', user.apiAuth, product.addToCart);

/**
 * Order routes
 */
router.route('/cart/checkout')
    .get(user.apiAuth, order.getCart)
    .post(user.apiAuth, order.createOrder);

module.exports = router;
