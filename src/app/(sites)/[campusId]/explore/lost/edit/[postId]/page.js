import BackButton from "@/components/BackButton";
import axios from "@/lib/axios";
import EditPost from "@/components/EditPost";

const Page = async ({ params }) => {
  const { data } = await axios.get(`/post/${params.postId}`);
  return (
    <div className="container pt-[6rem] pb-5">
      <BackButton />
      <EditPost post={data} campusId={params.campusId} />
    </div>
  );
};

export default Page;
