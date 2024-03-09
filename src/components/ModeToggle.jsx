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
  const { setTheme } = useTheme();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          color="default"
          variant="light"
          className={`capitalize text-neutral-900 dark:text-white`}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
