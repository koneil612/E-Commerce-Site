'use strict';
/**
 * Router for API endpoints. Mounted at /api.
 */

const router = require('express').Router();
const user = require('../models/user');
const product = require('../models/product');
const order = require('../models/order');

/**
 * User API routes
 */
router.post('/user/signup', user.createUser);
router.post('/user/login', user.loginUser);
router.post('/user/logout', user.logoutUser);
router.post('/user/update', user.apiAuth, user.updateUser);

/**
 * Product API routes
 */

/* Get all products */
router.get('/products', (req, res, next) => {
    product.getProducts((result) => {
        if (result) {
            res.json({
                "message": "Retrieved all products",
                "success": true,
                "products": result
            });
        } else {
            res.json({
                "message": "Failed to retrieve products",
                "success": false,
                "products": []
            });
        }
    });
});

/* Get one product */
router.get('/products/:productId', (req, res) => {
    product.getProduct(req.params.productId, (result) => {
        if (result) {
            res.json({
                "message": "Retrieved one product",
                "success": true,
                "product": result
            });
        } else {
            res.json({
                "message": "Failed to retrieve product",
                "success": false,
                "product": {}
            });
        }
    });
});

router.post('/cart', (req, res) => {
    product.addToCart(req, (result) => {
        if (result) {
            res.json({
                "message": "Added product to cart",
                "success": true,
                "product": result
            });
        } else {
            res.json({
                "message": "Failed to add product to cart",
                "success": false,
                "product": {}
            });
        }
    });
});

/**
 * Order routes
 */
router.route('/checkout')
    .get(user.apiAuth, order.getCart)
    .post(user.apiAuth, order.createOrder);

module.exports = router;
