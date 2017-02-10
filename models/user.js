'use strict';
/**
 * Mongoose schema and model for Users collection
 */

const config = require("./config");
const bcrypt = require('bcrypt');
const bluebird = require('bluebird');
const uuid = require('uuid/v4');

// Import mongoose ORM and connect to DB
const mongoose = require("mongoose");
mongoose.Promise = bluebird;

// Create a schema
const Schema = mongoose.Schema;

// Define the user schema'
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
const hashAndSave = (user, callback) => {
    const saltRounds = 10;
    // Add other validation? look into validateBeforeSave
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if(err) {
            // To-Do: better error handling
            console.log(err);
        }
        user.password = hash;
        mongoose.connect(config.mongoConfigs.db);
        User.findOne({ email: user.email }, (err, result) => {
            if (err) {
                mongoose.disconnect();
                callback({
                    "data": "",
                    "success": true,
                    "message": "Server error - user not saved"
                });
                console.log(err);
            }
            if (result) {
                mongoose.disconnect();
                callback({
                    "data": result,
                    "success": false,
                    "message":"User already exists"
                });
            }
            if (!result) {                
                user.save()
                    .then((result) => {                        
                        mongoose.disconnect();
                        callback({
                            "data": result,
                            "success":true,
                            "message":"Account created successfully!"
                        });
                    })
                    .catch((err) => {
                        mongoose.disconnect();
                        console.log(err);
                        callback({
                            "data": "",
                            "success": false,
                            "message": "server error - user not saved"
                        });
                    });
            }
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
    hashAndSave(newUser, (result) => {
        res.json(result);
    });
};

const loginUser = (req, res, next) =>{
    mongoose.connect(config.mongoConfigs.db);
    User.findOne({email: req.body.email})
        .then((result) => {
            mongoose.disconnect();
                bcrypt.compare(req.body.password, result.password, function(err, resolve){
                    if (resolve === true) {
                        const token = uuid();
                        req.session.token = token;
                        req.session.userId = result._id;
                        res.json ({
                            "message" : "You're logged in",
                            "token" : token,
                            "success": true
                        });
                    } else {
                        res.status(401);
                        res.json({
                            "message": "login failed",
                            "success": false
                        });
                    }
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(401);
            res.json({
                "message": "login failed",
                "success": false
            });
        });
};

/**
 * Authentication checker for auth functions
 */
const checkToken = (req) => req.session.token;

/**
 * Authentication responder for API routes
 */
const apiAuth = (req, res, next) => {
    if (checkToken(req)) {
        next();
    } else {
        res.status(401);
        res.json({ 
            "message": "Error: could not log in",
            "success": false
        });
    }
};

/**
 * Authentication responder for end-client routes
 */
const clientAuth = (req, res, next) => {
    (checkToken(req) ? next() : res.redirect('/user/login'));
};


const updateUser = (req, res, next) => {
    mongoose.connect(config.mongoConfigs.db);
    User.findOneAndUpdate({ _id: req.session.userId }, { $set:
        {
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            address: req.body.address,
            lastUpdated: new Date()
        }
    },
    { new: true }, function(err, result) {
            mongoose.disconnect();
            if (err) {
                res.json({
                    "message": "update not successful"
                })
            } else {
                res.json({
                "message": "updated contact",
                "data": result
                });
            }
    });
};

module.exports = {
    "User": User,
    "createUser": createUser,
    "updateUser": updateUser,
    "loginUser": loginUser,
    "apiAuth": apiAuth,
    "clientAuth": clientAuth
};
