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

//loading ideas routes
const ideas          = require('./routes/ideas');
const users          = require('./routes/users');

//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
 .then(()=> {
	 console.log("mongodb connected");
 })
 .catch((err) => console.log(err)); 

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




app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;

app.listen(port, () => {
	console.log(`server started at the port ${port}`);
});