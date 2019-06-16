var express = require('express');
var router = express.Router();
var passport = require('passport');
var connection = require('../modules/connection');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);

router.post('/', function(req, res, next) {
});

router.get('/:username', function(req, res) {
});

module.exports = router;
