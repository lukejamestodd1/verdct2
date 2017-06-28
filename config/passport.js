var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var Account = require('../models/account');
var configAuth = require('./auth');

passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name'],
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
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

          newAccount.save(function(err) {
            if (err)
              throw err;
            return done(null, newAccount);
          });
        }
      });
    });
  }));

// Instagram Strategy
passport.use(new instagramStrategy({
		clientID: configAuth.instagramAuth.clientID,
		clientSecret: configAuth.instagramAuth.clientSecret,
		callbackURL: "http://localhost:8080/auth/instagram/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		Account.findOne(
			// query document
			{ instagramId: profile.id},
			// update-create document
			{
				username: profile._json.data.username,
				displayName: profile._json.data.full_name,
				picture: profile._json.data.profile_picture,
				instagramId: profile._json.data.id,
				instagramAccessToken: accessToken
			},
			// options
			{
				'new': true,
				upsert: true,
			},
			// callback
			function(err, user) {
				done(err, user);
			}
		);
	}
));
