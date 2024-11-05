import { 
  insertFormDetails, 
  getFormDetails,
  getAllForms,
  updateFormDetails,
  deleteContactById
} from "../models/contactModel.js";

export const createFormDetails = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    await insertFormDetails({ name, email, message }); 
    res.status(201).json({ message: "Contact details saved successfully." });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Error saving contact" });
  }
};

export const getFormById = (req, res) => {
  const { id } = req.params; 
  getFormDetails(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving contact", error: err });
    }
    if (!results.length) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(results[0]); 
  });
};

export const getAllFormsController = async (req, res) => {
  try {
    const forms = await getAllForms();
    res.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Error fetching forms' });
  }
};

export const editContact = async (req, res) => {
  const contactId = req.params.id;
  const contactData = req.body;

  try {
    const updatedContact = await updateFormDetails(contactId, contactData);
    res.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const result = await deleteContactById(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};