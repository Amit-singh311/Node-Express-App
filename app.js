//requiring the depency of the project.
const express = require('express');
var exphbs    = require('express-handlebars');

// initialozes the application.
const app = express();

//how middleware works
app.use( function(req, res, next) {
	//console.log(Date.now());
	req.name = "Amit singh";
	next();
});
//index Route
app.get('/', (req, res) => {
	console.log(req.name);
	res.send("Index");
});

//about Route
app.get('/about', (req, res) => {
	res.send("Aboutkjs");
});

const port = 5000;

app.listen(port, () => {
	console.log(`server started at the port ${port}`);
});