//requiring the depency of the project.
const express  = require('express');
var exphbs     = require('express-handlebars');
const mongoose = require('mongoose');

// initialozes the application.
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

const port = 5000;

app.listen(port, () => {
	console.log(`server started at the port ${port}`);
});