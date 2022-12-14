// get the client
const mysql = require("mysql2");
require("dotenv").config();

// create the connection to database
const db = mysql.createConnection({
  user: process.env.USER,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
});
