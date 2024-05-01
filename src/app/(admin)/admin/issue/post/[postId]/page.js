"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackButton from "@/components/BackButton";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import IssueDetail from "@/components/dashboard/IssueDetail";

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      <h1 className="text-default-500 pb-2 font-bold">Report Issue List</h1>
      <BackButton />
      <IssueDetail postId={params.postId} />
    </>
  );
};

export default Page;
