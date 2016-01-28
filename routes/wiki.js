'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models/index')
var Promise = require('mpromise')
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
	Page.find({}).exec()
		.then(function(pages){
			res.render('index', {pages: pages})
		})
		.then(null, function(err){
			console.error(err)
		})
});


router.post('/', function(req, res, next) {
	var page = new Page ({
		title: req.body.title,
		content: req.body.content,
		status: req.body.status
	});
 
	page.save()
	.then (
		function onSuccess (page) {
			res.redirect(page.route)
		},
		function onError(err) {
			console.error(err)
		})
});


router.get('/add', function(req, res, next) {
	res.render('addpage')
});


router.get('/:urlTitle', function(req, res) {
	var urlTitle = req.params.urlTitle;
	Page.findOne({urlTitle: urlTitle}).exec()
	.then (
		function onSuccess (page) {
			res.render('wikipage', {page: page})
		},
		function onError(err) {
			console.error(err)
		})
});


module.exports = router;