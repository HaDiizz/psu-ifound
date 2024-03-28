"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const MenuItem = ({ menu }) => {
  const pathname = usePathname();
  const [placement, setPlacement] = useState("right");

  useEffect(() => {
    const updatePlacement = () => {
      if (window.innerWidth <= 1024) {
        setPlacement("top");
      } else {
        setPlacement("right");
      }
    };
    window.addEventListener("resize", updatePlacement);
    updatePlacement();
    return () => window.removeEventListener("resize", updatePlacement);
  }, []);
  return (
    <Tooltip content={menu.name} placement={placement} offset={15}>
      <Link
        href={menu.url}
        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer group hover:bg-blue-500 relative ${
          pathname === `${menu.url}` && "bg-blue-500 text-white"
        }`}
      >
        <menu.icon
          className={`dark:text-white text-xl group-hover:text-white w-5 h-5`}
        />
      </Link>
    </Tooltip>
  );
};

export default MenuItem;
