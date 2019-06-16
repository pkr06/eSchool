var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var promise = require('bluebird'); 

var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

var pgp = require('pg-promise')(options);

router.get('/', function(req, res) {
    var results = [];

    connection.any("SELECT * FROM users WHERE deleted = 'FALSE' AND username = ($1)", [req.body.username])

    .then(function (data) {
        results.push(data.rows);
    })
    .catch(function (error) {
        console.log("ERROR:", error); // print the error;
    })
    .finally(function () {
        return res.json(results);
    });
});
module.exports = router;
