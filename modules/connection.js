//connectionsString for Heroku database
'use strict';
var promise = require('bluebird'); // or any other Promise/A+ compatible library;

var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

var pgp = require('pg-promise')(options);


// Database connection details;
var cn = {
    host: '[host]', 
    port: [port],
    database: '[db]',
    user: '[user]',
    password: '[pass]',
    ssl: true
};

var db = pgp(cn); // database instance;

module.exports = db;
