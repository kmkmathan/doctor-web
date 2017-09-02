var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var PatientSchema = mongoose.Schema({
        id:String,
        docid:String,
      membershipid:String,
      membershipType:String,
     firstName:String,
     lastName:String,
     age:String,
     userName:String,
     profileImage:String,
     email:String,
     dob:String,
     gender:String,
     mobile:String,
     description:String,
     coverPic:String,

  address:String


    });

var Patient = mongoose.model('Patient', PatientSchema, 'Patient_collection');




router.get('/patient', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Patient.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/patient/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Patient.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/patient', function(req, res){
  console.log(req.body);


  var Id = req.body.id;
  var Docid = req.body.docid;
    var Patientname = req.body.firstName;
    var lastnme = req.body.lastName;

    var mtype = req.body.membershipType;
    var mid = req.body.membershipid;
    var cover = req.body.coverPic;
    var Age = req.body.age;
    var Username = req.body.userName;
    var Image = req.body.profileImage;
    var Email = req.body.email;
    var Dob = req.body.dob;
      var Gender = req.body.gender;
      var Mobile = req.body.mobile;
      var des = req.body.description;
      var Address = req.body.address;



   var patient1 = new Patient({
     id:Id,
     docid:Docid,
     membershipType:mtype,
     membershipid:mid,
     firstName:Patientname,
     lastName:lastnme,

     age:Age,
     userName:Username,
     profileImage:Image,
     email:Email,
     dob: Dob,
     gender:Gender,
     mobile:Mobile,
     description:des,
     address:Address


  });


  patient1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/patient/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Patient.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/patient/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Patient.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
