angular.module('tatluApp').controller('LoginController', function($scope, $http,AuthenticationService,$location) {


//function for login//
$scope.LogIn = function() {

  //authentication service will be called here//
    AuthenticationService.Login($scope.User, function(response) {

$scope.response=response.data;

$scope.errormessage=$scope.response.message;
        if (response.data.success === true) {
          if(response.data.userDetail.UserType=="Patient"){

              $location.path('/patienthome');

          }
          if(response.data.userDetail.UserType=="Admin"){

              $location.path('/dashboard');
          }
          if(response.data.userDetail.UserType=="Doctor"){

              $location.path('/doctorhome');
          }
          if(response.data.userDetail.UserType=="Nurse"){

              $location.path('/nursehome');
          }
          if(response.data.userDetail.UserType=="Callcenter"){

              $location.path('/callcenterhome');
          }
          if(response.data.userDetail.UserType=="Frontdesk"){

              $location.path('/frontdeskhome');
          }
          if(response.data.userDetail.UserType=="FacilityAdmin"){

              $location.path('/dashboard');
          }

        }
    });
};



});
