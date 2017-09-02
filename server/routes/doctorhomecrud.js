var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var doctorhomeSchema = mongoose.Schema({

// _id:String,

  patid:String,
patname:String,
patappdate:String,
patapptime:String,
patreason:String,
  patstatus:String,
chiefcomplaintdes:String,
visitcategory:String,
sensitivity:String,
consulationbriefdes:String,
type:String,
typeproblem:String,
typeallergy:String,
typemedication:String,
typesurgery:String,
title:String,
activeissue:String,
coding:String,
begindate: String,
enddate:String,
occurance:String,
severity:String,
reaction:String,
refferedby:String,
outcome:String,
description:String,
complaints:String,
diagnosis:String,
treatment:String,
procedureorder:String,
proceduresendingto:String,
procedureorderdate:String,
procedurepriority: String,
procedure:String,
medicationsendingto:String,
medicationorderdate:String,
medicinename:String,
medicationfrequencymrn:String,
medicationfrequencyaftn:String,
medicationfrequencyeve:String,
medicationfrequencynit:String,
medicationduration:String,
medicationinstruction:String,
medicationsignature:String,
instruction:String,
goal:String,
typeproinstruction:String,
profollouupdate:String,
docvisitfollouupdate:String,
providededucation: String





    });

var dochme = mongoose.model( 'dochme',doctorhomeSchema, 'prescription_collection');


router.get('/doctorhome', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    dochme.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/doctorhome/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     dochme.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/doctorhome', function(req, res){
  console.log(req.body);


// var Id = req.body._id;
  var Patid = req.body.patid;
    var Patname = req.body.patname;
    var Patappdate = req.body.patappdate;
    var Patapptime = req.body.patapptime;
    var Patreason = req.body.patreason;
      var Patstatus = req.body.patstatus;

  var Chiefcomplaintdes = req.body.chiefcomplaintdes;
    var Visitcategory = req.body.visitcategory;
    var Sensitivity = req.body.sensitivity;
    var Consulationbriefdes = req.body.consulationbriefdes;
    var Type = req.body.type;
    var Typeproblem = req.body.typeproblem;
    var Typeallergy = req.body.typeallergy;
    var Typemedication = req.body.typemedication;
    var Typesurgery = req.body.typesurgery;
    var Title = req.body.title;
    var Activeissue = req.body.activeissue;
      var Coding = req.body.coding;
        var Begindate = req.body.begindate;
        var Enddate = req.body.enddate;
        var Occurance = req.body.occurance;
        var Severity = req.body.severity;
        var Reaction = req.body.reaction;
        var Refferedby = req.body.refferedby;
        var Outcome = req.body.outcome;
        var Description = req.body.description;
        var Complaints = req.body.complaints;
        var Diagnosis = req.body.diagnosis;
        var Treatment = req.body.treatment;
          var Procedureorder = req.body.procedureorder;
            var Proceduresendingto = req.body.proceduresendingto;
            var Procedureorderdate = req.body.procedureorderdate;
            var Procedurepriority = req.body.procedurepriority;
            var Procedure = req.body.procedure;
            var Medicationorder = req.body.medicationorder;
            var Medicationsendingto = req.body.medicationsendingto;
            var Medicationorderdate = req.body.medicationorderdate;
            var Medicinename = req.body.medicinename;
            var Medicationfrequencymrn = req.body.medicationfrequencymrn;
            var Medicationfrequencyaftn = req.body.medicationfrequencyaftn;
            var Medicationfrequencyeve = req.body.medicationfrequencyeve;
            var Medicationfrequencynit = req.body.medicationfrequencynit;

            var Medicationduration = req.body.medicationduration;
            var Medicationinstruction = req.body.medicationinstruction;
            var Medicationsignature = req.body.medicationsignature;
            var Goal = req.body.goal;
            var Typeproinstruction = req.body.typeproinstruction;
            var Profollouupdate = req.body.profollouupdate;
            var Docvisitfollouupdate = req.body.docvisitfollouupdate;
            var Providededucation = req.body.providededucation;
            var Instruction = req.body.instruction;




   var doctor1 = new dochme({
// _id:Id,
     patid:Patid,
     patname:Patname,
     patappdate:Patappdate,
     patapptime:Patapptime,
     patreason:Patreason,
     patstatus:Patstatus,


     chiefcomplaintdes:Chiefcomplaintdes,
     visitcategory:Visitcategory,
     sensitivity:Sensitivity,
     consulationbriefdes:Consulationbriefdes,
     type:Type,
     typeproblem:Typeproblem,
     typeallergy:Typeallergy,
     typemedication:Typemedication,
     typesurgery:Typesurgery,
     title:Title,
     activeissue:Activeissue,
     coding:Coding,
     begindate:Begindate,
     enddate:Enddate,
     occurance:Occurance,
     severity:Severity,
     reaction:Reaction,
     refferedby:Refferedby,
     outcome:Outcome,
     description:Description,
     complaints:Complaints,
     diagnosis:Diagnosis,
     treatment:Treatment,
     procedureorder:Procedureorder,
     proceduresendingto:Proceduresendingto,
     procedureorderdate:Procedureorderdate,
     procedurepriority:Procedurepriority,
     procedure:Procedure,
     medicationorder:Medicationorder,
     medicationsendingto:Medicationsendingto,
     medicationorderdate:Medicationorderdate,
     medicinename:Medicinename,
     medicationfrequencymrn:Medicationfrequencymrn,
    medicationfrequencyaftn:Medicationfrequencyaftn,
    medicationfrequencyeve:Medicationfrequencyeve,
    medicationfrequencynit:Medicationfrequencynit,
       medicationduration:Medicationduration,
     medicationinstruction:Medicationinstruction,
     medicationsignature:Medicationsignature,
     instruction:Instruction,
     goal:Goal,
     typeproinstruction:Typeproinstruction,
     profollouupdate:Profollouupdate,
     docvisitfollouupdate:Docvisitfollouupdate,
     providededucation:Providededucation



  });









  doctor1.save(function(error, docs){
    if ( error ) throw error;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/doctorhome/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      dochme.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/doctorhome/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    dochme.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
