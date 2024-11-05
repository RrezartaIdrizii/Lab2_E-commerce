import express from "express";
const router = express.Router();
import {
  createFormDetails,
  getFormById,
  getAllFormsController,
  editContact,
  deleteContact
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createFormDetails);
router.route("/:id").get(protect, getFormById);
router.route("/").get(getAllFormsController); 
router.put('/:id', editContact); 
router.delete('/:id', deleteContact);

export default router;
