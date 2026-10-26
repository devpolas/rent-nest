"use client";

import type { ReactNode } from "react";

import ThemeProvider from "./../theme/theme-provider";
import QueryProvider from "./query-provider";
import { Toaster } from "../ui/sonner";
import { AiAssistant } from "../ai/ai-assistant";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Toaster />
        {children}
        <AiAssistant />
      </QueryProvider>
    </ThemeProvider>
  );
}
