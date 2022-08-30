const bodyParser = require('body-parser');
const express = require('express');
const express_handlebars = require('express-handlebars')
const mysql = require('mysql')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//parsing middleware
app.use(bodyParser.urlencoded({extended: false }));

// parse app/json
app.use(bodyParser.json());

//static files
app.use(express.static('public)'));

// route
app.get('', (req, res) => {
  res.render('main')
});

app.listen(port, () => console.log(`listening on port ${port}`));