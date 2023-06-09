// import connection
import mysqlConnection from "../config/dbconnect.js";

// insert Form Details
export const insertFormDetails = (data, result) => {
  mysqlConnection.query("INSERT INTO contacts SET ?", data, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

// get Form Details
export const getFormDetails = (id, result) => {
  mysqlConnection.query("SELECT * FROM contacts", id, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
