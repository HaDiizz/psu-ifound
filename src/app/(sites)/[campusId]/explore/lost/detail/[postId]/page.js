import BackButton from "@/components/BackButton";
import InputComment from "@/components/InputComment";
import CommentCard from "@/components/CommentCard";
import DetailSection from "@/components/DetailSection";
import axios from "@/lib/axios";

const Page = async ({ params }) => {
  const { data } = await axios.get(`/post/${params.postId}`)
  return (
    <div className="container pt-[6rem] pb-5">
      <BackButton />
      <DetailSection post={data} />
      <InputComment isReply={false} />
      <div className="grid gap-y-5">
        <div className="card border dark:border-slate-600 p-5 rounded-lg shadow-md">
          <CommentCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
