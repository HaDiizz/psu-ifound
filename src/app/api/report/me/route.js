import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Report from "@/models/report";
import User from "@/models/user";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const reports = await Report.find({ user: session.user.id }).populate([
      { path: "user", model: User, select: "picture username fullName email" },
      { path: "owner", model: User, select: "picture username fullName email" },
    ]);
    return NextResponse.json(reports);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch history reports! " + err);
  }
};
