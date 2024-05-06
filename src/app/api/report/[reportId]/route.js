import Report from "@/models/report";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/user";
import ClaimedList from "@/models/claimedList";

export const dynamic = "force-dynamic";

export const GET = async (request, context) => {
  const { reportId } = await context.params;
  try {
    await connectDB();
    const report = await Report.findOne({ _id: reportId }).populate([
      { path: "user", model: User, select: "picture username fullName email" },
      {
        path: "userList",
        model: User,
        select: "picture username fullName email",
      },
      { path: "owner", model: User, select: "picture username fullName email" },
    ]);
    return NextResponse.json(report);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch report! " + err);
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
    const user = await User.findById(session.user.id);
    const newClaim = await ClaimedList.create({
      user: user._id,
      report: report._id,
    });

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
    user.claimedList.push(newClaim._id);

    await report.save();
    await user.save();

    return NextResponse.json({
      message: "You have been claimed the item successful.",
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to edit report! " + err);
  }
};
