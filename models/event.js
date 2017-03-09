var mongoose = require('mongoose');  

var eventSchema = new mongoose.Schema({  
  name: String,
  type: String,
  img_url: String,

  u_id: String,
  u_name: String,
  u_email: String,
  
  venue: String,
  address: String,
  suburb: String,
  city: String,
  state: String,
  
  time: String,
  day: String,
  month: String,
  year: String,
  date: Date,

  password: String,

});

mongoose.model('Event', eventSchema);