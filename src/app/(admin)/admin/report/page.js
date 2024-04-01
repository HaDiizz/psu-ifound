"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TabDashBoardSection from "@/components/dashboard/TabDashBoardSection";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return <TabDashBoardSection />;
};

export default Page;
