angular.module('myBank').controller('loginController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

  $scope.login = function(myUser) {
    $scope.params = JSON.stringify({

      type: "user",
      username: $scope.myUser,
      password: $scope.myPwd
    });
    var success = function(response) {
      if (response.data.status == 'success') {
        // $rootScope.isLoggedIn = true;
        sessionStorage.setItem('isLoggedIn', true)
        sessionStorage.setItem('username', response.data.user)
        $location.path('/myAccounts');
      } else {
        console.log(response.data)
        alert(response.data.status )
      }

    };
    var onError = function(response) {
      alert("Couldn't login. Server not avilable");
    };
    $http.post("/user/login/", $scope.params)
      .then(success, onError)
  }
  $scope.register = function() {
    $location.path('/register');
  }
}]);
