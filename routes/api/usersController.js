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

/* update one */
// router.post('/:id', function(req, res) {
//       // var username = req.body.username;
//       // var password = req.body.password;
//       // var email = req.body.email;
//       var last_event_id = req.body.last_event_id;
      
//    //find the account by ID
//     mongoose.model('Account').findById(req.id, function (err, account) {
//         account.update({
//             // username : username,
//             // password : password,
//             // email : email,
//             last_event_id : last_event_id
                
//         });
//     });
// });
module.exports = router;
