const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "addedRole",
    message: "What is the name of the role to add?",
  },
];

function addRole() {
  inquirer
    .prompt(questions)
    .then(({ addedRole }) => {
      console.log("Role:>>", addedRole);
      return addedRole;
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { addRole };
