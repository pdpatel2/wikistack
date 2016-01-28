
'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
//filter applied to swig library
require('./filters')(swig);
var routes = require('./routes/wiki');

// Incorporates swig into its rendering
// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use swig to do so
app.engine('html', swig.renderFile);
// turn off swig's caching
swig.setDefaults({cache: false});

// Logs information about each incoming request
app.use(morgan('dev'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

// Routes requests
app.use('/wiki', routes)

// Serves up static files from some kind of public folder
app.use(express.static(__dirname + '/public'));

// // Listen to server
app.listen(3000, function(){
	console.log("Listening to server")
})