/**
 * Router for API endpoints. Mounted at /api.
 */
'use strict';

const router = require('express').Router();
const user = require('../models/user');


router.post('/user/signup', user.createUser);
router.post('/user/update', user.auth, user.updateUser);
router.post('/user/login', user.loginUser);

module.exports = router;
