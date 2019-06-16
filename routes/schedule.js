var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../modules/connection');
var pg = require('pg');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);


router.post('/', function(req, res) {
	//TODO : Implement
});

router.put('/', function(req, res){
	//TODO : Implement
});

router.get('/:id',  function(req, res) {
	//TODO : Implement
});


router.get('/:direction/:id/:dt',  function(req, res) {
	//TODO : Implement
});

router.get('/generate/:direction/:id/:dt',  function(req, res) {
	//TODO : Implement
});

module.exports = router;
