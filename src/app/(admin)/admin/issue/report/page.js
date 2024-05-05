"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DisplayModeration from "@/components/dashboard/DisplayModeration";
import { axios } from "@/lib/axios";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }

  const response = await axios.get(`/issue/report`, headers());

  return (
    <>
      <DisplayModeration
        moderationType="report"
        data={response?.data?.items}
        stats={response?.data?.stats}
      />
    </>
  );
};

export default Page;
