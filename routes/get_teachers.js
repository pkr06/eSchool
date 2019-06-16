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

    connection.result("SELECT first_name, last_name, grade, users_id FROM users WHERE deleted = 'FALSE' and role = 'teacher' ORDER BY last_name ASC")
    .then(function (data) {
        results.push(data.rows);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    })
    .finally(function () {
        return res.json(results);
    });
});
module.exports = router;
