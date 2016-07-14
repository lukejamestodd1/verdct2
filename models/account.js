var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    email: String,

    facebook: {
    	id: String,
	    token: String,
	    email: String,
	    name: String,
    },
    instagram: {
    	id: String,
	    token: String,
	    email: String,
	    name: String,
	    username: String,
    },
    twitter: {
        id: String,
        token: String,
        email: String,
        name: String,
        username: String,
    }
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);