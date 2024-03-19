import React from "react";
import moment from "moment";
import Image from "next/image";
import { Chip } from "@nextui-org/react";

const DetailSection = () => {
  return (
    <>
      <div className="pt-7 pb-5">
        <span className="leading-none text-4xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          veritatis?\
        </span>
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
            src={
              "http://res.cloudinary.com/dklebdons/image/upload/v1710250523/PSU_iFound/rhxmdworq7inacvdftyk.jpg"
            }
            alt="thumbnail"
          />
        </div>
        <div className="md:col-span-7 p-5 bg-slate-200/25 dark:bg-slate-800/50 rounded-xl flex flex-col w-full h-full">
          <div className="flex gap-x-10 pb-5">
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {moment("2024-03-12T13:35:22.425Z").fromNow()}
              </p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {moment("2024-03-12T13:35:22.425Z").format("llll")}
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-bold text-small capitalize">Posted by</span>
              <p className="text-bold text-tiny capitalize text-default-400">
                Nattapol Singhad
              </p>
            </div>
          </div>
          <div className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Detail</span>
              <span className="indent-4 text-sm font-light">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
                nulla voluptatem praesentium ex ipsa unde. Alias voluptatibus
                sapiente soluta aperiam.
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Location</span>
              <span className="indent-4 text-sm font-light">
                หอสมุดคุณหญิงหลง
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Sub Location</span>
              <span className="indent-4 text-sm font-light">
                หอสมุดคุณหญิงหลง ชั้นสาม
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Contact</span>
              <span className="indent-4 text-sm font-light">
                tanapat@gmail.com
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Status</span>
              <span className="text-sm pl-3">
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  color={"danger"}
                  size="sm"
                  variant="flat"
                >
                  Not Found
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
