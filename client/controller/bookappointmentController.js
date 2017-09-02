angular.module('tatluApp').controller('bookappointmentController', function($scope, $http,fileUpload,$location,$rootScope,$cookies) {
  var socket=io();

var authUser = $cookies.getObject('authUser');

var Userfname = authUser.currentUser.userInfo.fname;
var UserID = authUser.currentUser.userInfo.Id;

$scope.fname = Userfname;
$scope.Id = UserID;
  
  
  
  $scope.appointtime = ['12:00 AM','12:30 AM','1:00 AM','1:30 AM','2:00 AM','2:30 AM','3:00 AM','3:30 AM','4:00 AM','4:30 AM','5:00 AM','5:30 AM','6:00 AM','6:30 AM','7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM',
'11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM','10:30 PM','11:00 PM','11:30 PM'];
$scope.gender = ['Male', 'Female'];
$scope.service = ['Dental Checkup', 'Full Body Checkup','ENT Checkup','Heart Checkup'];





  



// **********************************  book appointment  *****************************************************

var authUser = $cookies.getObject('authUser');

var Userfname = authUser.currentUser.userInfo.fname;
var UserID = authUser.currentUser.userInfo.Id;

$scope.fname = Userfname;
$scope.Id = UserID;
  
  $scope.datepickerConfig = {
         allowFuture: false,
         dateFormat: 'DD/MM/YYYY'
     };



var refreshbookapt = function () {


      $http.get('/bookappointment/bookappointment').success(function (response) {
          $scope.apptlist = response;
            $scope.bookappointment ="";
      });
  };
  refreshbookapt();


  $scope.addbookappointment = function(){

    // var data = $.param({
    //     bookappointment: JSON.stringify({
    //         // author: $scope.author,
    //         // title : $scope.title,
    //         // body : $scope.body,
    //         Patientid :  $scope.UserID
    //
    //
    //         //  Firstname = req.body.firstName;
    //         //  Patientid = req.body.patientid;
    //         //  Lastname = req.body.lastName;
    //         //  Service = req.body.service;
    //         //  Aptdate = req.body.appointdate;
    //         //  Apttime = req.body.appointtime;
    //         //  Gender = req.body.gender;
    //         //  Reason = req.body.reason;
    //
    //
    //     })
    //   });

      $scope.bookappointment.firstName=Userfname;
      $scope.bookappointment.patientid=UserID;
   $scope.bookappointment.status="Not Arrived";
  $http.post('/bookappointment/bookappointment', $scope.bookappointment).success(function (response) {
  console.log(response);
  alert("Registration completed!!!");
      refreshbookapt();
  });
};



// *****************************************************************************************************************












});
