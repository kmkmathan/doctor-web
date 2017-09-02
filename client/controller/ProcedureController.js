angular.module('tatluApp').controller('ProcedureController', function($scope, $http) {


    $scope.RefreshProcedure = function () {
          $http.get('/prcd/prcd').success(function (response) {
              $scope.procedureList = response;
              $scope.pro="";
          });

      };

     $scope.RefreshProcedure();





     var id;


     $scope.genId=function(){

       var name = $scope.pro.type.substr(0, 4);

       if(name.length==4){

         id=name+ Math.random().toString(10).substr(2,4);

       } else if(name.length==3){

         id=name+"0"+ Math.random().toString(10).substr(2,4);

       } else if(name.length==2){

         id=name+"00"+ Math.random().toString(10).substr(2,4);
       }


       $scope.pro.id=id.toUpperCase();

     };





      $scope.SaveProcedure=function(){


      $http.post('/prcd/prcd', $scope.pro).success(function (response) {
      console.log(response);
      alert("Procedure saved!!!!");
location.reload(true);
      		//	$scope.RefreshProcedure();
      	});
      }


//Update procedure

      $scope.updatepro=false;

      $scope.editProcedure = function(m) {
          $http.get('/prcd/prcd/' + m._id).success(function(response) {
              $scope.pro = response[0];
              $scope.updatepro=true;

          });
      };

      $scope.updateProcedure= function() {
          console.log($scope.pro._id);
          $http.put('/prcd/prcd/' + $scope.pro._id, $scope.pro).success(function(response) {
              console.log(response);
              $scope.updatepro=false;
              $scope.RefreshProcedure();

          })
      }

//REmove procedure
$scope.removeProcedure = function(m) {
    //console.log(id);
    $http.delete('/prcd/prcd/' + m._id).success(function(response) {
        console.log(response);
        $scope.RefreshProcedure();
    });
};





});
