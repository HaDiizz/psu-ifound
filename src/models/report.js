import mongoose, { Schema, models } from "mongoose";

const reportSchema = new Schema(
  {
    campId: {
      type: String,
      required: true,
      enum: ["01", "02", "03", "04", "05"],
    },
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    subLocation: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "unclaimed",
      enum: ["claimed", "unclaimed"],
    },
    image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    userList: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const Report = models.report || mongoose.model("report", reportSchema);

export default Report;
