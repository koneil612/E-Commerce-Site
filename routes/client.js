/**
 * Router for client-side endpoints. Mounted at /
 */
'use strict';

const router = require('express').Router();
//To-Do: remove reqs that aren't needed
const user = require('../models/user');
// const product = require('../models/product');
// const order = require('../models/order');

/**
 * Homepage route
 */
router.get('/', (req, res) => res.render('index.hbs'));

/**
 * User routes
 */
router.get('/user/signup', (req, res) => res.render('signup.hbs'));
router.get('/user/login', (req, res) => res.render('login.hbs'));
router.get('/user/account', user.clientAuth, (req, res) => {
    res.render('account.hbs');
});


/**
 * Cart routes
 */
router.get('/cart', (req, res) => {
    res.render('cart.hbs');
});

module.exports = router;
