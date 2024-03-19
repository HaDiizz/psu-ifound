import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: { type: mongoose.Types.ObjectId, ref: "user" },
    reply: mongoose.Types.ObjectId,
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    postId: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

const Comment = models.comment || mongoose.model("comment", commentSchema);

export default Comment;
