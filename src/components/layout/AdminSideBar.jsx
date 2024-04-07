"use client";
import { SideBarMenus } from "@/utils/helper";
import MenuItem from "./MenuItem";

const AdminSideBar = () => {
  return (
    <div className="fixed bottom-0 left-0 laptop:top-0 w-full h-auto laptop:h-screen laptop:w-32 flex justify-center laptop:justify-start items-end laptop:items-center pb-8 laptop:pb-0 z-50">
      <div className="px-2 py-1 lg:py-12 rounded-full dark:bg-[#1e2a46] flex flex-row laptop:flex-col items-center gap-[2rem] laptop:gap-12 duration-200 backdrop-blur-md dark:border-none border border-slate-200 shadow-md bg-[#E2E8F0]">
        {SideBarMenus &&
          SideBarMenus.map((menu) => <MenuItem key={menu.id} menu={menu} />)}
      </div>
    </div>
  );
};

export default AdminSideBar;
