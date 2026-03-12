import express from "express";
import {
  registerLead,
  getAllLeads,
  updateLeadAccountStatus,
  deleteLead,
} from "../controllers/lead.controller.js";

const router = express.Router();

router.post("/register", registerLead);

router.get("/", getAllLeads);

router.put("/status/:id", updateLeadAccountStatus);

router.delete("/:id", deleteLead);

export default router;
