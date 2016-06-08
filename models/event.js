var mongoose = require('mongoose');  

var eventSchema = new mongoose.Schema({  
  name: String,
  user_id: String,
  owner: String
});

mongoose.model('Event', eventSchema);