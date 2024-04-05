import HistorySection from "@/components/History";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: `History`,
  alternates: {
    canonical: `/history`,
    languages: {
      en: `/en/history`,
    },
  },
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <div className="container pt-[5rem]">
      <h1 className="text-default-500 pb-2 font-bold">History</h1>
      <HistorySection />
    </div>
  );
};

export default Page;
