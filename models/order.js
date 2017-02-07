/**
 * Mongoose schema and model for Users collection
 */

const config = require("config");
const bluebird = require("bluebird");
// Import mongoose ORM and connect to DB 
const mongoose = require("mongoose");
mongoose.promise = bluebird;
mongoose.connect(config.mongoConfigs.testDB);

// Create a schema
const Schema = mongoose.Schema;

// Define order schema
const orderSchema = new Schema({
    customerOrderNumber: {
        type: Number,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    products: [{
        product: { type: Mixed, required:  true },
        quantity: { type: Number, required: true }
    }],
    status: {
        type: String, 
        enum: ["processing", "packed", "shipped", "delivered",
            "return requested", "return complete"],
        required: true
    },
    shippingType: {
        type: String,
        enum: ["Next Day", "Two Day", "Regular"],
        required: false
    },
    trackingNumber: {
        type: String,
        required: false
    },
    subTotal: {
        type: Number,
        reaquired: true
    },
    tax: {
        type: Number,
        required: true
    },
    chargedTotal: {
        type: Number,
        required: true
    }
});

// Create Order model with defined schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
