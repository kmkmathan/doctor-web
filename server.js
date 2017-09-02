var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');
var http = require('http');

var app = express();

var doctorRoute = require('./server/routes/doctorcrud.js');
var nurseRoute = require('./server/routes/nursecrud.js');
var patientRoute = require('./server/routes/patientcrud.js');
var paymentRoute=require('./server/routes/paymentCrud.js');
var patientdemoRoute = require('./server/routes/patientdemographicscrud.js');
var patientvisitRoute = require('./server/routes/patientvisitcrud.js');
var calRoute=require('./server/routes/callcentercrud.js');
var frontRoute=require('./server/routes/frontdeskcrud.js');
var facilityadmRoute=require('./server/routes/facilityadmincrud.js');
var menuRoute=require('./server/routes/menucrud.js');
var formAccess=require('./server/routes/formAccesscrud.js');
var facilityRoute=require('./server/routes/facilityCrud.js');
var procedureRoute=require('./server/routes/procedureCrud.js');
var visitRoute=require('./server/routes/visitCrud.js');
var globalsRoute=require('./server/routes/globalscrud.js');
var globals2Route=require('./server/routes/globals2crud.js');
var globals3Route=require('./server/routes/globals3crud.js');
var managelayoutRoute=require('./server/routes/managelayoutcurd.js');
var noteRoute=require('./server/routes/notescrud.js');
var mediRoute=require('./server/routes/medicationCrud.js');
var memberRoute=require('./server/routes/membershipCrud.js');
var memberpalnRoute=require('./server/routes/membershipPlan.js');
var rulesRoute=require('./server/routes/rulescrud.js');
var UserRoute=require('./server/routes/userRoute.js');
var OnlineRoute=require('./server/routes/onlinecrud.js');
var doctorhomeRoute=require('./server/routes/doctorhomecrud.js');
var bookappointmentRoute=require('./server/routes/bookappointmentcrud.js');
var recordsRoute=require('./server/routes/recordscrud.js');





var server=require('http').Server(app);
var io=require('socket.io').listen(server);


var storage = multer.diskStorage({
  destination: './client/uploads/',
  filename: function (req, file,cb) {
    cb(null,file.originalname)
  }
})





var upload = multer({ storage: storage })

app.post('/savedata', upload.single('file'), function(req,res,next){
    console.log('Uploade Successful ', req.file, req.body);
console.log('checkingg',req.file.filename);
res.json(req.file)

});



// ************************************** records*******************************************************************


var records = multer.diskStorage({
  destination: './client/records/',
  filename: function (req, file,cb) {
    cb(null,file.originalname)
  }
})


var upload1 = multer({ storage: records })

app.post('/savedata1', upload1.single('file'), function(req,res,next){
    console.log('Uploaded Successful ', req.file, req.body);
console.log('checkingg',req.file.filename);


});







// *****************************************************************************************************************




app.use(bodyParser.json());
app.use('/doctor',doctorRoute);
app.use('/nurse',nurseRoute);
app.use('/patient',patientRoute);
app.use('/payment',paymentRoute);
app.use('/patient_demographics',patientdemoRoute);
app.use('/patientvisit',patientvisitRoute);
app.use('/cal',calRoute);
app.use('/front',frontRoute);
app.use('/facilityadm',facilityadmRoute);
app.use('/menu',menuRoute);
app.use('/formAcc',formAccess);
app.use('/facility',facilityRoute);
app.use('/prcd',procedureRoute);
app.use('/visit',visitRoute);
app.use('/globals',globalsRoute);
app.use('/globals2',globals2Route);
app.use('/globals3',globals3Route);
app.use('/managelayout',managelayoutRoute);
app.use('/note',noteRoute);
app.use('/medi',mediRoute);
app.use('/member',memberRoute);
app.use('/plan',memberpalnRoute);
app.use('/rules',rulesRoute);
app.use('/api', UserRoute);
app.use('/online', OnlineRoute);
app.use('/doctorhome',doctorhomeRoute);
app.use('/bookappointment',bookappointmentRoute);
app.use('/records',recordsRoute);



app.use('/', express.static(path.join(__dirname, './client')));
app.use('/', express.static(path.join(__dirname, './records')));
// app.use('/', express.static(path.join(__dirname, './node_modules')));
// app.use('/', express.static(path.join(__dirname, './public')));

//localhost:
            // mongoose.connect('mongodb://127.0.0.1:27017/tatlu');
//mlabhost:

             mongoose.connect('mongodb://dinesh:dinesh123#@ds147551.mlab.com:47551/tatlu');

mongoose.Promise = require('bluebird');
var db = mongoose.connection;

db.on('open', function() {
    console.log('App is connected to database');
});

db.on('error', function(err) {
    console.log(err);
});

var online=[];
var newUser=[];

// var allClients = [];
// io.sockets.on('connection', function(socket) {
//    allClients.push(socket);
// console.log(allClients);
//    socket.on('disconnect', function() {
//       console.log('Got disconnect!');
//
//       var i = allClients.indexOf(socket);
//       allClients.splice(i, 1);
//    });
// });




io.on('connection',function(socket){

  console.log("socket connected");

  socket.on('currentuser',function(data){

  newUser[socket.id]={
    Name:data.name,
 id:data.id,
 type:data.type,
 socketid:socket.id

  }

  online.push(newUser[socket.id]);


  socket.broadcast.emit('newMessage', {
  message:online
});

});

  socket.on('textMessage',function(data){
  console.log(data.message);
  console.log(data.socketId);

  socket.to(data.socketId).emit('userMessage', {
  message:data.message,
  Sender:data.sender
});

});

socket.on('disconnect', function() {
       console.log('socket '+this.id+' disconnect');

       var i = online.indexOf(this.id);
           online.splice(i, 1);
   });

});




server.listen(8080, function(req, res) {
    console.log('Server is running on port 8080...');
});
