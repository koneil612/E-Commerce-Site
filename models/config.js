/**
 * Database config file. Establishes Mongo connection settings throughout app.
 */

// Use for localhost testing.
const mongoConfigs = {
    // Test DB
    db: 'mongodb://localhost/ecommtest'
    // Other DBs
    //...
};
console.log("test");

module.exports = mongoConfigs;
