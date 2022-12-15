const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "firstName",
    message: "What is the first name of the employee to add?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the last name of the new employee?",
  },
  {
    type: "input",
    name: "role",
    message: "What is the new employee's role ID?",
  },
  {
    type: "number",
    name: "manager",
    message: "What is the new employee's manager's ID?",
  },
];

function addEmployee() {
  inquirer
    .prompt(questions)
    .then(({ firstName, lastName, role, manager }) => {
      console.log(firstName, lastName, role, manager);
      return [firstName, lastName, role, manager];
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { addEmployee };
