var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');  

/* GET users listing. */
router.get('/', function(req, res, next) {
  mongoose.model('Account').find({}, function (err, accounts) {
    if (err) {
        return console.error(err);
    } else {
        res.format({
          json: function(){
            res.json(accounts);
          }
      	});
    }     
	});
});

module.exports = router;
