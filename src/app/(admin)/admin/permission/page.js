"use server";
import UserPermissionTable from "@/components/dashboard/UserPermissionTable";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return <UserPermissionTable />;
};

export default Page;
