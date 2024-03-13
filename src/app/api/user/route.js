import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB();
    const users = await User.find().select("-accessToken");
    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
