import React from "react";
import LoginButtonSection from "@/components/LoginButtonSection";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex justify-center h-screen pt-[5rem] items-center">
      <div className="card bg-card w-[90%] md:w-[40%] h-[75%] md:h-[65%] lg:h-[56%] rounded-lg shadow-lg">
        <div className="text-center pt-[2.5rem] flex flex-col justify-center gap-5">
          <div className="flex justify-center">
            <Image
              src="/Logo-new.webp"
              alt="psu iFound logo"
              width={100}
              height={100}
              priority
            />
          </div>
          <span className="text-md tracking-wider">Log in to PSU iFound</span>
        </div>
        <LoginButtonSection />
      </div>
    </div>
  );
};

export default Page;
