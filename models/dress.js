var mongoose = require('mongoose');  

var dressSchema = new mongoose.Schema({  
  name: String,
  user_id: String,
  event_id: String
});

mongoose.model('Dress', dressSchema);