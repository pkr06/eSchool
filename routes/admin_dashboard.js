var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);


router.get('/unapproved/',  function(req, res) {
    var results =[];
    connection.result("SELECT lesson_id, author, title, materials, status, published FROM lesson WHERE (status = 'submitted' OR status = 'draft') ORDER BY published ASC")
        .then(function (data) {
            results = data.rows;
            console.log("unapproved  >>" + data.rows);
        })
        .catch(function (error) {
            console.log("ERROR:", error); // print the error;
        })
        .finally(function () {
            return res.json(results);
        });
});

router.get('/approved/',  function(req, res) {
    var results =[];
    connection.result("SELECT lesson_id, author, title, materials, status, published FROM lesson WHERE (status = 'approved' or status = 'APPROVED') ORDER BY published ASC")
        .then(function (data) {
            results = data.rows;
            console.log("approved  >>" + data.rows);
        })
        .catch(function (error) {
            console.log("ERROR:", error); // print the error;
        })
        .finally(function () {
            return res.json(results);
        });
});

module.exports = router;
