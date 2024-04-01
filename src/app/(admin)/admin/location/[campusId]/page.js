"use server";
import React from "react";
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
    <>
      <BackButton />
      <div className="pt-5">
        <LocationTable campusId={params.campusId} />
      </div>
    </>
  );
};

export default Page;
