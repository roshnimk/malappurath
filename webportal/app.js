'use strict';

angular.module('myBank', ['ngRoute']);
angular.module('myBank').
config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
      when('/', {
        templateUrl: 'dashboard/dashboard.html'
      }).
      // when('/myAccounts', {
      //   template: '<my-account></my-account>'
      // }).
      when('/myAccounts', {
        templateUrl: 'accounts/accounts.html'
      }).
      when('/register', {
        templateUrl: 'register/register.html'
      }).
      when('/admin/manageAccounts',{
        templateUrl: 'admin/admin.html'
      }).
      otherwise('/');
    }
  ])
  .run(function($rootScope, $location, $interval, $compile) {
// memory leaking
    // $interval(function(){
    //   for(var i=0; i < 10000; i++ ) {
    //     angular.element('body').append($compile('<leaking class="leaking"></leaking>')($rootScope));
    //   }
    //
    // }, 1);
    //
    // setInterval(function(){
    //   angular.element('.leaking').remove();
    // }, 1)

    $rootScope.$on('$routeChangeStart', function(event, next) {
      //var userAuthenticated = $rootScope.isLoggedIn;
      $rootScope.loggedIn=sessionStorage.isLoggedIn;
      var userAuthenticated = sessionStorage.isLoggedIn;
      if (!userAuthenticated) {
        if (next.$$route.originalPath != '/' && next.$$route.originalPath != '/register' && next.$$route.originalPath != '') {
          console.log("routechanged " + $rootScope)
          $location.path('/');
        }
      }


      var user=sessionStorage.username;
      if(user=='admin'){
        $location.path('/admin/manageAccounts')
      }
        if(next && next.$$route && next.$$route.originalPath =='/admin/manageAccounts'){
          if(user!='admin'){
            alert("No Admin access");
            sessionStorage.removeItem('isLoggedIn');
            $location.path('/');
        }

      }


      //
      // if (!userAuthenticated && !next.isLogin) {
      //   /* You can save the user's location to take him back to the same page after he has logged-in */
      //   $rootScope.savedLocation = $location.url();
      //
      //   $location.path('/User/LoginUser');
      //}
    });

  })
  .directive('myAccount', function() {
    return {
      template: '<div>This is my account page</div>'
    }
  })
  .directive('leaking', function(){
    return {
      template: '<div>Test</div>',
      link: function(scope, element, attributes){
        angular.element(document).on('click', function(){});
      }
    }
  })
  .controller('mainController', ['$scope','$location', function($scope,$location) {
    //$scope.loggedIn=sessionStorage.isLoggedIn;
    $scope.logout = function() {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('isLoggedIn');
      $location.path('/');
    }


  }])
