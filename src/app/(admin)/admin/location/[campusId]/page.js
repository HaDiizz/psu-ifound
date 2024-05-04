"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import LocationTable from "@/components/dashboard/LocationTable";
import BackButton from "@/components/BackButton";

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <div className="pb-[5rem] laptop:pb-4">
      <h1 className="text-default-500 pb-2 font-bold">Location List</h1>
      <BackButton />
      <div className="pt-5">
        <LocationTable campusId={params.campusId} />
      </div>
    </div>
  );
};

export default Page;
