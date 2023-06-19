import mysql from "mysql2";

// create the connection to database

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tech",
});

mysqlConnection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the SQL database.");
});

export default mysqlConnection;
