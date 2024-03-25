import PostTable from "@/components/PostTable";
import { axios } from "@/lib/axios";

const Page = async ({ params }) => {
  const { data } = await axios(`/post/campus/${params.campusId}`, {
    next: { revalidate: 3600 },
  });
  return (
    <div className="container pt-[10rem]">
      <PostTable campusId={params.campusId} posts={data} />
    </div>
  );
};

export default Page;
