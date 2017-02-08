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

const secrets = {
    sessSecret: "e9a6e3f5-6bb3-47e1-ab86-a3a3c066abb5"
};

module.exports = {mongoConfigs: mongoConfigs, secrets: secrets};
