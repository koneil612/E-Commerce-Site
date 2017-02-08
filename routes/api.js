/**
 * Router for API endpoints. Mounted at /api.
 */
'use strict';

const router = require('express').Router();
const user = require('../models/user');
const product = require('../models/product');


router.post('/user/signup', user.createUser);
router.post('/user/update', user.auth, user.updateUser);
router.post('/user/login', user.loginUser);

router.post('/cart', user.auth, product.addToCart);

module.exports = router;