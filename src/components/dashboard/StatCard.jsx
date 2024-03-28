import React from "react";
import { Siren, SearchCode, UsersRound, UserRoundCog } from "lucide-react";

const StatCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-3">
      <div className="card md:col-span-3 p-10 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="flex justify-center items-center">
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <span className="text-2xl font-bold">12,435</span>
              </div>
              <Siren />
            </div>
            <span className="text-small dark:text-blue-300 text-blue-500">
              Total reports
            </span>
          </div>
        </div>
      </div>
      <div className="card md:col-span-3 p-10 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="flex justify-center items-center">
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <span className="text-2xl font-bold">10,975</span>
              </div>
              <SearchCode />
            </div>
            <span className="text-small dark:text-blue-300 text-blue-500">
              Total posts
            </span>
          </div>
        </div>
      </div>
      <div className="card md:col-span-3 p-10 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="flex justify-center items-center">
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <span className="text-2xl font-bold">5,975</span>
              </div>
              <UsersRound />
            </div>
            <span className="text-small dark:text-blue-300 text-blue-500">
              Total users
            </span>
          </div>
        </div>
      </div>
      <div className="card md:col-span-3 p-10 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="flex justify-center items-center">
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <span className="text-2xl font-bold">13</span>
              </div>
              <UserRoundCog />
            </div>
            <span className="text-small dark:text-blue-300 text-blue-500">
              Total Admins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
