"use server";
import FileCard from "@/components/dashboard/FileCard";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <>
      <h1 className="text-default-500 pb-2 font-bold">
        Manage GeoJSON Polygon Files
      </h1>
      <FileCard />
    </>
  );
};

export default Page;
