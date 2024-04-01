import UserPermissionTable from "@/components/dashboard/UserPermissionTable";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getUserData() {
  const res = await fetch("http://localhost:3000/api/user", {
    next: { revalidate: 3600 },
    headers: headers(),
  });

  return res.json();
}

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  const data = await getUserData();
  return (
    <div>
      <UserPermissionTable users={data?.users} />
    </div>
  );
};

export default Page;
