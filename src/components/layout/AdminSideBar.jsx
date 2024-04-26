"use client";
import { SideBarMenus } from "@/utils/helper";
import MenuItem from "./MenuItem";
import { FaEllipsisVertical } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FileJson, ShieldAlert } from "lucide-react";
import Link from "next/link";

const AdminSideBar = () => {
  return (
    <div className="fixed bottom-0 left-0 laptop:top-0 w-full h-auto laptop:h-screen laptop:w-32 flex justify-center laptop:justify-start items-end laptop:items-center pb-8 laptop:pb-0 z-50">
      <div className="px-2 py-1 lg:py-12 rounded-full dark:bg-[#1e2a46] flex flex-row laptop:flex-col items-center gap-[2rem] laptop:gap-8 duration-200 backdrop-blur-md dark:border-none border border-slate-200 shadow-md bg-[#E2E8F0]">
        {SideBarMenus &&
          SideBarMenus.map((menu) => <MenuItem key={menu.id} menu={menu} />)}
        <div className="flex laptop:hidden w-10 h-10 rounded-full items-center justify-center cursor-pointer group">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly aria-label="Dropdown settings" variant="light">
                <FaEllipsisVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="manage_file"
                startContent={
                  <FileJson className="text-lg text-default-500 pointer-events-none flex-shrink-0" />
                }
              >
                <Link className="w-full" href={"/admin/file"}>
                  <div>Manage File</div>
                </Link>
              </DropdownItem>
              <DropdownItem
                key="issue"
                startContent={
                  <ShieldAlert className="text-lg text-default-500 pointer-events-none flex-shrink-0" />
                }
              >
                <Link className="w-full" href={"/admin/issue"}>
                  <div>Issue</div>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
