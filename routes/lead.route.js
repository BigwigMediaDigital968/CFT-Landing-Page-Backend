import express from "express";
import {
  registerLead,
  getAllLeads,
  updateLeadAccountStatus,
  deleteLead,
  updateLeadStatus,
} from "../controllers/lead.controller.js";

const router = express.Router();

router.post("/register", registerLead);

router.get("/", getAllLeads);

router.put("/status/:id", updateLeadAccountStatus);
router.put("/lead-status/:id", updateLeadStatus);

router.delete("/:id", deleteLead);

export default router;
