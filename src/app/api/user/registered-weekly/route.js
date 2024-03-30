import User from "@/models/user";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const GET = async () => {
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
    const endDate = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    let result = await User.aggregate([
      {
        $addFields: {
          createdAtLocal: {
            $subtract: ["$createdAt", { $multiply: [60 * 60 * 1000, 7] }],
          },
          formattedDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "Asia/Bangkok",
            },
          },
        },
      },
      {
        $match: {
          createdAtLocal: { $lte: endDate, $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: { date: "$createdAtLocal" } },
          date: { $first: "$formattedDate" },
          user: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Sunday" },
                { case: { $eq: ["$_id", 2] }, then: "Monday" },
                { case: { $eq: ["$_id", 3] }, then: "Tuesday" },
                { case: { $eq: ["$_id", 4] }, then: "Wednesday" },
                { case: { $eq: ["$_id", 5] }, then: "Thursday" },
                { case: { $eq: ["$_id", 6] }, then: "Friday" },
                { case: { $eq: ["$_id", 7] }, then: "Saturday" },
              ],
              default: "Unknown",
            },
          },
          date: 1,
          user: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
    const currentDate = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
    const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
    const currentDayData = result.find(
      (item) => item.date === formattedCurrentDate
    );
    if (!currentDayData) {
      const yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);
      const formattedYesterday = yesterday.toISOString().slice(0, 10);
      const previousDayData = result.find(
        (item) => item.date === formattedYesterday
      );

      if (previousDayData) {
        const todayIndex = result.findIndex(
          (item) => item._id === new Date().getDay() + 1
        );

        if (todayIndex !== -1) {
          result[todayIndex].user = previousDayData.user;
        } else {
          result.unshift({
            date: new Date().toISOString().split("T")[0],
            user: previousDayData.user,
            _id: new Date().toLocaleString("en-US", { weekday: "long" }),
          });
        }
      } else {
        const updatedResult = [
          ...result,
          { _id: "Unknown", date: formattedCurrentDate, user: 0 },
        ];
        result = updatedResult;
      }
    }
    result.forEach((item) => {
      item.date = new Date(item.date);
    });

    result.sort((a, b) => a.date - b.date);
    return NextResponse.json({ result });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
