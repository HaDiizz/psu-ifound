import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const GET = async () => {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    // if (session.user.role !== "admin") {
    //   return NextResponse.json(
    //     { message: "Permission is denied" },
    //     { status: 403 }
    //   );
    // }
    await connectDB();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const result = await User.aggregate([
      {
        $match: {
          createdAt: { $lte: endDate, $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    return NextResponse.json({ result });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
