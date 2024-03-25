"use client";
import AuthProvider from "./AuthProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import { fetcher } from "@/lib/axios";

export default function Providers({ children, session }) {
  return (
    <AuthProvider session={session}>
      <SWRConfig
        value={{ fetcher }}
      >
        <NextUIProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
            storageKey="next-theme"
          >
            {children}
          </ThemeProvider>
        </NextUIProvider>
      </SWRConfig>
    </AuthProvider>
  );
}
