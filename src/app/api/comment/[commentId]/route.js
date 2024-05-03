import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import User from "@/models/user";
import Comment from "@/models/comment";

export const dynamic = "force-dynamic";

export const GET = async (request, context) => {
  const { commentId } = await context.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Permission is denied" },
        { status: 403 }
      );
    }
    await connectDB();
    const comment = await Comment.findById(commentId).populate([
      { path: "user", model: User, select: "picture username fullName email" },
    ]);
    return NextResponse.json(comment);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch comment! " + err);
  }
};
