"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackButton from "@/components/BackButton";
import DisplayModeration from "@/components/dashboard/DisplayModeration";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <>
      <BackButton />
      <DisplayModeration moderationType="post" />
    </>
  );
};

export default Page;
