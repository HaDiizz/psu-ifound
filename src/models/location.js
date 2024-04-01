import mongoose, { Schema, models } from "mongoose";

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    campId: {
      type: String,
      required: true,
      enum: ["01", "02", "03", "04", "05"],
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Location = models.location || mongoose.model("location", locationSchema);

export default Location;
