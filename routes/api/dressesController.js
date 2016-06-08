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
      mongoose.model('Dress').find({}, function (err, dresses) {
        if (err) {
            return console.error(err);
        } else {
            res.format({
                
              //JSON response will show all dresses in JSON format
              json: function(){
                  res.json(dresses);
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
    var event_id = req.body.event_id;

    //call create function
    mongoose.model('Dress').create({
        name : name,
        user_id : user_id,
        owner: owner,
        event_id : event_id

    }, function (err, dress) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          } else {
              //dress has been created
              console.log('POST creating new dress: ' + dress);
              res.format({
              	
                //JSON response will show the newly created dress
                json: function(){
                    res.json(dress);
                }
            });
          }
    });
});

//======================== UPDATE ONE
router.put('/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var name = req.body.name;
    var user_id = req.user._id;
    var owner = req.user.username;
    var event_id = req.body.event_id;

   //find the document by ID
    mongoose.model('Dress').findById(req.id, function (err, dress) {
      dress.update({
      name : name,
      user_id : user_id,
      owner: owner,
      event_id : event_id

    }, function (err, dressID) {
          if (err) {
              res.send("There was a problem updating the information to the database: " + err);
          } 
          else {
                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                  res.format({
                      html: function(){
                           res.redirect("/api/dresses/" + dress._id);
                     },
                     //JSON responds showing the updated values
                    json: function(){
                           res.json(dress);
                     }
                  });
           }
        })
    });
});

// ========================= CREATE NEW FORM
router.get('/new', function(req, res) {
    res.render('api/dresses/new', { title: 'Add New dress' });   
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Dress').findById(id, function (err, dress) {
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
            
            console.log(dress);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

// =================== SHOW ONE
router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Dress').findById(req.id, function (err, dress) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + dress._id);
        
        res.format({
          
          json: function(){
              res.json(dress);
          }
        });
      }
    });
  });

//====================== SHOW EDIT FORM
router.get('/:id/edit', function(req, res) {
    //search for the dress within Mongo
    mongoose.model('Dress').findById(req.id, function (err, dress) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the dress
            // console.log('GET Retrieving ID: ' + dress._id);
  
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                       res.render('api/dresses/edit', {
                          title: 'dress' + dress.name,
                          "dress" : dress
                      });
                 },
                 //JSON response will return the JSON output
                json: function(){
                       res.json(dress);
                 }
            });
        }
    });
});

//DELETE dress by ID
router.delete('/:id/edit', function (req, res){
    //find dress by ID
    mongoose.model('Dress').findById(req.id, function (err, dress) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            dress.remove(function (err, dress) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + dress._id);
                    res.format({
                        //HTML returns back to the main page
                          html: function(){
                               res.redirect("/api/dresses");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : dress
                               });
                         }
                      });
                }
            });
        }
    });
});

module.exports = router;