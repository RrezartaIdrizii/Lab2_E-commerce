import mysqlConnection from '../config/dbconnect.js';

export const insertFormDetails = async (contactData) => {
  return new Promise((resolve, reject) => {
    const { name, email, message } = contactData;
    const query = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    mysqlConnection.query(query, [name, email, message], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results); 
    });
  });
};


export const getFormDetails = (id, result) => {
  let query = "SELECT * FROM contacts";
  const queryParams = [];

  if (id) {
    query += " WHERE id = ?";
    queryParams.push(id);
  }

  mysqlConnection.query(query, queryParams, (err, results) => {
    if (err) {
      console.log("Error retrieving contacts:", err);
      return result(err, null);
    }
    result(null, results); 
  });
};

export const getAllForms = () => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query('SELECT * FROM contacts', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const updateFormDetails = async (id, contactData) => {
  return new Promise((resolve, reject) => {
    const { name, email, message } = contactData;
    const query = "UPDATE contacts SET name = ?, email = ?, message = ? WHERE id = ?";
    mysqlConnection.query(query, [name, email, message, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.affectedRows === 0) {
        return reject(new Error("No contact found with the provided ID"));
      }
      resolve(results);
    });
  });
};


export const deleteContactById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM contacts WHERE id = ?';
    mysqlConnection.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
