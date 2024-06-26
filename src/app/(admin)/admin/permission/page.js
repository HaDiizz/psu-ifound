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
  return (
    <div className="pb-[5rem] laptop:pb-4">
      <h1 className="text-default-500 pb-2 font-bold">User Permission</h1>
      <UserPermissionTable />
    </div>
  );
};

export default Page;
