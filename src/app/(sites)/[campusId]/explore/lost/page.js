import PostTable from "@/components/PostTable";
import { axios } from "@/lib/axios";
import { campusData } from "@/utils/constants";

export async function generateMetadata({ params }) {
  return {
    title:
      campusData
        .find((campus) => campus.campId === params.campusId)
        .campNameEng.split("Prince of Songkla University ")[1] || "-",
    alternates: {
      canonical: `/${params.campusId}/explore/lost`,
      languages: {
        en: `/en/${params.campusId}/explore/lost`,
      },
    },
  };
}

const Page = async ({ params }) => {
  const { data } = await axios(`/post/campus/${params.campusId}`);
  return (
    <div className="container pt-[5.4rem] pb-5">
      <h1 className="text-default-500 pb-2 font-bold">Post List</h1>
      <PostTable campusId={params.campusId} posts={data} />
    </div>
  );
};

export default Page;
