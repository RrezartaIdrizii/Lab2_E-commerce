import express from "express";
const router = express.Router();
import {
  createFormDetails,
  getFormById,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createFormDetails);
router.route("/:id").get(protect, getFormById);

export default router;
