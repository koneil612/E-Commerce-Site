/**
 * Database config file. Establishes Mongo connection settings throughout app.
 */

// Use for localhost testing.
const mongoConfigs = {
    testDb: 'mongodb://localhost/ecommtest'
};

module.exports = mongoConfigs;
