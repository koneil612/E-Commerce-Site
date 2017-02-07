/**
 * Router for API endpoints. Mounted at /api.
 */
'use strict';

const router = require('express').Router();
const user = require('../models/user');

router.post('/user/signup', user.createUser);

module.exports = router;