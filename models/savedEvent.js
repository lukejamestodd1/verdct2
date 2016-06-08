var mongoose = require('mongoose');  

var savedEventSchema = new mongoose.Schema({  
  user_id: String,
  event_id: String,
  dress_id: String,
  d_name: String,
  u_name: String
});

mongoose.model('SavedEvent', savedEventSchema);


// SHOW ALL EVENTS 
// show all events/search

// SHOW ONE EVENT
// show savedEvents where eventID = this

// SHOW MY EVENTS
// show savedEvents where userID = this
// show dresses where userID = this

// SHOW ONE SAVED EVENT
// show dresses where user_id = this and event_id = this
// Show savedEvents where event_id = this and userID = this

// SAVE DRESS TO EVENT
// savedEvent.dressID = this dress_ID,
// same for other attribs do visibility here