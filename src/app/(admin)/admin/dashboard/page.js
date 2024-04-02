"use server";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
const DisplayDashBoard = dynamic(
  () => import("@/components/dashboard/DisplayDashBoard"),
  {
    ssr: false,
  }
);

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <div className="pb-5">
      <DisplayDashBoard />
    </div>
  );
};

export default Page;
