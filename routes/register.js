var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require("path");

var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var promise = require('bluebird');

var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

var pgp = require('pg-promise')(options);


router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

router.post('/', function(req, res, next) {
// TODO : Implement
});

router.put('/', function(req, res){
// TODO : Implement
});

module.exports = router;
