const { mainMenu } = require("mainMenu");
const { addDepartment } = require("addDepartment");
const { addRole } = require("addRole");
const { addEmployee } = require("addEmployee");

module.exports = [mainMenu, addDepartment, addEmployee, addRole];
