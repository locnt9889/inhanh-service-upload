/*jshint node:true*/

// app.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//require router
var uploadPicture = require('./routers/uploadPictureRouter');
var picture = require('./routers/pictureRouter');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

//mapping url
app.get('/', function (req, res) {
	res.send("A sample webservice nodejs-mongodb app for Bluemix");
});
app.use('/uploadPicture', uploadPicture);
app.use('/picture', picture);

// Start server
app.set('port', (process.env.PORT || 5001));
app.listen(app.get('port'), function(){
	console.log("Node app is running at localhost:" + app.get('port'));
});
