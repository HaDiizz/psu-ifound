import Report from "@/models/report";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
  const { campusId } = await context.params;
  try {
    await connectDB();
    const reports = await Report.find({ campId: campusId }).populate(
      "user",
      "picture username fullName email"
    );
    return NextResponse.json(reports);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch reports!");
  }
};
