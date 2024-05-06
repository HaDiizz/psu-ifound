import mongoose, { Schema, models } from "mongoose";

const claimedListSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    report: { type: mongoose.Types.ObjectId, ref: "report" },
  },
  { timestamps: true }
);

const ClaimedList =
  models.claimed_list || mongoose.model("claimed_list", claimedListSchema);

export default ClaimedList;
