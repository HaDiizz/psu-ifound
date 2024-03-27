import Report from "@/models/report";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const GET = async (request) => {
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
    const reports = await Report.find().populate(
      "user userList owner",
      "picture username fullName email"
    );
    return NextResponse.json(reports);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch reports!");
  }
};
