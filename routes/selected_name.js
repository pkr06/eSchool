var express = require('express');
var router = express.Router();
var passport = require('passport');
var connection = require('../modules/connection');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);

router.get('/:selectedName', function(req, res) {
    var results = [];

    connection.result('SELECT * FROM users WHERE users_id = ($1)',
            [req.params.selectedName])
        .then(function (data) {
            results = data.rows;
        })
        .catch(function (error) {
            console.log("ERROR:", error); // print the error;
        })
        .finally(function () {
            return res.json(results);
        });
});

module.exports = router;
