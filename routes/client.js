/**
 * Router for clientside endpoints. Mounted at /
 */
'use strict';

const router = require('express').Router();
const user = require('../models/user');
const product = require('../models/product');
const order = require('../models/order');

router.post('/user/signup', user.createUser);
router.post('/user/update', user.auth, user.updateUser);
router.get('/user/login', (req, res) => {
    res.render('../public/templates/login');
});

router.post('/cart', user.auth, product.addToCart);

router.route('/cart/checkout')
    .get(user.auth, order.getCart)
    .post(user.auth, order.createOrder);

module.exports = router;