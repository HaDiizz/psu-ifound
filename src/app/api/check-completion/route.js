import Post from "@/models/post";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import moment from "moment";
import Report from "@/models/report";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    await connectDB();
    const threeDaysAgo = moment().subtract(3, "days").startOf("day").toDate();
    await Post.updateMany(
      {
        status: "found",
        isPublish: true,
        completedAt: { $lte: threeDaysAgo },
      },
      { $set: { isPublish: false } }
    );
    await Report.updateMany(
      {
        status: "claimed",
        isPublish: true,
        completedAt: { $lte: threeDaysAgo },
      },
      { $set: { isPublish: false } }
    );

    return NextResponse.json({
      message: "Successful",
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed " + err);
  }
};
