var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Verdct' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ 
    	username : req.body.username, 
    	email : req.body.email 
    }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });
    });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/home');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/home', function(req, res, next) {
  if (req.user) {
    res.render('home', {
    	title: 'Home',
    	user_id: req.user._id,
    	email: req.user.email,
    	username: req.user.username

    });
  }
  else {
    res.redirect('/');
  }
});

router.get('/about', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
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

module.exports = router;
