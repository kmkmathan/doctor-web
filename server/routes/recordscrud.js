var express = require('express');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
// var mongoose = require('mongoose');
var dir = './records/';
 if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
var recordsSchema = mongoose.Schema({

    patientid: String,
    patient_name: String,
    recordfilename: String,
    description: String
});

var recordsadm = mongoose.model('recordsadm', recordsSchema, 'records_collection');


router.get('/records', function(req, res, next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    recordsadm.find({}, function(err, docs) {
        res.json(docs);
        //  console.log(docs);

    });
});

router.get('/records/:id', function(req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    recordsadm.find({ _id: req.params.id }, function(err, docs) {
        res.json(docs);

    });
});

var storage = multer.diskStorage({
    // destination: './client/records/',
    // filename: function (req, file,cb) {
    //   console.log(req.body , file)
    //   cb(null,file.originalname)
    // }
    destination: function(req, file, callback) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date();
        var folder = monthNames[date.getMonth()] + '_' + date.getFullYear();
        req.body['folderName'] = folder;
        var dir = path.join('./records/', folder);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function(req, file, callback) {
        console.log(file)
        callback(null, Date.now() + "." + file.mimetype.split('/')[1]);
    }
})

var upload = multer({ storage: storage })

router.post('/records', upload.single('file'), function(req, res) {
    var getPath = req.file.path.split(path.sep);
    req.file.path = getPath.slice(getPath.indexOf('records')+1).join('/');
    console.log(req.body, req.file, "image");
    var recdfilename = req.file.path;
    var Description = req.body.description;
    var Patientname = req.body.patient_name;
    var patID = req.body.patientid;
    var records = new recordsadm({
        patientid: patID,
        patient_name: Patientname,
        description: Description,
        recordfilename: recdfilename,
    });
   // console.log(req.protocol + '://' + req.get('host') + req.originalUrl)
    records.save(function(error, docs) {
        if (error) throw error;
        console.log("Type Saved Successfully", docs);
        res.json(docs);
    });
})



router.delete('/records/:id', function(req, res) {
    console.log("REACHED Delete FUNCTION ON SERVER");
    recordsadm.remove({ _id: req.params.id }, function(err, docs) {
        res.json(docs);
    });
})

router.put('/records/:id', function(req, res) {
    console.log("REACHED updation ");
    console.log(req.body);
    recordsadm.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
        res.json(data);
    });
})




router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


module.exports = router;