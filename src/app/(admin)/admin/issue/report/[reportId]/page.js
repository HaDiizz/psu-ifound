"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import IssueDetail from "@/components/dashboard/IssueDetail";
import BackButtonIssue from "@/components/BackButtonIssue";

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="pb-[6rem] laptop:pb-4">
      <h1 className="text-default-500 pb-2 font-bold">Report Issue List</h1>
      <BackButtonIssue category={"report"} />
      <IssueDetail itemId={params.reportId} category="report" />
    </div>
  );
};

export default Page;
