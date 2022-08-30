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

//connection 
const pool = mysql.createPool({
  connectionLimit : 100,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});
 
pool.getConnection((err, connection) => {
  if (err) throw err; //not connected
  console.log('Connected as ID' + connection.threadId)
});

const routes = require ('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`listening on port ${port}`));