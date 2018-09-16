//requiring the depency of the project.
const express = require('express');
var exphbs    = require('express-handlebars');

// initialozes the application.
const app = express();

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//index Route
app.get('/', (req, res) => {
	const title = "welcome";	
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