"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { IssueMenuItems } from "@/utils/helper";
import Link from "next/link";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  return (
    <div className="pb-[4rem] laptop:pb-0">
      <h1 className="text-default-500 pb-2 font-bold">Issues</h1>
      <div className="grid grid-cols-12 pt-[2rem] justify-items-center gap-5 pb-[4rem]">
        {IssueMenuItems.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className="col-span-12 md:col-span-6 w-full h-full"
          >
            <div className="card border dark:border-slate-600 rounded-lg shadow-sm hover:dark:border-slate-500 hover:border-slate-300 place-content-center items-center">
              <div className="flex flex-col gap-y-8 justify-center items-center p-10">
                <item.icon size={40} />
                <span className="text-small text-default-400">{item.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
