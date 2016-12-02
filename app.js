var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://admin:mparat2@ds143707.mlab.com:43707/travel_agent");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

// Use routes as a module (see index.js)
require('./routes/index.js')(app, router);

var port = process.env.PORT || 8000;
console.log("Express server running on " + port);
app.listen(process.env.PORT || port);
