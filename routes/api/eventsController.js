var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var	bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

router.route('/')
    //============================== GET ALL
    .get(function(req, res, next) {
        //retrieve all events from Monogo
        mongoose.model('Event').find({}, function (err, events) {
              if (err) {
                  return console.error(err);
              } else {
                  
                  res.format({
                      
                    //JSON response will show all events in JSON format
                    json: function(){
                        res.json(events);
                    }
                });
              }     
        });
    })

    // ============================ POST NEW
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var user_id = req.user._id;
        var owner = req.user.username;
        
        //call create function
        mongoose.model('Event').create({
            name : name,
            user_id : user_id,
            owner: owner

        }, function (err, event) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //event has been created
                  console.log('POST creating new event: ' + event);
                  res.format({
                  	
                    //JSON response will show the newly created event
                    json: function(){
                        res.json(event);
                    }
                });
              }
        })
    });

//======================== UPDATE ONE
router.put('/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
      var name = req.body.name;
      var user_id = req.user._id;
      var owner = req.user.username;

   //find the document by ID
    mongoose.model('Event').findById(req.id, function (err, event) {
        event.update({
            name : name,
            user_id : user_id,
            owner: owner
            
        }, function (err, eventID) {
          if (err) {
              res.send("There was a problem updating the information to the database: " + err);
          } 
          else {
                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                  res.format({
                      html: function(){
                           res.redirect("/api/events/" + event._id);
                     },
                     //JSON responds showing the updated values
                    json: function(){
                           res.json(event);
                     }
                  });
           }
        })
    });
});

router.get('/new', function(req, res) {
  
    res.render('api/events/new', { title: 'Add New event' });
    
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Event').findById(id, function (err, event) {
        //if not found, repond 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            
            console.log(event);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Event').findById(req.id, function (err, event) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + event._id);
        
        res.format({
          
          json: function(){
              res.json(event);
          }
        });
      }
    });
  });

  //GET the individual event by Mongo ID
router.get('/:id/edit', function(req, res) {
    //search for the event within Mongo
    mongoose.model('Event').findById(req.id, function (err, event) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the event
            // console.log('GET Retrieving ID: ' + event._id);
  
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                       res.render('api/events/edit', {
                          title: 'event' + event.name,
                          "event" : event
                      });
                 },
                 //JSON response will return the JSON output
                json: function(){
                       res.json(event);
                 }
            });
        }
    });
});

//DELETE event by ID
router.delete('/:id/edit', function (req, res){
    //find event by ID
    mongoose.model('Event').findById(req.id, function (err, event) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            event.remove(function (err, event) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + event._id);
                    res.format({
                        //HTML returns back to the main page
                          html: function(){
                               res.redirect("/api/events");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : event
                               });
                         }
                      });
                }
            });
        }
    });
});

module.exports = router;