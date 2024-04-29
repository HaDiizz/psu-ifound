import mongoose, { Schema, models } from "mongoose";

const moderationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["REPORT", "POST", "USER", "COMMENT"],
    },
    status: {
      type: String,
      required: true,
      default: "PENDING",
      enum: ["PENDING", "IN_PROGRESS", "RESOLVED", "REJECTED"],
    },
    reportedBy: { type: mongoose.Types.ObjectId, ref: "user" },
    type: {
      type: String,
      required: true,
    },
    itemId: { type: mongoose.Types.ObjectId },
  },
  { timestamps: true }
);

const Moderation =
  models.moderation || mongoose.model("moderation", moderationSchema);

export default Moderation;
