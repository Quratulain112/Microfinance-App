import express from "express";
import { submitLoanRequest, getMyLoans } from "../controllers/loanController.js";
import { protect } from "../middlewares/authMiddleware.js";

const loanRoutes = express.Router();

loanRoutes.post("/submit", protect, submitLoanRequest);
loanRoutes.get("/my-loans", protect, getMyLoans);

export default loanRoutes;