"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="default"
          variant="light"
          className={`capitalize text-neutral-900 dark:text-white`}
        >
          {theme === "dark" ? (
            <div className="flex gap-x-3 items-center">
              <Moon />
              <span className="hidden md:block">Dark</span>
            </div>
          ) : (
            <div className="flex gap-x-3 items-center">
              <Sun />
              <span className="hidden md:block">Light</span>
            </div>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown Variants" variant="faded">
        <DropdownItem key="light" onClick={() => setTheme("light")}>
          Light
        </DropdownItem>
        <DropdownItem key="dark" onClick={() => setTheme("dark")}>
          Dark
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
