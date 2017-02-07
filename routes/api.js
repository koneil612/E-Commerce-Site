/**
 * Router for API endpoints. Mounted at /api.
 */
'use strict';

const router = require('express').Router();

router.post('/user/signup', user.signup);

module.exports = router;