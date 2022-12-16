const mysql = require("mysql2");
// const { mainMenu } = require("./mainMenu");

require("dotenv").config();

const db = mysql.createConnection({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});

class Queries {
  departmentsQuery() {
    db.promise()
      .query(`SELECT name as Department FROM department`)
      .then(([rows, fields]) => {
        console.table(rows);
      })
      .catch(console.log)
      .then(() => db.end());
  }
  rolesQuery() {
    db.query(
      `SELECT title AS Title, salary AS Salary, department.name AS Department FROM role LEFT JOIN department ON role.department_id = department.id`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
      }
    );
  }
  employeesQuery() {
    db.query(
      `SELECT CONCAT(e.first_name, " ", e.last_name) AS Name, r.title AS Title, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS "Manager Name" FROM employee e LEFT JOIN role r ON e.role_id=r.id   LEFT JOIN department d ON r.department_id = d.id LEFT OUTER JOIN employee m ON e.manager_id = m.id`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
      }
    );
  }
}

module.exports = new Queries();
