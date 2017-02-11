/**
 * Router for client-side endpoints. Mounted at /
 */
'use strict';

const router = require('express').Router();
//To-Do: remove reqs that aren't needed
const user = require('../models/user');
const product = require('../models/product');
const order = require('../models/order');

/**
 * Homepage route
 */
router.get('/', (req, res) => res.render('index.hbs', req.session));

/**
 * User routes
 */
router.get('/user/signup', (req, res) => res.render('signup.hbs', req.session));
router.get('/user/login', (req, res) => res.render('login.hbs', req.session));
router.get('/user/account', user.clientAuth, (req, res) => {
    const userId = req.session.userId;
    // const session = req.session;
    user.getUser(userId, (result) => {
        res.render('account.hbs', result, req.session);
    });
});


/**
 * Product routes
 */
 router.get('/products', product.viewAll);
 router.get('/products/:productId', (req, res) => {
     res.render("product.hbs", {products:"products"});
 });
 router.get('/products/:productId',product.viewProduct);

/**
 * Order routes
 */

router.get('/cart', product.addToCart);
router.route('/cart/checkout')
    .get(user.clientAuth, order.getCart)
    .post(user.clientAuth, order.createOrder);


module.exports = router;
