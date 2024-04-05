import moment from "moment";
import Image from "next/image";
import { Chip } from "@nextui-org/react";

const DetailSection = ({ post }) => {
  return (
    <>
      <div className="pt-7 pb-5">
        <h1 className="leading-none font-bold">{post.title}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 place-items-center">
        <div
          className="md:col-span-5 flex justify-center items-center overflow-hidden rounded-lg"
          style={{ width: "400px", height: "410px" }}
        >
          <Image
            className="object-cover w-full h-full rounded-md"
            width={100}
            height={100}
            src={post.image.url}
            alt="thumbnail"
            priority
            unoptimized
          />
        </div>
        <div className="md:col-span-7 p-5 bg-slate-200/25 dark:bg-slate-800/50 rounded-xl flex flex-col w-full h-full">
          <div className="flex gap-x-10 pb-5">
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {moment(post.createdAt).fromNow()}
              </p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {moment(post.createdAt).format("llll")}
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-bold text-small capitalize">Posted by</span>
              <p className="text-bold text-tiny capitalize text-default-400">
                {post.user.fullName}
              </p>
            </div>
          </div>
          <div className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Detail</span>
              <span className="indent-4 text-sm font-light">{post.detail}</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Location</span>
              <span className="indent-4 text-sm font-light">
                {post.location}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Sub Location</span>
              <span className="indent-4 text-sm font-light">
                {post.subLocation}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Contact</span>
              <span className="indent-4 text-sm font-light">
                {post.contact}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Status</span>
              <span className="text-sm pl-3">
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  color={post.status !== "notfound" ? "success" : "danger"}
                  size="sm"
                  variant="flat"
                >
                  {post.status !== "notfound" ? "Found" : "Not Found"}
                </Chip>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSection;
