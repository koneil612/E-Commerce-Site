/**
 * Mongoose schema and model for Products collection.
 */

/* Required modules and settings */
const config = require("./config");
const bluebird = require('bluebird');
const mongoose = require('mongoose');
mongoose.promise = bluebird;

/* Create a new schema */
const Schema = mongoose.Schema;

/* Define the product schema */
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

/* Define the product model */
const Product = mongoose.model('Product', productSchema);

/* Find all products in db. Accepts callback as last arg to handle responses */
const getProducts = (callback) => {
    mongoose.connect(config.mongoConfigs.db);
    Product.find({})
        .then((result) => {
            mongoose.disconnect();
            callback(result);
        })
        .catch((err) => {
            mongoose.disconnect();
            console.log(err);
            callback();
        });
};

/* Find one product by ID. Accepts callback as last arg to handle responses */
const getProduct = (productId, callback) => {
    mongoose.connect(config.mongoConfigs.db);
    Product.findOne({_id: productId})
        .then((result) => {
            mongoose.disconnect();
            callback(result);
        })
        .catch((err) => {
            mongoose.disconnect();
            console.log(err);
            callback();
        });
};

/**
 * static method that adds products to a session-based cart. Accepts callback
 * as last arg to handle responses. 
 */
const addToCart = (req, callback) => {
    const productId = req.body.productId;
    getProduct(productId, (result) => {
        if (!req.session.products) {
            req.session.products = [];
        }
        req.session.products.push({
            product: result,
            customization: req.body.customization,
            quantity: Number(req.body.quantity)
        });
        callback(result);
    });
};

module.exports = {
        "Product": Product,
        "addToCart": addToCart,
        "getProducts": getProducts,
        "getProduct": getProduct
};
