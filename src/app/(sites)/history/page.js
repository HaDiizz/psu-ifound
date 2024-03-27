import React from "react";
import HistorySection from "@/components/History";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <div className="container pt-[10rem]">
      <HistorySection />
    </div>
  );
};

export default Page;
