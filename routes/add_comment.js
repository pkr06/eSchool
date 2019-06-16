var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);

router.put('/', function(req, res){
    var newComment = {
        lesson_plan: req.body.lesson_plan,
        lesson_id: req.body.lesson_id
    };

        connection.none(
            'UPDATE lesson SET (lesson_plan) = ($1) WHERE lesson_id = $2',
            [newComment.lesson_plan, newComment.lesson_id])
        .then(function (data) {
            res.send(true);
        }) 
        .catch(function (error) {
            console.log('Error inserting data', err);
            res.send(false);
        });
});

module.exports = router;
