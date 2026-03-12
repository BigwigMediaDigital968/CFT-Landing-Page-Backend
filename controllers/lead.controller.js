import Lead from "../models/Lead.js";
import { appendLeadToSheet } from "../utils/googleSheet.js";
/* ---------------------------------------------------
   Register Lead
--------------------------------------------------- */

export const registerLead = async (req, res) => {
  try {
    const { fullName, email, phone, countryCode, city, profession, message } =
      req.body;

    if (!fullName || !email || !phone || !countryCode || !city) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const existingLead = await Lead.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingLead) {
      return res.status(400).json({
        message: "Lead already exists with this email or phone",
      });
    }

    const newLead = await Lead.create({
      fullName,
      email,
      phone,
      countryCode,
      city,
      profession,
      message,
    });

    await appendLeadToSheet(lead);

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      lead: newLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ---------------------------------------------------
   Get All Leads (Admin)
--------------------------------------------------- */

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: leads.length,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------------------------------------------
   Update Lead Account Status
--------------------------------------------------- */

export const updateLeadAccountStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountStatus } = req.body;

    const validStatuses = ["In Process", "Demo Shared", "ID Created"];

    if (!validStatuses.includes(accountStatus)) {
      return res.status(400).json({
        message: "Invalid account status",
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { accountStatus },
      { new: true },
    );

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      message: "Account status updated",
      lead: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ---------------------------------------------------
   Delete Lead
--------------------------------------------------- */

export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
