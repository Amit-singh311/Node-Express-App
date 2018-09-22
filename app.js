//requiring the depency of the project.
const express        = require('express');
const exphbs         = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const flash          = require('connect-flash');
const session        = require('express-session');

// initializes the application.
const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
 .then(()=> {
	 console.log("mongodb connected");
 })
 .catch((err) => console.log(err));

 //load the model
 require('./models/Idea');
 const Idea = mongoose.model('ideas');

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//method-overide middleware
app.use(methodOverride('_method'));

//express-session middleware
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,	
  }));

//flash middleware
app.use(flash());

//global variables
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg   = req.flash('error_msg');
	res.locals.error       = req.flash('error');
	next();
});

//index Route
app.get('/', (req, res) => {
	const title = "welcome";
	//passing data to the view by making an object as the second parameter	
	res.render("index",{
		title:title
	});
});

//about Route
app.get('/about', (req, res) => {
	res.render("about");
});

//ideas add Route
app.get('/ideas/add', (req, res) => {
	res.render("ideas/add");
});

//ideas edit Route
app.get('/ideas/edit/:id', (req, res) => {	
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
app.post('/ideas', (req, res) => {
	new Idea(req.body)
	   .save()
	   .then(ideas => {
		   req.flash('success_msg', 'video idea added');
		   res.redirect('/idea');
	   });

});

//processing the ideas after the edit 
app.put('/ideas/:id', (req, res) => {
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
app.delete('/ideas/:id', (req, res) => {
	Idea.remove({
		_id : req.params.id
	})
	.then(() => {
		req.flash('success_msg', 'video idea removed');
		res.redirect('/idea');
	});
});
//displaying all the ideas on the idea page
app.get('/idea', (req, res) => {
	Idea.find({})
	    .sort({date:'desc'})
	    .then(ideas => {
			res.render('ideas/index', {
				ideas:ideas
			});
		});	
});

const port = 5000;

app.listen(port, () => {
	console.log(`server started at the port ${port}`);
});