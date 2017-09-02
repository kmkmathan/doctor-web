angular.module('tatluApp').controller('NavController', function($scope, $http,$location,$cookies,AuthenticationService) {

//checking cookies//
  var authUser = $cookies.getObject('authUser');

  //definig socket//
  var socket=io();

//checking logged in or not//
if (authUser != undefined) {
  console.log(authUser.currentUser.isLoggedIn);
  $scope.loggedIn=authUser.currentUser.isLoggedIn;
      loggedInUser = authUser.currentUser.userInfo;
      console.log(loggedInUser);
      $scope.dp="uploads"+"/"+loggedInUser.dp;

      // $scope.pic=loggedInUser.dp;
      $scope.name=loggedInUser.fname;
      $http.get('/api/getuser').success(function (response) {

for(var m=0;m<response.length;m++){
  if(response[m].id==loggedInUser.Id){
// $scope.dp="uploads"+"/"+response[m].profileImage;
  }
}
      });

$scope.type=loggedInUser.usertype;
      // console.log($scope.dp);
      console.log($scope.name);
    }

//logout coding//
    $scope.LogOut = function() {
        AuthenticationService.Logout(function(response) {
                $location.path('/sign-in');

        });
    };

$scope.menuList=[];

//getting menubar details from database//
  $scope.refreshMenu = function () {
        $http.get('/menu/menu').success(function (response) {
            console.log(' READ IS SUCCESSFUL');
            $scope.navList = response;
            for(var i=0;i<$scope.navList.length;i++){
              if($scope.navList[i].user==loggedInUser.usertype){
                console.log($scope.navList[i]);
  $scope.menuList.push($scope.navList[i]);

console.log($scope.menuList);

              }
            }
        });
    };

    //current user details will be emitted to server for socket//
    $scope.sendCurrentUser=function(){
      socket.emit('currentuser',{
            name:$scope.name,
            type:loggedInUser.usertype,
            id:loggedInUser.Id
             })
    }

    if (authUser != undefined) {
    $scope.refreshMenu();
    $scope.sendCurrentUser();
  }


$scope.selectReceiver=function(o){
$scope.sock=o.socketid
}

//message send code in socket//
$scope.sendMessage=function(){
  socket.emit('textMessage',{
    sender:loggedInUser.fname,
message:$scope.textmsg,
socketId:$scope.sock

});


}


//function for displaying sub menus//
$scope.showChilds=function(m){


  m.active=!m.active;

}

$scope.RefreshOnline= function () {
      $http.get('/online/online').success(function (response) {
          $scope.OnlineUserlist = response;
      });
  };

 $scope.RefreshOnline();



$scope.Onlinelist=[];
$scope.OnlineUserlist=[];

//to get new online users  details//
socket.on('newMessage',function(data) {
  console.log(data.message);
 // $scope.OnlineUserlist=data.message;

  for(var f=0;f<data.message.length;f++){
    for(var m=0;m<$scope.OnlineUserlist.length;m++){

if($scope.OnlineUserlist[m].id==data.message[f].id){

console.log($scope.OnlineUserlist[m]._id);

  $scope.OnlineUserlist[m].socketid=data.message[f].socketid;

  console.log($scope.Onlinelist.socketid);
  $http.put('/online/online/' +$scope.OnlineUserlist[m]._id,$scope.OnlineUserlist[m]).success(function(response){
    console.log(response);
  });
  $scope.RefreshOnline();

}
}}
});

$scope.chatmsg=[];
var chatArray=[];
$scope.chat={};
socket.on('userMessage',function(data) {
  console.log(data.message);
  console.log(data.Sender);
  $scope.CMessage=data.message;
$scope.chat.Message=data.message;
$scope.chat.From=data.Sender;

chatArray.push($scope.chat);
console.log(chatArray);

$scope.chatmsg=chatArray;

console.log($scope.chatmsg);

});

// $scope.showOnline=function(){
// $scope.OnlineUserlist=$scope.Onlinelist;
//
// }







});
