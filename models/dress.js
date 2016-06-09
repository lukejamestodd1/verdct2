var mongoose = require('mongoose');  

var dressSchema = new mongoose.Schema({  
  name: String,
  user_id: String,
  owner: String,
  event_id: String,
  brand: String,
  cost: Number,
  img_url: String,
  styleTop: String,
  styleBottom: String,
  colour: String
  
});

mongoose.model('Dress', dressSchema);