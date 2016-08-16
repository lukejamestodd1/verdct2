var mongoose = require('mongoose');  

var eventSchema = new mongoose.Schema({  
  name: String,
  user_id: String,
  owner: String,
  venue: String,
  address: String,
  suburb: String,
  city: String,
  state: String,
  type: String,
  month: String,
  time: String,
  img_url: String,
  login: String,
  password: String,
  admin: Array
  
});

mongoose.model('Event', eventSchema);

//user_id, u_name,