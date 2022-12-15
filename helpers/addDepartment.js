const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "firstName",
    message: "What is the first name of the new employee?",
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
