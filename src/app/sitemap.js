import connectDB from "@/lib/connectDB";
import Post from "@/models/post";

export default async function sitemap() {
  await connectDB();
  const baseURL = "https://psu-ifound.vercel.app";
  const posts = await Post.find({});

  const postUrls = posts.map((post) => ({
    url: `${baseURL}/${post.campId}/explore/lost/detail/${post._id}`,
    lastModified: post.updatedAt,
  }));

  return [
    {
      url: `${baseURL}/history`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/01/explore/found`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/02/explore/found`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/03/explore/found`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/04/explore/found`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/05/explore/found`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/history`,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
