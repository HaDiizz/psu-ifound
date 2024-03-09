"use client";
import AuthProvider from "./AuthProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children, session }) {
  return (
    <AuthProvider session={session}>
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
    </AuthProvider>
  );
}
