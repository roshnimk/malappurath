angular.module('myBank').controller('adminController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.username = "Bank Admin";
  $scope.addAccount = function(user) {

    console.log(user);

    $http.post("/admin/addAccounts/", user)
      .then(success, onError)

  }
  var success = function(response) {
    console.log(response.data);
    if (response.status == 200) {
      alert("account added")
    } else {
      alert('error in adding account');

    }
  };
  var onError = function(response) {
    alert("Couldn't add account. Server error");
  };

  $scope.removeAccount = function(user) {

    console.log(user);
    $http.post("/admin/removeAccounts/", user)
      .then(removeSuccess, removeOnError)


    // $http.post("/admin/addAccounts/", user)
    //   .then(success, onError)

  }
  var removeSuccess = function(response) {
    console.log(response.data);
    if (response.status == 200) {
      alert("account removed")
    } else if (response.status==402){
      alert('error in removing account' );

    }
  };
  var removeOnError = function(response) {
    alert("Couldn't remove account. Server error");
  };

}])
