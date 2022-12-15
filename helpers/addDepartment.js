const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "addedDepartment",
    message: "What is the name of the department to add?",
  },
];

function addDepartment() {
  inquirer
    .prompt(questions)
    .then(({ addedDepartment }) => {
      console.log("Department Name", addedDepartment);
      return addedDepartment;
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { addDepartment };
