import React from "react";
import LoginButtonSection from "@/components/LoginButtonSection";

const Page = () => {
  return (
    <div className="flex justify-center h-screen pt-[5rem] items-center">
      <div className="card bg-card w-[90%] md:w-[40%] h-[75%] md:h-[65%] lg:h-[56%] rounded-lg shadow-lg">
        <div className="text-center pt-[2.5rem] flex flex-col gap-5">
          <span className="text-4xl font-bold text-inherit">PSU iFound</span>
          <span className="text-md tracking-wider">Log in to PSU iFound</span>
        </div>
        <LoginButtonSection />
      </div>
    </div>
  );
};

export default Page;
