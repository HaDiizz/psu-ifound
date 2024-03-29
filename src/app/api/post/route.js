import Post from "@/models/post";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const param = searchParams.get("limit");
  const hasLimit = typeof param === "number" && param > 0;

  const queryOptions = {
    sort: { createdAt: 1 },
  };

  if (hasLimit) {
    queryOptions.limit = param;
  }
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
    const [count, posts] = await Promise.all([
      Post.countDocuments({}),
      Post.find({}, null, queryOptions).populate(
        "user",
        "picture username fullName email"
      ),
    ]);
    return NextResponse.json({ posts, count });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
