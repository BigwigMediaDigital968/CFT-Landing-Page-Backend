import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    countryCode: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    profession: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "contacted", "closed"],
    },

    accountStatus: {
      type: String,
      enum: ["In Process", "Demo Shared", "ID Created"],
      default: "In Process",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
