"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "./ModeToggle";
import { useSession, signOut } from "next-auth/react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import CampusModal from "./CampusModal";

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolling, setIsScrolling] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const handleScroll = () => {
    if (window.scrollY >= window.innerHeight - 700) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <CampusModal isOpen={isOpen} onClose={onClose} />
      <AnimatePresence>
        {isScrolling ? (
          <NavbarScroll
            isScrolling={isScrolling}
            session={session}
            handleOpen={handleOpen}
          />
        ) : (
          <NavbarFixed session={session} handleOpen={handleOpen} />
        )}
      </AnimatePresence>
    </>
  );
}

function NavbarFixed({ session, handleOpen }) {
  return (
    <nav className="fixed z-10 flex justify-between w-full px-8 py-2 top-4">
      <div className="flex items-center gap-2 text-white">
        <Link
          href="/"
          className="font-bold text-inherit text-xl text-neutral-900 dark:text-white"
        >
          PSU
          <span className="text-indigo-500 dark:text-indigo-400 pl-1">
            iFound
          </span>
        </Link>
      </div>
      <ul className="flex items-center dark:text-white text-neutral-900">
        <li className="px-2 text-md ">
          <Link
            className="dark:hover:text-neutral-300 hover:text-neutral-500"
            href={"/"}
            scroll={true}
          >
            Home
          </Link>
        </li>
        <li className="px-2 text-md ">
          <div
            className="dark:hover:text-neutral-300 hover:text-neutral-500 cursor-pointer"
            onClick={handleOpen}
          >
            Explore
          </div>
        </li>
        <li className="px-2 text-md dark:text-white text-neutral-900">
          <ModeToggle />
        </li>
      </ul>
      {session ? (
        <div className="lg:flex">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <Button variant="light">
                <Image
                  className="medium-avatar"
                  referrerPolicy="no-referrer"
                  src={`${session.user.picture}`}
                  width={50}
                  height={50}
                  alt="avatar"
                  priority
                />
                {session.user.username}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold text-slate-500">
                  @{session.user.username}
                </p>
                <p className="font-semibold text-indigo-500">
                  {session.user.email}
                </p>
              </DropdownItem>
              {session.user.role === "admin" && (
                <DropdownItem key="dashboard">
                  <Link className="w-full" href={"/admin/dashboard"}>
                    <div>Dashboard</div>
                  </Link>
                </DropdownItem>
              )}
              <DropdownItem key="history">
                <Link className="w-full" href={"/history"}>
                  <div>History</div>
                </Link>
              </DropdownItem>
              <DropdownItem
                className="text-red-500"
                key="logout"
                color="danger"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <div className="block lg:flex">
          <Button className="bg-indigo-600 scale-100 text-white font-bold transition ease-in-out delay-150 hover:-translate-y-[2px] hover:scale-110 hover:bg-indigo-500 duration-300">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

function NavbarScroll({ isScrolling, session, handleOpen }) {
  return (
    <motion.nav
      key={1}
      initial="initial"
      animate={isScrolling ? "animate" : "initial"}
      exit="exit"
      variants={NavAnimations}
      className="fixed z-10 flex justify-between px-4 py-2 rounded-full nav-bg-blur left-1/2 top-10 bg-slate-200 dark:bg-slate-800"
    >
      <ul className="flex items-center">
        <li className="px-2 text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 text-md">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="px-2 text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 text-md">
          <div className="cursor-pointer" onClick={handleOpen}>
            Explore
          </div>
        </li>
        <li className="px-2 text-white text-md">
          <ModeToggle />
        </li>
        <li className="px-4 py-2 ml-2">
          {session ? (
            <div className="lg:flex">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <Button variant="light">
                    <Image
                      className="medium-avatar"
                      referrerPolicy="no-referrer"
                      src={`${session.user.picture}`}
                      width={50}
                      height={50}
                      alt="avatar"
                      priority
                    />
                    {session.user.username}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold text-slate-500">
                      @{session.user.username}
                    </p>
                    <p className="font-semibold text-indigo-500">
                      {session.user.email}
                    </p>
                  </DropdownItem>
                  <DropdownItem key="history">
                    <Link className="w-full" href={"/history"}>
                      <div>History</div>
                    </Link>
                  </DropdownItem>
                  {session.user.role === "admin" && (
                    <DropdownItem key="dashboard">
                      <Link className="w-full" href={"/admin/dashboard"}>
                        <div>Dashboard</div>
                      </Link>
                    </DropdownItem>
                  )}
                  <DropdownItem
                    className="text-red-500"
                    key="logout"
                    color="danger"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className="block lg:flex">
              <Button className="bg-indigo-600 scale-100 text-white font-bold transition ease-in-out delay-150 hover:-translate-y-[2px] hover:scale-110 hover:bg-indigo-500 duration-300">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          )}
        </li>
      </ul>
    </motion.nav>
  );
}

const NavAnimations = {
  initial: {
    y: -50,
    x: "-50%",
    opacity: 0,
  },
  animate: {
    y: 0,
    x: "-50%",
    opacity: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
  exit: {
    y: -50,
    opacity: 0,
  },
};
