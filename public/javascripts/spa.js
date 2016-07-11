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
