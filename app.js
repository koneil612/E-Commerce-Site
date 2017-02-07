'use strict';

// Initialize Express app
const express = require('express');
const app = express();

// Define API routes and mount router middleware to /api endpoint
const api = require('./routes/api');
app.use('/api', api);

// Start up localhost server
app.listen(3000, () => {
    console.log("Listening on port 3000...");
});