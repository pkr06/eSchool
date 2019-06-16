var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);


router.post('/', function(req, res) {
    var results = [];
    console.log(req.body);

    connectiom.none('INSERT INTO favorite (fk_users_id, fk_fav_lesson_id, favorite_status) VALUES ($1, $2, $3)',
        [req.body.fk_users_id, req.body.fk_fav_lesson_id, req.body.favorite_status])
        .then(function (data) {
          results = data;
        })
        .catch(function (error) {
            console.log("ERROR:", error.message || error);
        })
        .finally(function () {
            return res.json(results);
        });

});

router.get('/', function(req, res) {
//  TODO: Implement
});

router.put('/', function(req, res) {
//  TODO: Implement
});

module.exports = router;
