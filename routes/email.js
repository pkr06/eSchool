var express = require('express');
var router = express.Router();
var passport = require('passport');
var connection = require('../modules/connection');
var sendgrid  = require('sendgrid')('SG.17twB_I68yJFlhOL-rlJnLq24PFdfQ0Cvilhg');
var promise = require('bluebird');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require('pg-promise')(options);


router.post('/', function(req, res) {

    function email() {
        var email     = new sendgrid.Email({
            to:       req.body.username,
            from:     'admin@admin.org',
            subject:  'Welcome to Conversation Class',
            text:     'Click on the link to set a password and login http://eschool.herokuapp.com/#/password/' + req.body.token
        });
        sendgrid.send(email, function(err, json) {

            if (err) {
                res.status(500).send();
                return console.error(err);
            }
            console.log(json);
            res.status(204).send();
        });
    }

        connection.none('INSERT INTO token (fk_users_id, token) VALUES ($1, $2)',
            [req.body.fk_users_id, req.body.token])
            .then(function () {
                email();
            })
            .catch(function (error) {
                console.log("ERROR:", error.message || error);
                done();
                res.send(false);
            });
});

router.get('/:token', function(req, res) {
    var results = [];
    console.log(req.params);

        connection.result('SELECT users.username FROM users JOIN token ON users.users_id = token.fk_users_id WHERE token.token = ($1)',
            [req.params.token])
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
