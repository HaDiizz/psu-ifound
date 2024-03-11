import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
  {
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
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    userList: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const Post = models.post || mongoose.model("post", postSchema);

export default Post;
