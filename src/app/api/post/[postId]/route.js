import Post from "@/models/post";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (request, context) => {
  const { postId } = context.params;
  try {
    await connectDB();
    const post = await Post.findOne({ _id: postId }).populate(
      "user userList",
      "picture username fullName email"
    );
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export const PUT = async (request, context) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const { postId } = await context.params;
  const { status } = await request.json();
  try {
    await connectDB();
    if (status !== "unclaimed") {
      return NextResponse.json(
        { message: "The item has been claimed." },
        { status: 400 }
      );
    }
    const post = await Post.findById(postId);
    if (post.user.toString() === session.user.id.toString()) {
      return NextResponse.json(
        { message: "You can not claim your own post." },
        { status: 400 }
      );
    }
    if (post.userList.includes(session.user.id)) {
      return NextResponse.json(
        { message: "You have been claimed the item already." },
        { status: 400 }
      );
    }
    post.userList.push(session.user.id);
    await post.save();
    return NextResponse.json({
      message: "You have been claimed the item successful.",
    });
  } catch (err) {
    console.log(err);
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
