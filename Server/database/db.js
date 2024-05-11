const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "voosh_db",
  port: "3308",
});

// checking db connection
db.connect((error) => {
  if (error) throw error;
  console.log("mysql connected");
});
module.exports = db;
