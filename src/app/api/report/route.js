import Report from "@/models/report";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB();
    const reports = await Report.find().populate(
      "user",
      "picture username fullName email"
    );
    return NextResponse.json(reports);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch reports!");
  }
};
