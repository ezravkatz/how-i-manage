const { redirect } = require("express/lib/response");
const mysql2 = require("mysql2");
//const connectionCon = require("../../app");
const app = require('express')();
//const app = require("../../app");
//const router = require("../routes/user");

//connection 
const connectionOne = mysql2.createConnection({
  connectionLimit : 100,
  port: 8080,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

const UserController = app.get('/', (req, res) => {
  res.send(req.params)
});


//connection
const pool = mysql2.createPool({
  connectionLimit: 100,
  port: 8080,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});


//define rows 

const rows = 
pool.getConnection(function(err, res) {
  connection.query ("SELECT * FROM user", function (err, res) {
    if (err) throw (err);
    console.log(results);
    });

//View users
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID" + connection.threadId);
 

  //user connection
  connection.query("SELECT * FROM user", (err, rows) => {
    //when finished, release
    connection.release();

    if (!err) {
      redirect.render = ( ("main", { rows }));
    } else {
      console.log(err);
    }
  });

    console.log("Data from user table: \n", rows);
  });
}


//User search

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID" + connection.threadId);

    let searchTerm = req.body.Search;
  });

  //search configuration
  connection.query(
    "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      //when finished, release
      connection.release();

      if (!err) {
        redirect.render("main", { rows });
      } else {
        console.log(err);
      }

      console.log("Data from user table: \n", rows);
    }
  );
};

exports.form = (req, res) => {
  res.render("add-user");
};

//add user

exports.add = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err; //not connected
      console.log("Connected as ID" + connection.threadId);

      let searchTerm = req.body.Search;
    });

    //user connection
    connection.query(
      "INSERT INTO user first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        //when finished, release
        connection.release();

        if (!err) {
          redirect.render("add-user", { alert: "User successfully added!" });
        } else {
          console.log(err);
        }

        console.log("Data from user table: \n", rows);
      }
    );
  };
};

//edit user

exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID" + connection.threadId);
  });

  //user connection
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      //when finished, release
      connection.release();

      if (!err) {
        redirect.render("main", { rows });
      } else {
        console.log(err);
      }

      console.log("Data from user table: \n", rows);
    }
  );
};

//update user

exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID" + connection.threadId);
  });

  //user connection
  connection.query(
    "UPDATE user SET first_name = ?, last_name = ? email = ?, phone = ?, comment = ? WHERE id = ?>",
    [first_name, last_name, email, phone, comments, req.params.id],
    (err, rows) => {
      //when finished, release
      connection.release();

      if (!err) {
        pool.getConnection((err, connection) => {
          if (err) throw err; //not connected
          console.log("Connected as ID" + connection.threadId);
        });

        //user connection
        connection.query(
          "SELECT * FROM user WHERE id = ?",
          [req.params.id],
          (err, rows) => {
            //when finished, release
            connection.release();

            if (!err) {
              redirect.render("main", {
                rows,
                alert: `${first_name} has been updated.`,
              });
            } else {
              console.log(err);
            }

            console.log("Data from user table: \n", rows);
          }
        );
      } else {
        console.log(err);
      }

      console.log("Data from user table: \n", rows);
    }
  );
};

//delete user

exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("Connected as ID" + connection.threadId);
  });

  //user connection
  connection.query(
    "DELETE * FROM user WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      //when finished, release
      connection.release();

      if (!err) {
        redirect.render("/", { rows });
      } else {
        console.log(err);
      }

      console.log("Data from user table: \n", rows);
    });
  }});

  module.exports = pool;
  module.exports = UserController;
