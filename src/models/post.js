import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
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
    },
    subLocation: {},
    contact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "notfound",
      enum: ["found", "notfound"],
    },
    image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    isPublish: {
      type: Boolean,
      default: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Post = models.post || mongoose.model("post", postSchema);

export default Post;
