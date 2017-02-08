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
    description: {type: Number, required: true},
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
        mongoose.connect(config.db);
        Product.findOne({_id: req.body.productId})
                .then((result) => {
                        mongoose.disconnect();
                        req.session.products.push({
                                productId: result._id,
                                productCustomization: req.body.customization,
                                quantity: req.body.quantity
                        });
                        res.status(200);
                        res.json({
                                "message": "Product added to cart",
                                "success": true,
                                "data": result
                        });
                })
                .catch((err) => {
                        res.status(500);
                        res.json({
                                "message": "Something went wrong",
                                "success": false
                        });
                });
        // Get quantity, product customizations
        // Add to session
}

module.exports = {
        "Product": Product,
        "addToCart": addToCart
};
