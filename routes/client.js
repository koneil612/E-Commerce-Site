/**
 * Router for clientside endpoints. Mounted at /
 */
'use strict';

const router = require('express').Router();
//To-Do: remove reqs that aren't needed
// const user = require('../models/user');
// const product = require('../models/product');
// const order = require('../models/order');

router.get('/user/login', (req, res) => {
    res.render('login.hbs');
});

router.get('/user/signup', (req, res) => {
    res.render('signup.hbs');
});

router.get('/user/account', (req, res) => {
    res.render('account.hbs');
});

module.exports = router;