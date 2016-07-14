//dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy; 
var configAuth = require('./config/auth');

//database and models
var db = require('./models/db');
// var user = require('./models/user');
var event = require('./models/event');
var dress = require('./models/dress');
var savedEvent = require('./models/savedEvent');

//controllers
var mainController = require('./routes/mainController');
var usersController = require('./routes/api/usersController');
var eventsController = require('./routes/api/eventsController');
var dressesController = require('./routes/api/dressesController');
var savedEventsController = require('./routes/api/savedEventsController');

//app
var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.use(new FacebookStrategy({  
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name'],
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      //Find by EMAIL - and update details if match****
      Account.findOne({ 'facebook.id': profile.id }, function(err, account) {
        if (err)
          return done(err);
        if (account) {
          return done(null, account);
        } else {
          var newAccount = new Account();
          newAccount.facebook.id = profile.id;
          newAccount.facebook.token = token;
          newAccount.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newAccount.facebook.email = (profile.emails[0].value || '').toLowerCase();
          newAccount.email = newAccount.facebook.email;
          newAccount.username = newAccount.facebook.name;
          newAccount.save(function(err) {
            if (err)
              throw err;
              return done(null, newAccount);
          });
        }
      });
    });
  }));

passport.use(new InstagramStrategy({
  clientID: configAuth.instagramAuth.clientID,
  clientSecret: configAuth.instagramAuth.clientSecret,
  callbackURL: configAuth.instagramAuth.callbackURL,
  profileFields: ['id', 'email', 'first_name', 'last_name'],
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    //Find by EMAIL - and update details if match****
    Account.findOne({ 'instagram.id': profile.id }, function(err, account) {
      if (err)
        return done(err);
      if (account) {
        return done(null, account);
      } else {
        var newAccount = new Account();
        newAccount.instagram.id = profile.id;
        newAccount.instagram.token = token;
        newAccount.instagram.name = profile.name.givenName + ' ' + profile.name.familyName;
        newAccount.save(function(err) {
          if (err)
            throw err;
            return done(null, newAccount);
        });
      }
    });
  });
}
));

passport.serializeUser(function(Account, done) {
  done(null, Account);
});

passport.deserializeUser(function(Account, done) {
  done(null, Account);
});

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routing
app.use('/', mainController);
app.use('/api/users', usersController);
app.use('/api/events', eventsController);
app.use('/api/dresses', dressesController);
app.use('/api/savedEvents', savedEventsController);



//error handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//
module.exports = app;
