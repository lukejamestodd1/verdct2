var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var router = express.Router();

// ============ MAIN GET ROUTES =============
router.get('/spa', function(req, res, next) {
  res.render('../public/pages/spa', { title: 'Verdct', user: req.user });
});

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

router.get('/newdress', function(req, res, next) {
  res.render('newdress', { title: 'New Dress', user: req.user, event: req.event});
});

router.get('/events', function(req, res, next) {
  res.render('myevents', { title: 'My Events', user: req.user});
});

// ============= LOGIN ROUTES ==============
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', user : req.user});
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



router.get('/auth/instagram', passport.authenticate('instagram'));

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
  mongoose.model('Dress').find({}, function (err, dresses) {
    mongoose.model('Account').find({}, function (err, accounts) {
      mongoose.model('Event').find({}, function (err, events) {
        mongoose.model('SavedEvent').find({}, function (err, savedEvents) {
          if (err) {
            return console.error(err);
          } else {
            res.format({
              html: function(){
                res.render('api/index', {
                  title: 'API',
                  Dtotal: dresses.length,
                  Utotal: accounts.length,
                  Etotal: events.length,
                  SEtotal: savedEvents.length
                });
              }
            });
          }
        });
      });
    });
  });
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
});

// =========== Email functionality ========== //
router.post('/contact', function(req, res) {
  //Setup Nodemailer transport
  var smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: "cakepudding1@gmail.com",
        pass: "cakePudding222"
    }
  });

  //Mail options
  var mailOpts = {
    from: 'cakepudding1@gmail.com',
    to: 'lukejamestodd1@gmail.com',
    subject: 'Website contact form',
    html: 'From '
      + req.body.nm
      + '<br><br>'
      + req.body.email
      + '<br><br>'
      + req.body.message
  };

  //Checking for completion
  if (!req.body.nm || !req.body.email || !req.body.message) {
    res.render('contact', {
      title: 'Contact Us',
      msg: 'Please include a name and email.',
      err: true,
      page: 'contact',
      user: req.user});

  //Honey pot spam rejection
  } else if (req.body.spampot) {
    res.render('contact', {
      title: 'Contact Us',
      msg: 'You are a spam bot.',
      err: true,
      page: 'contact' ,
      user: req.user});
  }

  //Error msging
  smtpTrans.sendMail(mailOpts, function (error, response) {
    //Email not sent
    if (error) {
        console.log(error);
        res.render('contact', {
          title: 'Contact Us',
          msg: 'Error occured.',
          err: true, page: 'contact', user: req.user});
    }
    //Yay!! Email sent
    else {
        res.render('contact', {
          title: 'Contact Us',
          msg: 'Message sent! Thank you.',
          err: false, page: 'contact',
          user: req.user});
    }
  });
});

module.exports = router;
