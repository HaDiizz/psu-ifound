import Post from "@/models/post";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Comment from "@/models/comment";

export const GET = async (request, context) => {
  const { postId } = context.params;
  try {
    await connectDB();
    await Comment.findOne({ postId: postId });
    const post = await Post.findOne({ _id: postId })
      .populate("user", "picture username fullName email")
      .populate({
        path: "comments",
        populate: {
          path: "user tag",
          select: "picture username fullName email",
        },
      });
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
