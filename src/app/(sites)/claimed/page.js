import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { axios } from "@/lib/axios";
import { headers } from "next/headers";
import ClaimedListTable from "@/components/ClaimedListTable";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const { data } = await axios(`/claimed-list`, headers());

  return (
    <div className="container pt-[5rem]">
      <h1 className="text-default-500 pb-2 font-bold">Your Claimed List</h1>
      <ClaimedListTable claimedList={data || []} />
    </div>
  );
};

export default Page;
