var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'pages/home.ejs',
    controller  : 'HomeController'
  })
  .when('/search', {
    templateUrl : 'pages/search.ejs',
    controller  : 'SearchController'
  })
  .when('/events/:id', {
    templateUrl : 'pages/eventpage.ejs',
    controller  : 'EventPageController'
  })

  .when('/info', {
    templateUrl : 'pages/info.ejs',
    controller  : 'InfoController'
  })
  .when('/about', {
    templateUrl : 'pages/about.ejs',
    controller  : 'AboutController'
  })
  .when('/login', {
    templateUrl : 'pages/login.ejs',
    controller  : 'LoginController'
  })
  .when('/contact', {
    templateUrl : 'pages/contact.ejs',
    controller  : 'ContactController'
  })
  .when('/newevent', {
    templateUrl : 'pages/newevent.ejs',
    controller  : 'NewEventController'
  })
  .otherwise({redirectTo: '/'});
});

// =========================== FACTORIES ====================== //

app.factory('CUSavedEvents', ['$http', function($http){
  return $http.get('/cu');
}]);

app.factory('Events', ['$http', function($http){
  return $http.get('/api/events');
}]);

app.factory('Event', ['$resource', function($resource){
  //get/save/post/delete all included in resource, need to define update method
  return $resource('/api/events/:id', null, {
    'update': {method: 'PUT'}
  });
}]);

// ========================== CONTROLLERS ===================== //

app.controller('HomeController', ['$scope', 'CUSavedEvents', function ($scope, CUSavedEvents) {
  CUSavedEvents.success(function(data){
    $scope.savedEvents = data;
    $scope.message = 'Hello from HomeController';
    console.log(data);
  })
  .error(function(data, status){
    console.log(data, status);
    $scope.savedEvents = [];
  });
}]);

app.controller('SearchController', ['$scope', 'Events', function ($scope, Events) {
  Events.success(function(data){
    $scope.events = data;
    $scope.message = 'Hello from SearchController';
    console.log(data);
  })
  .error(function(data, status){
    console.log(data, status);
    $scope.events = [];
  });
}]);

app.controller('EventPageController', ['$scope', 'Event', function ($scope, Event) {
    $scope.events = Event.query();
    $scope.message = 'Hello from EventPageController';
    console.log(Event.query()); 
}]);


app.controller('InfoController', function($scope) {
  $scope.message = 'Hello from InfoController';
});

app.controller('AboutController', function($scope) {
  $scope.message = 'Hello from AboutController';
});

app.controller('LoginController', function($scope) {
  $scope.message = 'Hello from LoginController';
});

app.controller('ContactController', function($scope) {
  $scope.message = 'Hello from ContactController';
});

app.controller('NewEventController', function($scope) {
  $scope.message = 'Hello from NewEventController';
});



// ==============================================================

var dress = angular.module('dress', []);
function dressController($scope, $http) {
    $scope.formData = {};
    // when landing on the page, get all dresses and show them
    $http.get('/api/dresses')
        .success(function(data) {
            $scope.dresses = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.init = function(name, event_id)
      {
        //This function is sort of private constructor for controller
        $scope.name = name;
        $scope.event_id = event_id;
        //Based on passed argument you can make a call to resource
        //and initialize more objects
        //$resource.getMeBond(007)
      };
    // when submitting the add form, send the text to the node API
    $scope.createDress = function() {
        $http.post('/api/dresses', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.dresses = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a dress after checking it
    $scope.deleteDress = function(id) {
        $http.delete('/api/dresses/' + id)
            .success(function(data) {
                $scope.dresses = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}

var event = angular.module('event', []);
function eventController($scope, $http) {
    $scope.formData = {};
    // when landing on the page, get all events and show them
    $http.get('/api/events')
        .success(function(data) {
            $scope.events = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    // when submitting the add form, send the text to the node API
    $scope.createEvent = function() {
        $http.post('/api/events', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.events = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a event after checking it
    $scope.deleteEvent = function(id) {
        $http.delete('/api/events/' + id)
            .success(function(data) {
                $scope.events = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.clearFilter = function() {
      console.log("xxx");
      $scope.query = {};
    };
}

var savedEvent = angular.module('savedEvent', []);
function savedEventController($scope, $http) {
    $scope.formData = {};
    // when landing on the page, get all savedEvents and show them
    $http.get('/cu')
        .success(function(data) {
            $scope.savedEvents = data;
            console.log(data);
            if (data.length === 0){
                $('#cusec').hide();
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    // when submitting the add form, send the text to the node API
    $scope.createSavedEvent = function() {
        $http.post('/api/savedEvents', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.savedEvents = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a savedEvent after checking it
    $scope.deleteSavedEvent = function(id) {
        $http.delete('/api/savedEvents/' + id)
            .success(function(data) {
                $scope.savedEvents = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}