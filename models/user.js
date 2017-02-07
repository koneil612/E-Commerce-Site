/**
 * Mongoose schema and model for Users collection
 */

const config = require("config");
const bcrypt = require('bcrypt');
const bluebird = require('bluebird');
// Import mongoose ORM and connect to DB
const mongoose = require("mongoose");
mongoose.promise = bluebird;
mongoose.connect(config.mongoConfigs.testDb);

// Create a schema
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
   name:[{
       first: { type: String, required: true },
       last: {type: String, required: true },
   }],
   email: {type: String, required: true},
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

// User auth instance method sets password to hash
userSchema.statics.hashPassword = (password) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) {
            // To-Do: better error handling
            console.log("bCrypt hash error - password not saved");
        }
        
    })
}



// Create a User model with defined schema
const User = mongoose.model("User", userSchema);

module.exports = User;