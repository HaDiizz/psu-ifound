import Report from "@/models/report";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let param = Number(searchParams.get("limit"));
  const isValidLimit = typeof param === "number" && param >= 0;

  if (!isValidLimit) {
    param = 0;
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
    const [count, reports] = await Promise.all([
      Report.countDocuments({}),
      Report.find()
        .populate("user userList owner", "picture username fullName email")
        .sort({ createdAt: -1 })
        .limit(param),
    ]);
    return NextResponse.json({ reports, count });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch reports! " + err);
  }
};
