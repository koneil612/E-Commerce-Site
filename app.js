'use strict';

// Initialize Express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const config = require("./models/config");

const sess = {
    secret: config.secrets.sessSecret,
    cookie: {maxAge: 60000}
}

// Define API routes and mount router middleware to /api endpoint
const api = require('./routes/api');

app.use(session(sess));
app.use(bodyParser.json());
app.use('/api', api);

// Start up localhost server
app.listen(3000, () => {
    console.log("Listening on port 3000...");
});