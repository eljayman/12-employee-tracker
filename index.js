const mysql = require("mysql2");
require("dotenv").config();

const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "main",
    message: "Select an option.",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee's role",
      "Quit",
    ],
  },
];

function mainMenu() {
  inquirer
    .prompt(questions)
    .then(({ main }) => {
      if (main === "Quit") {
        console.log("Goodbye");
        process.exit();
      } else {
        return menuHelper(main);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const db = mysql.createConnection({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});

function departmentsQuery() {
  db.promise()
    .query(`SELECT name as Department FROM department`)
    .then(([rows, fields]) => {
      console.table(rows);
      mainMenu();
    })
    .catch(console.log);
}
function rolesQuery() {
  db.promise()
    .query(
      `SELECT title AS Title, salary AS Salary, department.name AS Department FROM role LEFT JOIN department ON role.department_id = department.id`
    )

    .then(([rows, fields]) => {
      console.table(rows);
      mainMenu();
    })
    .catch(console.log);
}
function employeesQuery() {
  db.promise()
    .query(
      `SELECT CONCAT(e.first_name, " ", e.last_name) AS Name, r.title AS Title, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS "Manager Name" FROM employee e LEFT JOIN role r ON e.role_id=r.id   LEFT JOIN department d ON r.department_id = d.id LEFT OUTER JOIN employee m ON e.manager_id = m.id`
    )
    .then(([rows, fields]) => {
      console.table(rows);
      mainMenu();
    })
    .catch(console.log);
}
function departmentAdder(addedDepartment) {
  db.promise()
    .query(`INSERT INTO department (name) VALUES (?)`, addedDepartment)
    .then(([rows, fields]) => {
      console.log("Added:", addedDepartment);
      mainMenu();
    })
    .catch(console.log);
}
function roleAdder(addedRole, salary, department_id) {
  db.promise()
    .query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [
      addedRole,
      salary,
      department_id,
    ])
    .then(([rows, fields]) => {
      console.log("Added:", addedRole);
      mainMenu();
    })
    .catch(console.log);
}
function employeeAdder(addedFirstName, addedLastName, role_id, manager_id) {
  db.promise()
    .query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
      [addedFirstName, addedLastName, role_id, manager_id]
    )
    .then(([rows, fields]) => {
      console.log("Added:", addedFirstName, addedLastName);
      mainMenu();
    })
    .catch(console.log);
}

const newDepartment = [
  {
    type: "input",
    name: "addedDepartment",
    message: "What is the name of the new department?",
  },
];
function addDepartment() {
  inquirer
    .prompt(newDepartment)
    .then(({ addedDepartment }) => {
      return departmentAdder(addedDepartment);
    })
    .catch((error) => {
      console.log(error);
    });
}

const newRole = [
  {
    type: "input",
    name: "addedRole",
    message: "What is the name of the new role?",
  },
  {
    type: "number",
    name: "salary",
    message: "How much is the salary for the new role?",
  },
  {
    type: "number",
    name: "department_id",
    message: "What is the ID for the department this role belongs to?",
  },
];

function addRole() {
  inquirer
    .prompt(newRole)
    .then(({ addedRole, salary, department_id }) => {
      return roleAdder(addedRole, salary, department_id);
    })
    .catch((error) => {
      console.log(error);
    });
}
const newEmployee = [
  {
    type: "input",
    name: "addedFirstName",
    message: "What is the first name of the new employee?",
  },
  {
    type: "input",
    name: "addedLastName",
    message: "What is the last name of the new employee?",
  },
  {
    type: "number",
    name: "role_id",
    message: "What is the role_id for the new employee?",
  },
  {
    type: "number",
    name: "manager_id",
    message: "What is the manager's ID for the new employee?",
  },
];
function addEmployee() {
  inquirer
    .prompt(newEmployee)
    .then(({ addedFirstName, addedLastName, role_id, manager_id }) => {
      return employeeAdder(addedFirstName, addedLastName, role_id, manager_id);
    })
    .catch((error) => {
      console.log(error);
    });
}

function employeeUpdate(employeeSelect) {
  console.log(employeeSelect);
}
function updateEmployee() {
  db.promise()
    .query(
      `SELECT CONCAT(first_name, " ", last_name) AS employee from employee`
    )
    .then(([rows, fields]) => {
      console.log([rows]);
      const employeeNames = [...[rows]];
      console.log(employeeNames);
      //   const employeeSelections = [
      //     {
      //       type: "list",
      //       name: "employeeSelect",
      //       message: "Which would you like to update?",
      //       choices: ["name", `${employeeNames[i]}`],
      //     },
      //   ];

      //   inquirer
      //     .prompt(employeeSelections)
      //     .then(({ employeeSelect }) => {
      //       return employeeUpdate(employeeSelect);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
    });
}

function menuHelper(choice) {
  if (choice === "View all departments") {
    departmentsQuery();
  }

  if (choice === "View all roles") {
    rolesQuery();
  }
  if (choice === "View all employees") {
    employeesQuery();
  }
  if (choice === "Add a department") {
    addDepartment();
  }
  if (choice === "Add a role") {
    addRole();
  }
  if (choice === "Add an employee") {
    addEmployee();
  }
  if (choice === "Update an employee's role") {
    updateEmployee();
  }
}

mainMenu();
