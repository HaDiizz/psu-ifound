"use server";
import dynamic from "next/dynamic";
const DisplayFileDetail = dynamic(
  () => import("@/components/dashboard/DisplayFileDetail"),
  {
    ssr: false,
  }
);
const Page = async ({ params }) => {
  return (
    <>
      <DisplayFileDetail fileId={params.fileId} />
    </>
  );
};

export default Page;
