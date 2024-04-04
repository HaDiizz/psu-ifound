import DisplayPostDetail from "@/components/DisplayPostDetail";
import connectDB from "@/lib/connectDB";
import Post from "@/models/post";

export async function generateMetadata({ params }) {
  await connectDB();
  let post = await Post.findById(params.postId);
  return {
    title: `${post?.title}`,
    description: `Lost and Found Hub: Discover and announce lost items within all 5 campuses of Price of Songkla University. Connect with owners or finders. Your lost belongings might just find their way back to you. This is description ${post?.title} - ${post?.detail}`,
    openGraph: {
      title: "PSU iFound",
      description: `Lost and Found Hub: Discover and announce lost items within all 5 campuses of Price of Songkla University. Connect with owners or finders. Your lost belongings might just find their way back to you. This is description ${post?.title} - ${post?.detail}`,
      images: [
        {
          url: post.image.url,
          width: 400,
          height: 300,
        },
      ],
    },
    alternates: {
      canonical: `/${params.campusId}/explore/lost/detail/${params.postId}`,
      languages: {
        en: `/en/${params.campusId}/explore/lost/detail/${params.postId}`,
      },
    },
  };
}

const Page = async ({ params }) => {
  return (
    <div className="container pt-[6rem] pb-5">
      <DisplayPostDetail postId={params.postId} campusId={params.campusId} />
    </div>
  );
};

export default Page;
