var mongoose = require('mongoose');  

var dressSchema = new mongoose.Schema({  
  name: String,
  user_id: String,
  owner: String,
  event_id: String,
  brand: String,
  cost: Number,
  img_url: String,
  sTop: String,
  sBot: String,
  colour: String

});

mongoose.model('Dress', dressSchema);