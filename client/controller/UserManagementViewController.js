angular.module('tatluApp').controller('UserManagementViewController', function($scope, $http, $rootScope, $location,$filter,$cookies,AuthenticationService) {
  var authUser = $cookies.getObject('authUser');

  if (authUser != undefined) {
    console.log(authUser.currentUser.isLoggedIn);
    loggedInUser = authUser.currentUser.userInfo;
  console.log(loggedInUser.usertype);

  }

  $scope.doceditShow=true;
  $scope.docdelShow=true;


  	var refreshfac = function () {
          $http.get('/formAcc/formAcc').success(function (response) {
              $scope.formList = response;

  var i;
  for(i=0;i<$scope.formList.length;i++){
    if($scope.formList[i].userType==loggedInUser.usertype){

  //
  // if($scope.formList[i].doctorRegAdd!=true){
  // 	$scope.addShow=false;
  // }else{
  // 	$scope.addShow=true;
  //
  // }
  if($scope.formList[i].doctorRegEdit!=true){
  	$scope.doceditShow=false;
  }else{
  	$scope.doceditShow=true;

  }
  if($scope.formList[i].doctorRegDel!=true){
  	$scope.docdelShow=false;
  }else{
  	$scope.docdelShow=true;

  }



}}



          });
      };

      refreshfac();


//Doctor module controller

  var refreshDoctor = function () {
        $http.get('/doctor/doctor').success(function (response) {
            $scope.doctorlist = response;
        });

    };

    refreshDoctor();

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

//code for delete//
$scope.delDoctor = function(d) {
    //console.log(id);
    $http.delete('/doctor/doctor/' + d._id).success(function(response) {
        console.log(response);
        refreshDoctor();
    });
};


$scope.DoctorForm=false;

//code for edit//
$scope.editDoctor = function(d) {
    $http.get('/doctor/doctor/' + d._id).success(function(response) {
        $scope.doct = response[0];
        $scope.DoctorForm=true;

    });
};

//code for update//

$scope.updateDoctor= function() {
    $http.put('/doctor/doctor/' + $scope.doct._id, $scope.doct).success(function(response) {
        console.log(response);
        $scope.DoctorForm=false;
        refreshDoctor();

    })
}




//Nurse module controller
$scope.refreshnurse = function () {
      $http.get('/nurse/nurse').success(function (response) {
          console.log(' READ IS SUCCESSFUL');
          $scope.nurselist = response;
          $scope.nurse="";
      });
  };

  $scope.refreshnurse();

  //code for delete//
  $scope.delNurse = function(d) {
      //console.log(id);
      $http.delete('/nurse/nurse/' + d._id).success(function(response) {
          console.log(response);
          $scope.refreshnurse();
      });
  };


  $scope.nurseForm=false;

  //code for edit//
  $scope.editNurse = function(d) {
      $http.get('/nurse/nurse/' + d._id).success(function(response) {
          $scope.nur = response[0];
          $scope.nurseForm=true;

      });
  };

  //code for update//

  $scope.updateNurse= function() {
      $http.put('/nurse/nurse/' + $scope.nur._id, $scope.nur).success(function(response) {
          console.log(response);
          $scope.nurseForm=false;
          $scope.refreshnurse();

      })
  }

// Call center module
$scope.refreshncal = function () {
      $http.get('/cal/cal').success(function (response) {
          console.log(' READ IS SUCCESSFUL');
          $scope.callist = response;
          $scope.cal="";
      });
  };

  $scope.refreshncal();


  //code for delete//
  $scope.delCall = function(d) {
      //console.log(id);
      $http.delete('/cal/cal/' + d._id).success(function(response) {
          console.log(response);
          $scope.refreshncal();
      });
  };


  $scope.calForm=false;

  //code for edit//
  $scope.editCall = function(d) {
      $http.get('/cal/cal/' + d._id).success(function(response) {
          $scope.cal = response[0];
          $scope.calForm=true;

      });
  };

  //code for update//

  $scope.updateCall= function() {
      $http.put('/cal/cal/' + $scope.cal._id, $scope.cal).success(function(response) {
          console.log(response);
          $scope.calForm=false;
          $scope.refreshncal();

      })
  }


//Frontdesk
$scope.refreshFrontdesk = function () {
      $http.get('/front/front').success(function (response) {
          console.log(' READ IS SUCCESSFUL');
          $scope.FrontList = response;
        });
      };
      $scope.refreshFrontdesk();





//Facility Admin


$scope.refreshfacility = function () {
      $http.get('/facilityadm/facilityadm').success(function (response) {
          console.log(' READ IS SUCCESSFUL');
          $scope.FacilityList = response;
        });
      };
       $scope.refreshfacility();


       //code for delete//











  });
