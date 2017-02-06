const bodyParser = require('body-parser');
const express = require('express');


const app = express();



const Product = mongoose.model ("Product", {
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
    weight: {type: Number, required: true},
});


app.listen(3000,function () {
    console.log('Listening');
});
