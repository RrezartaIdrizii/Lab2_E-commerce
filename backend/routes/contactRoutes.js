import express from "express";
import { 
  createFormDetails,
  getFormById,
  getAllFormsController,
  editContact,
  deleteContact
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createFormDetails); 
router.route("/:id").get(getFormById);
router.route("/").get(protect, getAllFormsController); 
router.put("/:id", protect, editContact); 
router.delete("/:id", protect, deleteContact); 

export default router;
