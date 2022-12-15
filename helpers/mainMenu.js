const inquirer = require("inquirer");
const util = require("util");

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
    ],
  },
];

const mainMenuAsync = util.promisify(mainMenu);

function mainMenu() {
  inquirer
    .prompt(questions)
    .then(({ main }) => {
      console.log("main:>>", main);
      return main;
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = mainMenuAsync();
