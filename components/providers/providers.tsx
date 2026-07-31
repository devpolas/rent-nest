"use client";
import { ReactNode } from "react";
import ThemeProvider from "./../theme/theme-provider";
import StoreProvider from "./store-provider";
import QueryProvider from "./query-provider";
import { Toaster } from "../ui/sonner";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Toaster />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}
