import DisplayPostDetail from "@/components/DisplayPostDetail";

const Page = async ({ params }) => {
  return (
    <div className="container pt-[6rem] pb-5">
      <DisplayPostDetail postId={params.postId} campusId={params.campusId} />
    </div>
  );
};

export default Page;
