import Post from "@/models/post";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Report from "@/models/report";
import { campusData } from "@/utils/constants";
export const dynamic = "force-dynamic"
export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const param = searchParams.get("limit");
  const hasLimit = typeof param === "number" && param > 0;

  const queryOptions = {
    sort: { createdAt: 1 },
  };

  if (hasLimit) {
    queryOptions.limit = param;
  }
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
    const countPostByCampId = await Post.aggregate([
      {
        $match: {
          campId: { $exists: true },
        },
      },
      {
        $group: {
          _id: "$campId",
          count: { $sum: 1 },
        },
      },
    ]);

    const countReportByCampId = await Report.aggregate([
      {
        $match: {
          campId: { $exists: true },
        },
      },
      {
        $group: {
          _id: "$campId",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = await campusData.map((campus) => {
      const campId = campus.campId;
      const campNameEng = campus.campNameEng;
      let campusName = campNameEng.split("Prince of Songkla University ")[1];
      campusName = campusName.replace(" Campus", "");
      const reportCount =
        countReportByCampId.find((item) => item._id === campId)?.count || 0;
      const postCount =
        countPostByCampId.find((item) => item._id === campId)?.count || 0;
      return {
        campNameEng: campusName,
        found: reportCount,
        lost: postCount,
      };
    });

    return NextResponse.json({ result });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch countsByCampId!");
  }
};
