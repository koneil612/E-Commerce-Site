/**
 * Router for clientside endpoints. Mounted at /
 */
'use strict';

const router = require('express').Router();
const user = require('../models/user');
const product = require('../models/product');
const order = require('../models/order');


router.get('/user/login', (req, res) => {
    res.render('../public/templates/login');
});

router.get('/user/signup', (req, res) => {
    res.render('../public/templates/signup');
});

module.exports = router;