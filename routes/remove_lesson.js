var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);



router.put('/', function(req, res){
  var lessonPlan = {
    status: 'archived',
    deleted: true,
    lesson_id: req.body.lesson_id
  };
    connection.result(
      'UPDATE lesson SET (status, deleted) = ($1, $2) WHERE lesson_id = $3',
      [lessonPlan.status, lessonPlan.deleted, lessonPlan.lesson_id])

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
