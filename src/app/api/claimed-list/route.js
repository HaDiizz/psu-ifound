import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import ClaimedList from "@/models/claimedList";
import Report from "@/models/report";
import User from "@/models/user";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const user = await User.findById(session.user.id);
    const claimedList = await ClaimedList.find({
      _id: { $in: user.claimedList },
      user: session.user.id,
    }).populate({
      path: "report",
      model: Report,
      populate: {
        path: "user",
        model: User,
      },
    });
    return NextResponse.json(claimedList);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch claimedList! " + err);
  }
};
