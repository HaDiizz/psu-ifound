"use server";
import React from "react";
import { campusData } from "@/utils/constants";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-4 place-items-center">
        {campusData.map((campus) => (
          <Link
            key={campus.campId}
            className="card col-span-12 p-5 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700 w-full dark:hover:border-blue-300 hover:border-blue-500 hover:border-2"
            href={`/admin/location/${campus.campId}`}
          >
            <div className="flex flex-col gap-y-4">
              <span className="text-large font-bold">{campus.campNameEng}</span>
              <span className="text-small text-default-400">
                {campus.campNameThai}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Page;
