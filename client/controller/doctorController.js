angular.module('tatluApp').controller('doctorController', function($scope,$http,$mdDialog,fileUpload,$location,$cookies,AuthenticationService,$location) {

  var authUser = $cookies.getObject('authUser');

  var Userfname = authUser.currentUser.userInfo.fname;
  var UserID = authUser.currentUser.userInfo.Id;

  $scope.fname = Userfname;
  $scope.Id = UserID;


  $scope.dataSourcedoc1 =  { "chart": { "caption": "Clinical Revenue", "captionFontBold": "0", "captionFontSize": "20", "xAxisName": "Month",
"xAxisNameFontSize": "15", "xAxisNameFontBold": "0",  "yAxisNameFontSize": "15", "yAxisNameFontBold": "0", "paletteColors": "#2ECC71",
"plotFillAlpha": "80", "usePlotGradientColor": "0",  "bgcolor": "#", "bgalpha": "95", "canvasbgalpha": "0",
"basefontcolor": "000002", "showAlternateHGridColor": "0", "divlinealpha": "50", "divlinedashed": "0", "toolTipBgColor": "#000",
"toolTipPadding": "10", "toolTipBorderRadius": "5", "toolTipBorderThickness": "2", "toolTipBgAlpha": "62", "toolTipBorderColor": "#BBB",
   "rotateyaxisname": "1", "canvasbordercolor": "#000000", "canvasborderthickness": ".3", "canvasborderalpha": "100", "showValues": "0",
"plotSpacePercent": "12" }, "data": [{ "label": "Jan", "value": "42" }, { "label": "Feb", "value": "81" },

   { "label": "Jun", "value": "51" }, { "label": "Jul", "value": "60" }, { "label": "Aug", "value": "62" },
    { "label": "Sep", "value": "61" }, { "label": "Oct", "value": "40" }, { "label": "Nov", "value": "90" },
   { "label": "Dec", "value": "73" }]}

 $scope.dataSourcedoc2 =  { "chart": { "caption": "New Membership Patients", "captionFontBold": "0", "captionFontSize": "20", "xAxisName": "Month",
    "xAxisNameFontSize": "15", "xAxisNameFontBold": "0",  "yAxisNameFontSize": "15", "yAxisNameFontBold": "0", "paletteColors": "#DB0A5B",
       "plotFillAlpha": "80", "usePlotGradientColor": "0",  "bgcolor": "#", "bgalpha": "95", "canvasbgalpha": "0",
        "basefontcolor": "000002", "showAlternateHGridColor": "0", "divlinealpha": "50", "divlinedashed": "0", "toolTipBgColor": "#000",
   "toolTipPadding": "10", "toolTipBorderRadius": "5", "toolTipBorderThickness": "2", "toolTipBgAlpha": "62", "toolTipBorderColor": "#BBB",
        "rotateyaxisname": "1", "canvasbordercolor": "#000000", "canvasborderthickness": ".3", "canvasborderalpha": "100", "showValues": "0",
     "plotSpacePercent": "12" }, "data": [{ "label": "Jan", "value": "42" }, { "label": "Feb", "value": "81" },

    { "label": "Jun", "value": "51" }, { "label": "Jul", "value": "60" }, { "label": "Aug", "value": "62" },
     { "label": "Sep", "value": "61" }, { "label": "Oct", "value": "40" }, { "label": "Nov", "value": "90" },
      { "label": "Dec", "value": "73" }]}

      $scope.dataSourcedoc3 =  { "chart": { "caption": "Patient Health Progress", "captionFontBold": "0", "captionFontSize": "20", "xAxisName": "Month",
    "xAxisNameFontSize": "15", "xAxisNameFontBold": "0",  "yAxisNameFontSize": "15", "yAxisNameFontBold": "0", "paletteColors": "#d35400",
    "plotFillAlpha": "80", "usePlotGradientColor": "0",  "bgcolor": "#", "bgalpha": "95", "canvasbgalpha": "0",
    "basefontcolor": "000002", "showAlternateHGridColor": "0", "divlinealpha": "50", "divlinedashed": "0", "toolTipBgColor": "#000",
    "toolTipPadding": "10", "toolTipBorderRadius": "5", "toolTipBorderThickness": "2", "toolTipBgAlpha": "62", "toolTipBorderColor": "#BBB",
       "rotateyaxisname": "1", "canvasbordercolor": "#000000", "canvasborderthickness": ".3", "canvasborderalpha": "100", "showValues": "0",
    "plotSpacePercent": "12" }, "data": [{ "label": "Jan", "value": "42" }, { "label": "Feb", "value": "81" },

       { "label": "Jun", "value": "51" }, { "label": "Jul", "value": "60" }, { "label": "Aug", "value": "62" },
        { "label": "Sep", "value": "61" }, { "label": "Oct", "value": "40" }, { "label": "Nov", "value": "90" },
       { "label": "Dec", "value": "73" }]}




  $scope.datepickerConfig = {
           allowFuture: true,
           dateFormat: 'DD/MM/YYYY'
       };

$scope.visitcategory = ['New Patient', 'Established Patient'];
$scope.sensitivity = ['High','Normal','None'];
$scope.procedurepriority = ['Unassigned','High','Normal'];
   $scope.type = ['Problem', 'Allergy','Medication','Surgery','Dental'];
  $scope.typeproblem = ['Asthma', 'BCC', 'Dermatochalasis', 'Diabetes','Dry eye', 'HTN','Hyperlipidemia', 'IDDM w/ BDR','Keratoconus', 'NIDDM w/ BDR','NS Cataract', 'POAG','SCC', 'Stye','Complete blood count', 'LIPID','KIDNEY FUNCTION', 'liver function','electrolytes', 'pancreatic enzymes',
  'cardiac panel', 'thyroid function','tumor marker', 'vitamins','iron profile', 'urine complete analysis'];
  $scope.typeallergy = ['Codeine', 'iodine','penicillic','sulfa'];
  $scope.typemedication = ['Lipitor', 'metformin','norvasc'];
  $scope.typesurgery = ['ALT OD','ALT OS','appendectomy','blepharoplasty','cholecystectomy','LPI OD','LPI OS','Phaco/IOL OD','Phaco/IOL OS','tonsillectomy'];
  $scope.occurance = ['Unknown', 'First','Early reccurence(<2months)','Last reccurence(2 – 12 months)','Delayed reccurence(>2months)','Chronic/Recurrent','Acute on chronic'];
   $scope.outcome = ['Unassignes', 'Resolved','Improved','Status quo','Worse','Pending followup'];
   $scope.severity = ['Unassigned','Mild','Mild to Moderate','Moderate','Moderate to Severe','Severe','Life Threatening Severity', 'Fatal'];
   $scope.reaction = ['Unassignes','Hives','Nausea','Shortness of Breath'];
   $scope.duration = ['1 Day', '2 Days','3 Days','4 Days','5 Days','6 Days','Week','Month','Year'];

  $scope.providededucation = false;

  $scope.medicationfrequency = ['Morning','Afternoon','Evening','Night'];
   $scope.selected = [1];
   $scope.toggle = function (item, list) {
     var idx = list.indexOf(item);
     if (idx > -1) {
       list.splice(idx, 1);
     }
     else {
       list.push(item);
     }
   };

   $scope.exists = function (item, list) {
     return list.indexOf(item) > -1;
   };

   $scope.isIndeterminate = function() {
     return ($scope.selected.length !== 0 &&
         $scope.selected.length !== $scope.medicationfrequency.length);
   };

   $scope.isChecked = function() {
     return $scope.selected.length === $scope.medicationfrequency.length;
   };

   $scope.toggleAll = function() {
     if ($scope.selected.length === $scope.medicationfrequency.length) {
       $scope.selected = [];
     } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
       $scope.selected = $scope.medicationfrequency.slice(0);
     }
   };

  var refreshbookapt = function () {
        $http.get('/bookappointment/bookappointment').success(function (response) {
            $scope.apptlist = response;


              $scope.bookappointment ={};
        });
    };
    refreshbookapt();

    var refreshvisitsummary = function () {

            $http.get('/doctorhome/doctorhome').success(function (response) {
              $scope.visitlist = response;
    console.log(response);
          });
      };
      refreshvisitsummary();
//   $scope.appointment = function(d){
//     console.log(d);
//     $scope.doctor = d;
//      console.log($scope.doctor);
//       var objid = d._id;
//     var patiid =d.patientid;
//     var patiname =d.firstName;
//     var patiappd =d.appointdate;
//     var patiappt =d.appointtime;
//     var patirea =d.reason;
//     var patista =d.status;
//
//  $scope.doctor._id = objid;
// $scope.doctor.patid =patiid;
// $scope.doctor.patname =patiname;
// $scope.doctor.patappdate =patiappd;
// $scope.doctor.patapptime =patiappt;
// $scope.doctor.patreason =patirea;
// $scope.doctor.patstatus =patista;
// console.log($scope.doctor.patid);
//
// $http.put('/doctorhome/doctorhome/' + objid, $scope.doctor).success(function (response) {
// console.log(response);
// //alert("Registration completed!!!");
//
//       $location.path('/doctorprescription');
//
//
// });
//
// };

           $scope.IsVisible = false;
           $scope.ShowHide = function () {
               //If DIV is visible it will be hidden and vice versa.
               $scope.IsVisible = $scope.IsVisible ? false : true;
           }



$scope.closevisit = function(){
  $location.path('/todayappointment');

};
$scope.appointment = function(d){
  $location.path('/doctorprescription');

};
$scope.addreminder = function(){

    $http.post('/doctorhome/doctorhome', $scope.doctor).success(function (response) {
    console.log(response);
    alert("Registration completed!!!");
           $location.path('/doctorvisitsummery');

    });
};

  $scope.addDescription = function(){
      $location.path('/doctoraddpatienttype');

};

$scope.addPatienttype = function(){

    $http.post('/doctorhome/doctorhome', $scope.doctor).success(function (response) {
    console.log(response);
      $location.path('/doctorprescription');
    //   $scope.docpatlist = response;
    // alert("Registration completed!!!");
    //   $location.path('/doctoradddiagnosis');

    });
};
// $scope.adddiagnosis = function(){
//
//     $http.post('/doctorhome/doctorhome', $scope.doctor).success(function (response) {
//     console.log(response);
//     alert("Registration completed!!!");
//         $location.path('/doctoraddprocedure');
//
//     });
// };
// $scope.addprocedure = function(){
//
//     $scope.doctor.procedureorder=Userfname;
//
//  console.log( $scope.doctor.procedureorder);
//  $http.post('/doctorhome/doctorhome', $scope.doctor).success(function (response) {
//  console.log(response);
//  alert("Registration completed!!!");
//       $location.path('/doctoraddmedication');
//
//  });
// };
// $scope.addmedication = function(){
//
//    $scope.doctor.medicationorder=Userfname;
//
// console.log( $scope.doctor.medicationorder);
// $http.post('/doctorhome/doctorhome', $scope.doctor).success(function (response) {
// console.log(response);
// alert("Registration completed!!!");
//     $location.path('/doctoraddgoal');
//
// });
//
// };
// $scope.addgoal = function(){
//
//     $http.post('/doctorhome/doctorhome', $scope.doctor).success(function (response) {
//     console.log(response);
//     alert("Registration completed!!!");
//             $location.path('/doctoraddreminder');
//
//     });
// };


  var refreshdochme = function () {
        $http.get('/doctorhome/doctorhome').success(function (response) {
            $scope.doclist = response;
              $scope.doctor ="";
        });
    };
    refreshdochme();


    $scope.adddoclist = function(){
    $http.post('/doctorhome/doctorhome', $scope.doctor).success(function (response) {
    console.log(response);
    alert("Registration completed!!!!");
        refreshdochme();
    });
  };


  $scope.refreshpat=function(){
    $http.get('/patient/patient').success(function (response) {

        $scope.patientList = response;
        $scope.patient={};

    });
  }



  $scope.refreshpat();

  $scope.datepickerConfig1 = {
           allowFuture: false,
           dateFormat: 'DD/MM/YYYY'
       };
  $scope.gender = ['Male', 'Female'];

  $scope.resetpatient = function() {
    $scope.patient = {
      patientname: "",
      age: "",
      dob: "",
      gender: "",
      email: "",
      mobile: "",
      profileimage: "",
      userName: "",
      Password: "",
      cPassword: ""

    }



  };
  $scope.resetpatient();


  var id;


  $scope.showid=true;

  $scope.genId=function(){

    var name = $scope.patient.firstName.substr(0, 4);

    if(name.length==4){

      id=name+ Math.random().toString(10).substr(2,4);

    } else if(name.length==3){

      id=name+"0"+ Math.random().toString(10).substr(2,4);

    } else if(name.length==2){

      id=name+"00"+ Math.random().toString(10).substr(2,4);
    }


    $scope.patient.id=id.toUpperCase();

  }

  var authUser = $cookies.getObject('authUser');

  var Userfname = authUser.currentUser.userInfo.fname;
  var UserID = authUser.currentUser.userInfo.Id;

  $scope.fname = Userfname;
  $scope.Id = UserID;

$scope.doctoraddpatient=function(){
      if($scope.patient.Password===$scope.patient.cPassword){

              var file =$scope.myFile;
              var uploadUrl = "/savedata";
              fileUpload.uploadFileToUrl(file, uploadUrl);

              // $scope.patient.docName=Userfname;
              $scope.patient.docid=UserID;
        $scope.patient.profileImage=$scope.myFile.name;
        $scope.patient.membershipType="No-Member";
        $scope.patient.UserType="Patient";

        $http.post('/patient/patient', $scope.patient).success(function (response) {
        console.log(response);

$rootScope.petientDetails=response;

        alert($scope.patient.id+"Registration completed!!!!");
        $location.path('/doctormypatients');
        });

        $http.post('/api/signup', $scope.patient).then(function(response) {
                alert('patient Registration Successful');
            });
            $http.post('/online/online', $scope.patient).then(function(response) {
                });
      }else{

      alert("Your password is not matching...Try again");

      }

}

});
