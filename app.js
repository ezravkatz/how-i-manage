const bodyParser = require('body-parser');
const express = require('express');
const express_handlebars = require('express-handlebars');
const ConnectionConfig = require('mysql/lib/ConnectionConfig');
const mysql2 = require('mysql2')
//const pool = require('./server/controllers/userController');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

//parsing middleware
app.use(bodyParser.urlencoded({extended: false }));

// parse app/json
app.use(bodyParser.json());

//static files
app.use(express.static('public)'));

//connection 
const connectionOne = mysql2.createConnection({
  connectionLimit : 100,
  port: 3001,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});
 
connectionOne.connect((err, connection) => {
  if (err) throw err; //not connected
  console.log('Connected as ID' + connectionOne.threadId)
});

// const routes = require ('./server/routes/user');
// app.use('/', routes);

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = connectionOne;
module.exports = app;