angular.module('tatluApp').controller('HomeController', function($scope, $http, $rootScope, $location,$filter,AuthenticationService) {

  var refreshDoctor = function () {
        $http.get('/doctor/doctor').success(function (response) {
            $scope.doctorlist = response;
        });

    };

    refreshDoctor();
  
  
  
  
//logout coding//
    $scope.LogOut = function() {
        AuthenticationService.Logout(function(response) {
                $location.path('/sign-in');

        });
    };


    var refreshfacility = function () {
          $http.get('/facility/facility').success(function (response) {
              console.log(' READ IS SUCCESSFUL');
              $scope.FacilityList = response;
            });
          };
           refreshfacility();
           

  	$scope.onSelect = function(selection) {
  		console.log(selection);
  		$scope.selectedData = selection;
  	};


    var i;

$scope.search=function(){
    $rootScope.loc=$scope.selectedlocation;
    $rootScope.doc=$scope.selecteddoctor;
    $location.path('/doctorlist');
}


  });
