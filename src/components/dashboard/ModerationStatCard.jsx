"use client";
import { MdPendingActions, MdOutlineTimelapse } from "react-icons/md";
import { LuFileCheck, LuFileX } from "react-icons/lu";
import { TbReportSearch } from "react-icons/tb";
import { capitalize } from "@/utils/capitalize";

const ModerationStatCard = ({
  moderationType,
  totalItem,
  totalPending,
  totalInProgress,
  totalResolved,
  totalRejected,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 laptop:grid-cols-5 sm:px-8 pt-5">
      <div className="flex items-center rounded-md overflow-hidden border border-gray-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="p-6 text-white bg-indigo-400">
          <TbReportSearch size={30} />
        </div>
        <div className="px-4 flex flex-col">
          <span className="text-small dark:text-blue-300 text-blue-500">
            Total {capitalize(moderationType)}
          </span>
          <span className="text-2xl font-bold">{totalItem || "0"}</span>
        </div>
      </div>
      <div className="flex items-center rounded-md overflow-hidden border border-gray-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="p-6 text-white bg-yellow-400">
          <MdPendingActions size={30} />
        </div>
        <div className="px-4 flex flex-col">
          <span className="text-small dark:text-blue-300 text-blue-500">
            Pending
          </span>
          <span className="text-2xl font-bold">{totalPending || "0"}</span>
        </div>
      </div>
      <div className="flex items-center rounded-md overflow-hidden border border-gray-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="p-6 text-white bg-purple-400">
          <MdOutlineTimelapse size={30} />
        </div>
        <div className="px-4 flex flex-col">
          <span className="text-small dark:text-blue-300 text-blue-500">
            In Progress
          </span>
          <span className="text-2xl font-bold">{totalInProgress || "0"}</span>
        </div>
      </div>
      <div className="flex items-center rounded-md overflow-hidden border border-gray-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="p-6 text-white bg-green-400">
          <LuFileCheck size={30} />
        </div>
        <div className="px-4 flex flex-col">
          <span className="text-small dark:text-blue-300 text-blue-500">
            Resolved
          </span>
          <span className="text-2xl font-bold">{totalResolved || "0"}</span>
        </div>
      </div>
      <div className="flex items-center rounded-md overflow-hidden border border-gray-200 shadow-md dark:bg-slate-800 dark:border-slate-700">
        <div className="p-6 text-white bg-red-400">
          <LuFileX size={30} />
        </div>
        <div className="px-4 flex flex-col">
          <span className="text-small dark:text-blue-300 text-blue-500">
            Rejected
          </span>
          <span className="text-2xl font-bold">{totalRejected || "0"}</span>
        </div>
      </div>
    </div>
  );
};

export default ModerationStatCard;
