"use server";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const DisplayFileDetail = dynamic(
  () => import("@/components/dashboard/DisplayFileDetail"),
  {
    ssr: false,
  }
);
const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <div className="pb-[5rem] laptop:pb-7">
      <DisplayFileDetail fileId={params.fileId} />
    </div>
  );
};

export default Page;
