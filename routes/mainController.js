var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Verdct', user: req.user });
});

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
            res.redirect('/spa');
        });
    });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/spa');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/spa');
});

router.get('/home', function(req, res, next) {
  if (req.user) {
		mongoose.model('Event').find({}, function (err, events) {
      mongoose.model('SavedEvent').find({user_id : req.user._id}, function (err, savedEvents) {
      		res.render('home', {
  					title: 'Home',
			    	user_id: req.user._id,
			    	email: req.user.email,
			    	username: req.user.username,
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

router.get('/spa', function(req, res, next) {
  res.render('spa', { title: 'Verdct', user: req.user});
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

//Social login routes
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {  
  successRedirect: '/home',
  failureRedirect: '/',
}));
router.get('/auth/instagram', passport.authenticate('instagram', { scope: 'email' }));
router.get('/auth/instagram/callback', passport.authenticate('instagram', {  
  successRedirect: '/home',
  failureRedirect: '/',
}));

router.get('/spa2', function(req, res, next) {
  res.render('spa2', { title: 'Verdct', user: req.user});
});


module.exports = router;
