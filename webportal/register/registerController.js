angular.module('myBank').controller('registerController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.registerUser = function(newuser) {
    $http.post("/user/register/", newuser)
      .then(success, onError)

  }
  var success = function(response) {
    if (response.data.statusCode == 01) {
      alert("User name already exists")
    } else if (response.data.statusCode == 02) {
      alert("First name mandatory")
    } else {
      alert('Registration successful');
      $location.path('/');
    }
  };
  var onError = function(response) {
    alert("Couldn't register. Server error");
  };

}])
