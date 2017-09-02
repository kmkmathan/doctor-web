var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var onlineSchema = mongoose.Schema({
    firstName:String,
    id:String,
    socketid:String,
    UserType:String,
    status:String


    });

var Online = mongoose.model('Online', onlineSchema, 'online_collection');




router.get('/online', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Online.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/online/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Online.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/online', function(req, res){
  console.log(req.body);


  var name = req.body.firstName;
    var Id = req.body.id;
    var user = req.body.UserType;
    var socket = req.body.socketid;
    var status = req.body.status;


   var online1 = new Online({
     firstName:name,
     id:Id,
     UserType:user,
     socketid:socket,
     status:status


  });


  online1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/online/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Online.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/online/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Online.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
