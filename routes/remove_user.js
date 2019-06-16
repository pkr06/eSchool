var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);


router.put('/', function(req, res) {

        connection.result("UPDATE users SET deleted = 'TRUE' WHERE users_id = ($1)",
            [req.body.users_id])
        .then(function (data) {

        })
        .catch(function (error) {
            console.log("ERROR:", error); // print the error;
            res.send(false);
        })
        .finally(function () {
            res.send(true);
        });
});

module.exports = router;
