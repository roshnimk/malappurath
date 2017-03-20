angular.module('myBank').controller('accountsController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.username = sessionStorage.username;
  $scope.isLoggedIn = sessionStorage.isLoggedIn;


  $scope.currentPage = 1;
  $scope.totalPage = 0;
  $scope.recordNumber = 10;
  var current = 0;
  var next = $scope.recordNumber;
  $scope.prev = true;
  var success = function(response) {
    $scope.accounts = response.data;
    // $scope.sorterFunc = function(account){
    // return parseInt(account.accountBalance);
    //};
    $scope.totalPage = Math.ceil($scope.accounts.length / $scope.recordNumber);
    $scope.pagedAccounts = $scope.accounts.slice(current, next);
    if ($scope.totalPage == $scope.currentPage) {
      $scope.next = true;
    }
  };
  var onError = function(response) {
    alert("Couldn't fetch account details. Server error");
  };

  $scope.params = JSON.stringify({
    username: $scope.username
  });
  $http.post("/user/accounts/", $scope.params)
    .then(success, onError)

  $scope.paginate = function(action) {

    if (action == 1 && $scope.totalPage > $scope.currentPage) {
      current += $scope.recordNumber ;
      next += $scope.recordNumber ;
      $scope.currentPage += 1;
      $scope.prev = false;
      $scope.pagedAccounts = $scope.accounts.slice(current, next);
    } else if (action == -1 && $scope.currentPage > 1) {
      current -= $scope.recordNumber;
      next -= $scope.recordNumber ;
      $scope.currentPage -= 1;
      $scope.pagedAccounts = $scope.accounts.slice(current, next);
      $scope.next = false;
    }
    if ($scope.currentPage == $scope.totalPage) {
      $scope.next = true;
    }
    if ($scope.currentPage == 1) {
      $scope.prev = true;
    }
  }

}])
