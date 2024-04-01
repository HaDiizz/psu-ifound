"use server";
import UserPermissionTable from "@/components/dashboard/UserPermissionTable";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getUserData() {
  const cookieStore = await cookies();
  let sessionTokenCookie = await cookieStore.get("next-auth.session-token");
  let sessionToken = await sessionTokenCookie.value;
  const res = await fetch(
    "https://psu-ifound.vercel.app/api/user" ||
      "http://localhost:3000/api/user",
    {
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
        Cookie: `next-auth.session-token=${sessionToken};path=/;expires=Session`,
      },
    }
  );

  return res.json();
}

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  const data = await getUserData();
  return (
    <Suspense fallback={null}>
      <UserPermissionTable users={data?.users} />
    </Suspense>
  );
};

export default Page;
