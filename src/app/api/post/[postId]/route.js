import Post from "@/models/post";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Comment from "@/models/comment";
import User from "@/models/user";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const GET = async (request, context) => {
  const { postId } = await context.params;
  try {
    const session = await getServerSession(authOptions);
    await connectDB();
    let post;
    await Comment.findOne({ postId: postId });
    if (session && session.user.role === "admin") {
      post = await Post.findOne({ _id: postId })
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
    } else {
      post = await Post.findOne({ _id: postId, isPublish: true })
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
    }
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post! " + err);
  }
};
