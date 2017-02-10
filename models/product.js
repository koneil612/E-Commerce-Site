/**
 * Mongoose schema and model for Products collection.
 */

const config = require("./config");
const bluebird = require('bluebird');
// Import Mongoose schema and connect to DB
const mongoose = require('mongoose');
mongoose.promise = bluebird;

// Create a schema
const Schema = mongoose.Schema;

// Define the product schema
const productSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    quanity: Number,
    customization: {
        fname: String,
        mname: String,
        lname: String,
        weight: Number,
        dob: Date,
        height: Number,
        gender: {type: String, enum: ["Male", "Female"]},
        phrase: String,
        size: {type: String, enum: ["Male", "Female"]},
        color: {type: String, enum: ["White", "Black"]},
        font:{type: String, enum: [""]},
        specialrqst: String
    },
    image: [String]
});

const Product = mongoose.model('Product', productSchema);

const addToCart = (req, res, next) => {
        // Find product by ID
        mongoose.connect(config.mongoConfigs.db);
        Product.findOne({_id: req.body.productId})
                .then((result) => {
                        mongoose.disconnect();
                        if (!req.session.products) {
                                req.session.products = [];
                        }
                        req.session.products.push({
                                product: result,
                                customization: req.body.customization,
                                quantity: Number(req.body.quantity)
                        });
                        // res.status(200);
                        res.render('cart.hbs',{"product":result});
                        // res.json({
                        //         "message": "Product added to cart",
                        //         "success": true,
                        //         "rawProduct": result,
                        //         "customization": req.body.customization
                        // });
                })
                .catch((err) => {
                        mongoose.disconnect();
                        console.log(err);
                        res.status(500);
                        res.json({
                                "message": "Something went wrong",
                                "success": false
                        });
                });
};

const viewAll = (req, res, next) => {
    // find all products
    mongoose.connect(config.mongoConfigs.db);
    Product.find({})
        .then((result) => {
            mongoose.disconnect();
            // res.json({
            // "message": "Product page",
            // "success": true,
            // "Products": result
            // });
            // const products = {"products":result};

            res.render('product.hbs',{"product":result});
        });
};

const viewProduct = (req, res, next) => {
    // find products by ID
    mongoose.connect(config.mongoConfigs.db);
    Product.findOne({_id: req.params.productId})
        .then((product) => {
            mongoose.disconnect();
            console.log(product);
            res.render('productid.hbs',{"product":product});
        });
};

module.exports = {
        "Product": Product,
        "addToCart": addToCart,
        "viewAll": viewAll,
        "viewProduct": viewProduct
};
