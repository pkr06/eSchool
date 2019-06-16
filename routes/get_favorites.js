var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);

router.get('/:id',  function(req, res) {
	//TODO: Implement
});

module.exports = router;
