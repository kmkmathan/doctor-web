var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var BookapptSchema = mongoose.Schema({

     firstName:String,
     patientid:String,
     service:String,
     appointdate:String,
     appointtime:String,
     gender:String,
     reason:String,
        status:String,

    });

var Bookapptment = mongoose.model('Bookapptment', BookapptSchema, 'bookappointment_collection');




router.get('/bookappointment', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Bookapptment.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/bookappointment/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Bookapptment.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/bookappointment', function(req, res){
  console.log(req.body);



    var Firstname = req.body.firstName;
    var Patientid = req.body.patientid;
    var Service = req.body.service;
    var Aptdate = req.body.appointdate;
    var Apttime = req.body.appointtime;
    var Gender = req.body.gender;
      var Reason = req.body.reason;
  var Status = req.body.status;





   var book1 = new Bookapptment({

     firstName:Firstname,
     patientid:Patientid,
     service:Service,
     appointdate:Aptdate,
     appointtime:Apttime,
     gender: Gender,
     reason:Reason,
         status:Status,

  });


  book1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/bookappointment/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Bookapptment.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/bookappointment/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Bookapptment.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
