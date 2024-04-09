import Location from "@/models/location";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
  const { campusId } = context.params;
  try {
    await connectDB();
    const locations = await Location.find({ campId: campusId }).sort({
      updatedAt: -1,
    });
    return NextResponse.json(locations);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch locations!");
  }
};
