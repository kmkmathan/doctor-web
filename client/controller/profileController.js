angular.module('tatluApp').controller('profileController', function($scope, $http,fileUpload,$location,$cookies,AuthenticationService) {

//cookies defination//
  var authUser = $cookies.getObject('authUser');

//checking cookies details that the user is logged in or not//
  if (authUser != undefined) {
    console.log(authUser.currentUser.isLoggedIn);
    $scope.loggedIn=authUser.currentUser.isLoggedIn;
        loggedInUser = authUser.currentUser.userInfo;
        console.log(loggedInUser);
        $scope.Currentuser=loggedInUser;
        $http.get('/api/getuser').success(function (response) {

  for(var m=0;m<response.length;m++){
    if(response[m].id==loggedInUser.Id){
      $scope.currentperson=response[m];
  $scope.pic=response[m].profileImage;
  $scope.cover=response[m].coverPic;

  $scope.coverPic="uploads"+"/"+$scope.cover;
  $scope.dp="uploads"+"/"+$scope.pic;

    }
  }
        });

        // $scope.pic=loggedInUser.dp;
        $scope.name=loggedInUser.fname;
  $scope.type=loggedInUser.usertype;
        console.log($scope.dp);
        console.log($scope.name);
      }



$scope.profile={};
$scope.uploadlink=true;
$scope.changedp=false;
$scope.showdp=function(){
  $scope.uploadlink=false;
$scope.changedp=true;

}

$scope.coverbutton=true;
$scope.changecover=false;
$scope.coverChange=function(){
  $scope.coverbutton=false;
$scope.changecover=true;

}

//changing profile picture code//
$scope.changeDp=function(){

  //uploading image code//
  var file =$scope.myFile;
  var uploadUrl = "/savedata";
  fileUpload.uploadFileToUrl(file, uploadUrl);
  $scope.profile._id=loggedInUser.Objid;
  $scope.profile.id=loggedInUser.Id;
$scope.profile.profileImage=$scope.myFile.name;

  $http.put('/api/updateDetails/' + $scope.profile._id, $scope.profile).success(function (response) {
  console.log(response);
  alert("Profile picture has been changed!!!");
  location.reload();

  })

}

$scope.changeCover=function(){
  var file =$scope.myFile;
  var uploadUrl = "/savedata";
  fileUpload.uploadFileToUrl(file, uploadUrl);
  $scope.profile._id=loggedInUser.Objid;
  $scope.profile.id=loggedInUser.Id;
$scope.profile.coverPic=$scope.myFile.name;

  $http.put('/api/updateDetails/' + $scope.profile._id, $scope.profile).success(function (response) {
  console.log(response);
  alert("Cover picture has been changed!!!");
  location.reload();

  })

}


//code for password changing//

$scope.changePassword=function(){
  $scope.profile._id=loggedInUser.Objid;
  $scope.profile.id=loggedInUser.Id;
if($scope.profile.Password==$scope.profile.cPassword){
  //pass word will be updated by below code//
    $http.put('/api/update/' + $scope.profile._id, $scope.profile).success(function (response) {
    console.log(response);
    alert("Your password has been changed!!!");

    })

}
else{

alert("Try Again..!!");

}

}


  });
