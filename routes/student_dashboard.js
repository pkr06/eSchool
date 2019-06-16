var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var promise = require('bluebird');
var options = {
    promiseLib: promise 
};
var pgp = require('pg-promise')(options);


router.get('/:id',  function(req, res) {
	//TODO: Implement
});

module.exports = router;
