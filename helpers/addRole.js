const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the name of the role to add?",
  },
  {
    type: "number",
    name: "salary",
    message: "What is the salary for the new role?",
  },
  {
    type: "input",
    name: "department",
    message: "What department does the new role belong to?",
  },
];

function addRole() {
  inquirer
    .prompt(questions)
    .then(({ title, salary, department }) => {
      console.log(
        "title:>>",
        title,
        "salary:>>",
        salary,
        "Department:>>",
        department
      );
      return [title, salary, department];
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { addRole };
