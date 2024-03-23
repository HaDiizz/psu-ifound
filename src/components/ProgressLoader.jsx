"use client";
import { useEffect } from "react";
import * as NProgress from "nprogress";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const ProgressLoader = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    NProgress.done();
  }, [pathname, router]);
};

export default ProgressLoader;
