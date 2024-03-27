import BackButton from "@/components/BackButton";
import { axios } from "@/lib/axios";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditReport from "@/components/EditReport";

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const response = await axios.get(`/report/${params.reportId}`);
  if (session && response.data?.user._id !== session.user.id) {
    redirect("/");
  }
  return (
    <div className="container pt-[6rem] pb-5">
      <BackButton />
      <EditReport report={response.data} campusId={params.campusId} />
    </div>
  );
};

export default Page;
