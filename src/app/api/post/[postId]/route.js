import Post from "@/models/post";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Comment from "@/models/comment";
import User from "@/models/user";

export const GET = async (request, context) => {
  const { postId } = await context.params;
  try {
    await connectDB();
    await Comment.findOne({ postId: postId });
    const post = await Post.findOne({ _id: postId })
      .populate({
        path: "user",
        model: User,
        select: "picture username fullName email",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user tag",
          model: User,
          select: "picture username fullName email",
        },
      });
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post! " + err);
  }
};
