var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var mongoose = require('mongoose');
var router = express.Router();

// ============ MAIN GET ROUTES =============
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Verdct', user: req.user });
});

router.get('/info', function(req, res, next) {
  res.render('info', { title: 'How it works', user: req.user});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', user: req.user});
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', user: req.user});
});

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search', user: req.user});
});

router.get('/account', function(req, res, next) {
  res.render('account', { title: 'Account', user: req.user});
});

router.get('/newevent', function(req, res, next) {
  res.render('newevent', { title: 'Create Event', user: req.user});
});

router.get('/events', function(req, res, next) {
  res.render('myevents', { title: 'My Events', user: req.user});
});

// ============= LOGIN ROUTES ==============
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {  
  successRedirect: '/',
  failureRedirect: '/',
}));

router.get('/auth/instagram', passport.authenticate('instagram', { scope: 'email' }));

router.get('/auth/instagram/callback', passport.authenticate('instagram', {  
  successRedirect: '/',
  failureRedirect: '/',
}));

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register', user: req.user });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ 
    	username : req.body.username, 
    	email : req.body.email,
      // facebook: { name : 'MARK ZUCKEGBERG'} 

    }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account, title: 'register' });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

// ============= API/ BACK ROUTES ==============
router.get('/home', function(req, res, next) {
  if (req.user) {
		mongoose.model('Event').find({}, function (err, events) {
      mongoose.model('SavedEvent').find({user_id : req.user._id}, function (err, savedEvents) {
      		res.render('home', {
  					title: 'Home',
			    	user : req.user,
			    	events : events,
			    	savedEvents : savedEvents
			    });   
    	});
		});
  }
  else {
    res.redirect('/');
  }
});

router.get('/api', function(req, res, next) {
	if (req.user) {
    res.render('api/index', {
    	title: 'API',
    	user_id: req.user._id,
    	email: req.user.email,
    	username: req.user.username
    });
  }
  else {
    res.redirect('/');
  }
});

//============== GET SAVED EVENTS FOR CURRENT USER
router.route('/cu').get(function(req, res, next) {
        //retrieve all savedEvents from Monogo
        mongoose.model('SavedEvent').find({user_id : req.user._id}, function (err, savedEvents) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                      html: function(){
                           res.render("api/savedEvents/index",{
                                title: "all saved events FOR CURRENT USER",
                                "savedEvents" : savedEvents,
                                total: savedEvents.length
                           });
                     },
                    //JSON response will show all savedEvents in JSON format
                    json: function(){
                        res.json(savedEvents);
                    }
                });
              }     
        });
    })

module.exports = router;
