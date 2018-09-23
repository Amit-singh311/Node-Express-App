const express = require('express');
const router  = express.Router();
const mongoose       = require('mongoose');

//load the model
require('../models/Idea');
const Idea = mongoose.model('ideas');

//ideas add Route
router.get('/add', (req, res) => {
	res.render("ideas/add");
});

//ideas edit Route
router.get('/edit/:id', (req, res) => {	
	Idea.findOne({
		_id: req.params.id
	})
	.then(idea => {
		res.render("ideas/edit", {
			idea:idea
		});
	});	
});

//processing ideas
router.post('/', (req, res) => {
	new Idea(req.body)
	   .save()
	   .then(ideas => {
		   req.flash('success_msg', 'video idea added');
		   res.redirect('/idea');
	   });

});

//processing the ideas after the edit 
router.put('/:id', (req, res) => {
	Idea.findOne({
		_id : req.params.id
	})
	.then(idea => {
		idea.title    = req.body.title;
		idea.details  = req.body.details;
		idea.save()
		.then(idea => {
			req.flash('success_msg', 'video idea updated');
			res.redirect('/idea');
		});
	});	
});

//delete method 
router.delete('/:id', (req, res) => {
	Idea.remove({
		_id : req.params.id
	})
	.then(() => {
		req.flash('success_msg', 'video idea removed');
		res.redirect('/idea');
	});
});
//displaying all the ideas on the idea page
router.get('/', (req, res) => {
	Idea.find({})
	    .sort({date:'desc'})
	    .then(ideas => {
			res.render('ideas/index', {
				ideas:ideas
			});
		});	
});

module.exports = router;