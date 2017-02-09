/**
 * Mongoose schema and model for Users collection
 */

const config = require("./config");
const bluebird = require("bluebird");
// Import mongoose ORM and connect to DB
const mongoose = require("mongoose");
mongoose.promise = bluebird;
// mongoose.connect(config.db);

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

const createOrder = (req, res, next ) => {
    let newOrder = new Order(); 
    newOrder.customerOrderNumber = req.session.customerOrderNumber;
    newOrder.userId = req.session.userId;
    newOrder.products = req.session.products;
    newOrder.status = req.session.status;
    newOrder.shippingType = req.session.shippingType;
    newOrder.trackingNumber = req.session.trackingNumber;
    newOrder.subTotal = Number(req.session.subTotal);
    (req.session.state === "TX" ? newOrder.tax = newOrder.subTotal * .0825 :
        newOrder.tax = 0);
    newOrder.chargedTotal = newOrder.subTotal + newOrder.tax; 
    mongoose.connect(config.mongoConfigs.db);
    console.log(newOrder);
    newOrder.save()
        .then((result) => {
            mongoose.disconnect();
            res.status(200);
            res.json({
                "message": "your order has been saved",
                "success": true,
                "data": result
            });
        })
        .catch ((err) => {
            mongoose.disconnect();
            console.log(err);
            res.status(500);
            res.json({
                "message":"nah, it didn't work"
            });
        });
};

module.exports = {
    "Order" : Order, 
    "createOrder" : createOrder}
