var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var PaymentSchema = mongoose.Schema({
    patientid:String,
    patient_name:String,
    doctor_name:String,
    date_of_service:String,
    date_of_billing:String,
    visit_id:String,
    type_of_visit:String,
    doctor_fess:String,
    lab_fess:String,
    medicine_cost:String,
    tax:String,
    total:String,
    insurance_company:String,
    insurance_id:String,
    payment_method:String,
    payment_status:String,
    balance_amount:String,



    });

var Payment = mongoose.model('Payment', PaymentSchema, 'Payment_collection');




router.get('/payment', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Payment.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/payment/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Payment.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/payment', function(req, res){
  console.log(req.body);


    var pid = req.body.patientid;
    var did = req.body.patient_name;
      var doc_name = req.body.doctor_name;
    var dos = req.body.date_of_service;
    var do_bill = req.body.date_of_billing;
    var v_id = req.body.visit_id;
    var type_visit = req.body.type_of_visit;
    var doc_fess = req.body.doctor_fess;
    var lab_fess = req.body.lab_fess;
    var medi_cost = req.body.medicine_cost;
    var Tax = req.body.tax;
    var Total = req.body.total;
    var ins_compy = req.body.insurance_company;
    var ins_id = req.body.insurance_id;
    var pay_method = req.body.payment_method;
    var pay_stat = req.body.payment_status;
    var bal_amt = req.body.balance_amount;



   var payment1 = new Payment({
     patientid:pid,
     patient_name:did,
       doctor_name:doc_name,
     date_of_service:dos,
     date_of_billing:do_bill,
     visit_id:v_id,
     type_of_visit:type_visit,
     doctor_fess:doc_fess,
     lab_fess:lab_fess,
     medicine_cost:medi_cost,
     tax:Tax,
     total:Total,
     insurance_company:ins_compy,
     insurance_id:ins_id,
     payment_method:pay_method,
     payment_status:pay_stat,
     balance_amount:bal_amt

  });


  payment1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/payment/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Payment.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/payment/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Payment.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
