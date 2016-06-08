var mongoose = require('mongoose');  

var eventSchema = new mongoose.Schema({  
  name: String,
  user_id: String
});

mongoose.model('Event', eventSchema);