import express from "express";
import { getAllApplications, updateApplicationStatus } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";

const adminARoutes = express.Router();

adminARoutes.get("/applications", protect, admin, getAllApplications);
adminARoutes.put("/update-status/:id", protect, admin, updateApplicationStatus);

export default adminARoutes;