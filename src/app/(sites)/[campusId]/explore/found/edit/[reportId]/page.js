import BackButton from "@/components/BackButton";
import { axios } from "@/lib/axios";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditReport from "@/components/EditReport";
import PublishSelection from "@/components/PublishSelection";
import DeleteButton from "@/components/DeleteButton";

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const response = await axios.get(`/report/${params.reportId}`);
  if (
    session &&
    session.user.role !== "admin" &&
    response.data?.user._id !== session.user.id
  ) {
    redirect("/");
  }

  if (!response.data) {
    redirect("/");
  }
  return (
    <div className="container pt-[6rem] pb-5">
      <h1 className="text-default-500 pb-2 font-bold">Edit Report</h1>
      <div className="flex justify-between">
        <BackButton />
        <div className="flex gap-x-3">
          {session?.user.role === "admin" && (
            <DeleteButton
              itemId={response?.data?._id}
              itemTitle={response?.data?.title}
              issueType="report"
            />
          )}
          <PublishSelection
            itemId={response?.data?._id}
            isPublish={response?.data?.isPublish}
            tableType={"found"}
          />
        </div>
      </div>
      <EditReport report={response.data} campusId={params.campusId} />
    </div>
  );
};

export default Page;
