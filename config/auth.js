module.exports = {
  facebookAuth: {
    clientID: '1561353927499605',
    clientSecret: '2bdb26b61edb1d50d2e72716c3a50b4d',
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
  },
  instagramAuth: {
    clientID: '415641f31f244a4d8dc1db324e077ec7',
    clientSecret: '5e19d2bceb0e426c9a7c8116a7385e97',
    redirect_uri: 'http://localhost:8080/auth/instagram/callback',
  }
  // twitterAuth: {
  //   consumerKey: 'YOUR-TWITTER-CONSUMER-KEY',
  //   consumerSecret: 'YOUR-TWITTER-CONSUMER-SECRET',
  //   callbackURL: 'http://localhost:3000/auth/twitter/callback',
  // },
  // googleAuth: {
  //   clientID: 'YOUR-GOOGLE-CLIENT-ID',
  //   clientSecret: 'YOUR-GOOGLE-CLIENT-SECRET',
  //   callbackURL: 'http://localhost:3000/auth/google/callback',
  // },
};
