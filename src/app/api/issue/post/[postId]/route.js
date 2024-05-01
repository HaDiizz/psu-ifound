import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Moderation from "@/models/moderation";

export const GET = async (request, context) => {
  const { postId } = await context.params;
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
    const issues = await Moderation.find({ itemId: postId }).populate({
      path: "reportedBy",
      model: User,
      select: "picture username fullName email",
    });

    return NextResponse.json(issues);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post issue by postId! " + err);
  }
};
