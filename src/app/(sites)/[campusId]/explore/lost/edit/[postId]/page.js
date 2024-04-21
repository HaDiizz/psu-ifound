import BackButton from "@/components/BackButton";
import { axios } from "@/lib/axios";
import EditPost from "@/components/EditPost";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const response = await axios.get(`/post/${params.postId}`, headers());
  if (
    session &&
    session.user.role !== "admin" &&
    response.data?.user._id !== session.user.id
  ) {
    redirect("/");
  }
  return (
    <div className="container pt-[6rem] pb-5">
      <h1 className="text-default-500 pb-2 font-bold">Edit Post</h1>
      <BackButton />
      <EditPost post={response.data} campusId={params.campusId} />
    </div>
  );
};

export default Page;
