export default async function sitemap() {
  const baseURL = "https://psu-ifound.vercel.app";

  return [
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
      url: `${baseURL}/login`,
      lastModified: new Date(),
    },
  ];
}
