const inquirer = require("inquirer");
const queries = require("./queries");

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
        process.exit();
      } else {
        menuHelper(main);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function menuHelper(choice) {
  if (choice === "View all departments") {
    queries.departmentsQuery();
  }
  // if (choice === "View all roles") {
  //   queries.rolesQuery();
  // }
  // if (choice === "View all employees") {
  //   queries.employeesQuery();
  // }
}

module.exports = { mainMenu };
