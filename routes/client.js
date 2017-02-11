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
router.get('/', (req, res) => res.render('index.hbs', {session: req.session}));

/**
 * User routes
 */
router.get('/user/signup', (req, res) => {
    if (req.session.token) {
        res.redirect('/user/account');
    } else {
        res.render('signup.hbs', {session: req.session});
    }
});
router.get('/user/login', (req, res) => res.render('login.hbs', 
    {session: req.session}));
router.get('/user/account', user.clientAuth, (req, res) => {
    const userId = req.session.userId;
    user.getUser(userId, (result) => {
        res.render('account.hbs', {result: result, session: req.session});
    });
});

/**
 * Product routes
 */
 router.get('/products', (req, res) => {
     product.getProducts((result) => {
        res.render('products.hbs',{product: result, session: req.session});
    });
 });

 router.get('/products/:productId', (req, res) => {
     res.render("product.hbs", {session: req.session, products:"products"});
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
