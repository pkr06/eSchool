var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
    if(req.isAuthenticated()) {
        // send back user object from database
        res.send(req.user);
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

module.exports = router;
