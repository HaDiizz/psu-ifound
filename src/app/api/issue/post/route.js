import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Moderation from "@/models/moderation";
import Post from "@/models/post";
import User from "@/models/user";

export const dynamic = "force-dynamic";

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

    const aggregateResult = await Moderation.aggregate([
      {
        $match: {
          category: "POST",
        },
      },
      {
        $group: {
          _id: "$itemId",
          totalReports: { $sum: 1 },
          totalPending: {
            $sum: { $cond: [{ $eq: ["$status", "PENDING"] }, 1, 0] },
          },
          totalInProgress: {
            $sum: { $cond: [{ $eq: ["$status", "IN_PROGRESS"] }, 1, 0] },
          },
          totalRejected: {
            $sum: { $cond: [{ $eq: ["$status", "REJECTED"] }, 1, 0] },
          },
          totalResolved: {
            $sum: { $cond: [{ $eq: ["$status", "RESOLVED"] }, 1, 0] },
          },
        },
      },
    ]);

    const postGrouping = await Promise.all(
      aggregateResult.map(async (item) => {
        const post = await Post.findById(item._id).populate({
          path: "user",
          model: User,
          select: "picture username fullName email",
        });
        if (post) {
          return {
            _id: item._id,
            title: post.title,
            campId: post.campId,
            owner: post.user,
            totalReports: item.totalReports,
            totalPending: item.totalPending,
            totalInProgress: item.totalInProgress,
            totalRejected: item.totalRejected,
            totalResolved: item.totalResolved,
            status: "non-deleted",
          };
        }
        return {
          _id: item._id,
          status: "deleted",
          deleted: true,
          title: "",
          campId: item?.campId,
          owner: {
            picture: "",
            username: "",
            fullName: "",
            email: "",
          },
          totalReports: item.totalReports,
          totalPending: item.totalPending,
          totalInProgress: item.totalInProgress,
          totalRejected: item.totalRejected,
          totalResolved: item.totalResolved,
        };
      })
    );

    postGrouping.sort((a, b) => b.totalReports - a.totalReports);

    const [count, statusCounts] = await Promise.all([
      Moderation.countDocuments({
        category: "POST",
      }),
      Moderation.aggregate([
        {
          $match: {
            category: "POST",
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);
    return NextResponse.json({
      stats: [...statusCounts, { _id: "TOTAL", count }],
      items: postGrouping,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post issues!" + err);
  }
};