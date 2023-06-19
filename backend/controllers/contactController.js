import { insertFormDetails, getFormDetails } from "../models/contactModel.js";

// create BillDetails
export const createFormDetails = (req, res) => {
  const data = req.body;
  insertFormDetails(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// get BillDetails
export const getFormById = (req, res) => {
  getFormDetails(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
