console.log("HELLO");

var dress = angular.module('dress', []);

function mainController($scope, $http) {
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