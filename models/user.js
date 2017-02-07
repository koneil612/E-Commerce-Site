'use strict';
/**
 * Mongoose schema and model for Users collection
 */

const config = require("./config");
const bcrypt = require('bcrypt');
const bluebird = require('bluebird');
// Import mongoose ORM and connect to DB
const mongoose = require("mongoose");
mongoose.Promise = bluebird;
mongoose.connect(config.db);

// Create a schema
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    fName: { type: String, required: true },
    lName: {type: String, required: true },
    email: {type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [{
        name: { type: String, required: true },
        line1: { type: String, required: true },
        line2: { type: String, required: false },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    }],
        createdAt: { type: Date, required: true },
        lastUpdated: { type: Date, required: true }
    });

// Create a User model with defined schema
const User = mongoose.model("User", userSchema);

// User auth instance method sets password to hash
const hashAndSave = (user, req, res, next) => {
    const saltRounds = 10;
    // Add other validation? look into validateBeforeSave
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if(err) {
            // To-Do: better error handling
            console.log("bCrypt hash error - password not saved");
        }
        user.password = hash;
        user.save()
            .then((result) => {
                res.json({
                    "message": "User saved successfully",
                    "data": result
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

const createUser = (req, res, next) => {
    let newUser = new User();
    newUser.fName = req.body.fName;
    newUser.lName = req.body.lName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.address = req.body.address;
    newUser.createdAt = new Date();
    newUser.lastUpdated = newUser.createdAt;
    hashAndSave(newUser, req, res, next);
};

module.exports = {
    "User": User,
    "createUser": createUser
};