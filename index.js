const mainMenuAsync = require("./helpers/mainMenu");

// get the client
// const mysql = require("mysql2");
// require("dotenv").config();

// create the connection to database
// const db = mysql.createConnection({
//   user: process.env.USER,
//   database: process.env.DB_NAME,
//   password: process.env.PASSWORD,
// });

async function callMainMenu() {
  try {
    await mainMenuAsync().then((main) => {
      console.log(main);
    });
  } catch {
    if (err) {
      console.log(err);
    }
  }
}

callMainMenu();
