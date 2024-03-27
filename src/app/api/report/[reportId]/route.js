import Report from "@/models/report";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (request, context) => {
  const { reportId } = context.params;
  try {
    await connectDB();
    const report = await Report.findOne({ _id: reportId }).populate(
      "user userList owner",
      "picture username fullName email"
    );
    return NextResponse.json(report);
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
  const { reportId } = await context.params;
  const { status } = await request.json();
  try {
    await connectDB();
    if (status !== "unclaimed") {
      return NextResponse.json(
        { message: "The item has been claimed." },
        { status: 400 }
      );
    }
    const report = await Report.findById(reportId);
    if (report.user.toString() === session.user.id.toString()) {
      return NextResponse.json(
        { message: "You can not claim your own report." },
        { status: 400 }
      );
    }
    if (report.userList.includes(session.user.id)) {
      return NextResponse.json(
        { message: "You have been claimed the item already." },
        { status: 400 }
      );
    }
    report.userList.push(session.user.id);
    await report.save();
    return NextResponse.json({
      message: "You have been claimed the item successful.",
    });
  } catch (err) {
    console.log(err);
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
