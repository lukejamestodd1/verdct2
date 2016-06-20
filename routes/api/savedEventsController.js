var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var	bodyParser = require('body-parser');
var methodOverride = require('method-override');

// var visibility = function(attribute, checkbox){
//   if (checkbox === 'checked'){
//     return attrubute;
//   } else {
//     return 'undefined';
//   }
// };

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
        //retrieve all savedEvents from Monogo
        mongoose.model('SavedEvent').find({}, function (err, savedEvents) {
              if (err) {
                  return console.error(err);
              } else {
                  
                  res.format({
                      html: function(){
                           res.render("api/savedEvents/index",{
                                title: "all saved events",
                                "savedEvents" : savedEvents
                           });
                     },
                    //JSON response will show all savedEvents in JSON format
                    json: function(){
                        res.json(savedEvents);
                    }
                });
              }     
        });
    })

    // ============================ POST NEW
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var user_id = req.user._id;
        var u_name = req.user.username;
        var event_id = req.body.event_id;
        var e_name = req.body.e_name;
        var e_img = req.body.e_img;
        var dress_id = req.body.dress_id;
        var d_name = req.body.d_name;
        var d_img = req.body.d_img;
        var brand = req.body.brand;
        var cost = req.body.cost;
        var sTop = req.body.sTop;
        var sBot = req.body.sBot;
        var colour = req.body.colour;

        //call create function
        mongoose.model('SavedEvent').create({
            user_id : user_id,
            u_name : u_name,
            event_id : event_id,
            e_name : e_name,
            dress_id : dress_id,
            d_name : d_name,
            d_img : d_img,
            brand : brand,
            cost : cost,
            sTop : sTop,
            sBot : sBot,
            colour : colour

        }, function (err, savedEvent) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //savedEvent has been created
                  console.log('POST creating new savedEvent: ' + savedEvent);
                  res.format({
                    json: function(){
                        res.json(savedEvent);
                    }
                  });
              }
        })
    });

//======================== UPDATE ONE
router.post('/:id', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
      var user_id = req.user._id;
      var u_name = req.user.username;
      var event_id = req.body.event_id;
      var e_name = req.body.e_name;
      var e_img = req.body.e_img;
      var dress_id = req.body.dress_id;
      var d_name = req.body.d_name;
      var d_img = req.body.d_img;
      var brand = req.body.brand;
      var cost = req.body.cost;
      var sTop = req.body.sTop;
      var sBot = req.body.sBot;
      var colour = req.body.colour;

   //find the document by ID
    mongoose.model('SavedEvent').findById(req.id, function (err, savedEvent) {
        savedEvent.update({
            user_id : user_id,
            u_name : u_name,
            event_id : event_id,
            e_name : e_name,
            dress_id : dress_id,
            d_name : d_name,
            d_img : d_img,
            brand : brand,
            cost : cost,
            sTop : sTop,
            sBot : sBot,
            colour : colour
                
        }, function (err, savedEventID) {
          if (err) {
              res.send("There was a problem updating the information to the database: " + err);
          } 
          else {
                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                  res.format({
                      html: function(){
                           res.redirect("/home");
                     }
                  });
           }
        })
    });
});

// ========================= CREATE NEW FORM
router.get('/new', function(req, res) {
    res.render('api/savedEvents/new', { title: 'Add New savedEvent' }); 
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('SavedEvent').findById(id, function (err, savedEvent) {
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
            
            console.log(savedEvent);
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
    mongoose.model('SavedEvent').findById(req.id, function (err, savedEvent) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + savedEvent._id);
        
        res.format({
          
          json: function(){
              res.json(savedEvent);
          }
        });
      }
    });
  });

 //====================== SHOW EDIT FORM
router.get('/:id/edit', function(req, res) {
    //search for the savedEvent within Mongo
    mongoose.model('SavedEvent').findById(req.id, function (err, savedEvent) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the savedEvent
            // console.log('GET Retrieving ID: ' + savedEvent._id);
  
            res.format({
                html: function(){
                       res.render("api/savedEvents/edit",{
                          title: "edit saved event",
                          "savedEvent" : savedEvent
                      });
                 },
                json: function(){
                       res.json(savedEvent);
                 }
            });
        }
    });
});

//===================== DELETE
router.delete('/:id', function (req, res){
    //find savedEvent by ID
    mongoose.model('SavedEvent').findById(req.id, function (err, savedEvent) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            savedEvent.remove(function (err, savedEvent) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + savedEvent._id);
                    res.format({
                        //HTML returns back to the main page
                          html: function(){
                               res.redirect("/api/savedEvents");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : savedEvent
                               });
                         }
                      });
                }
            });
        }
    });
});

module.exports = router;