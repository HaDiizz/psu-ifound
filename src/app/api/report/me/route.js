import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Report from "@/models/report";

export const GET = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const reports = await Report.find({ user: session.user.id }).populate(
      "user owner",
      "picture username fullName email"
    );
    return NextResponse.json(reports);
  } catch (err) {
    console.log(err);
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
