import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    studentId: {
      type: String,
    },
    titleName: {
      type: String,
    },
    yearStatus: {
      type: String,
    },
    majorNameThai: {
      type: String,
    },
    deptNameThai: {
      type: String,
    },
    campusNameThai: {
      type: String,
    },
    studyLevelName: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },
    remark: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = models.user || mongoose.model("user", userSchema);

export default User;
