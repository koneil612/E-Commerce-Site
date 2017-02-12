'use strict';
/**
 * Mongoose schema and model for Users collection
 */

const config = require("./config");
const bluebird = require("bluebird");
// Import mongoose ORM and connect to DB
//Import mongoose ORM and connect to DB

// <<<<<<< Updated upstream
// Import mongoose ORM and connect to DB
// =======
//Import mongoose ORM and connect to DB
// >>>>>>> Stashed changes
const mongoose = require("mongoose");
mongoose.promise = bluebird;
// mongoose.connect(config.db);

// Create a schema
const Schema = mongoose.Schema;

// Define order schema
const orderSchema = new Schema({
    customerOrderNumber: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    products: [{
        product: { type: Schema.Types.Mixed, required:  true },
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
    address: {
        type: Schema.Types.Mixed,
        required: true
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

const getCart = (req, res, next) => {
    res.status(200);
    res.json({
        "cart": req.session.products
    });
};

const createOrder = (req, res, next) => {
    // Get total product prices from products array in session
    const subtotal = req.session.products.reduce((accum, current) => {
        return accum + (current.product.price * current.quantity);
    }, 0);
    // Create new Order instance
    let newOrder = new Order();
    newOrder.customerOrderNumber = newOrder._id;
    newOrder.userId = req.session.userId;
    newOrder.products = req.session.products;
    newOrder.status = "processing";
    newOrder.shippingType = req.body.shippingType;
    newOrder.address = req.body.shippingAddress;
    newOrder.subTotal = subtotal;
    (newOrder.address.state === "TX" ? newOrder.tax = newOrder.subTotal * .0825     : newOrder.tax = 0);
    newOrder.chargedTotal = newOrder.subTotal + newOrder.tax;
    mongoose.connect(config.mongoConfigs.db);
    newOrder.save()
        .then((result) => {
            mongoose.disconnect();
            req.session.products = [];
            res.status(200);
            // res.json({
            //     "message": "your order has been saved",
            //     "success": true,
            //     "data": result
            // });
            res.render('checkout.hbs',{"cart":result});

        })
        .catch ((err) => {
            mongoose.disconnect();
            console.log(err);
            res.status(500);
            res.render('checkout.hbs',{"cart":result});
            // res.json({
            //     "message":"Server Error: order was not placed",
            //     "success": false,
            //     "data": ""
            // });
        });
};

module.exports = {
    "Order" : Order,
    "getCart": getCart,
    "createOrder": createOrder}
