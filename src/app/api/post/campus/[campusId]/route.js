import Post from "@/models/post";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
  const { campusId } = await context.params;
  try {
    await connectDB();
    const posts = await Post.find({ campId: campusId }).populate(
      "user",
      "picture username fullName email"
    );
    return NextResponse.json(posts);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
