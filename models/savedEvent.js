var mongoose = require('mongoose');  

var savedEventSchema = new mongoose.Schema({  
  user_id: String,
  event_id: String
});

mongoose.model('SavedEvent', savedEventSchema);