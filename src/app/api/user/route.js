import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
export const dynamic = "force-dynamic"
export const GET = async () => {
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
    const [count, users] = await Promise.all([
      User.countDocuments({}),
      User.find(),
    ]);
    return NextResponse.json({ count, users });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
