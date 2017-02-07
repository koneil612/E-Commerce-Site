/**
 * Mongoose schema and model for Products collection.
 */

const config = require('config');
const bluebird = require('bluebird');
// Import Mongoose schema and connect to DB
const mongoose = require('mongoose');
mongoose.promise = bluebird;
mongoose.connect(confi.mongoConfigs.testDb);

// Create a schema
const Schema = mongoose.Schema;

// Define the product schema
const productSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: Number, required: true},
    quanity: Number,
    customization: [{
        fname: String,
        mname: String,
        lname: String,
        weight: Number,
        dob: Date,
        height: Number,
        gender: String,
        phrase: String,
        specialrqst: String,
    }],
    dimentions: {type: Number, required: true},
    weight: {type: Number, required: true}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;