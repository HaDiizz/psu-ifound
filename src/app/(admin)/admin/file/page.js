"use server";
import FileCard from "@/components/dashboard/FileCard";

const Page = async () => {
  return (
    <>
      <h1 className="text-default-500 pb-2 font-bold">
        Manage GeoJSON Polygon Files
      </h1>
      <FileCard />
    </>
  );
};

export default Page;
