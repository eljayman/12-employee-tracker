const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});

class Queries {
  departmentsQuery() {
    db.query(`SELECT * FROM department`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  }
  rolesQuery() {
    db.query(`SELECT * FROM role`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  }
  employeesQuery() {
    db.query(`SELECT * FROM employee`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  }
}

module.exports = new Queries();
