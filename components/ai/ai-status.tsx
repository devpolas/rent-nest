"use client";

import { LoaderCircle, Sparkles } from "lucide-react";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { AiChatStatus } from "@/types/ai.types";

type AiStatusProps = {
  status: AiChatStatus;
};

export function AiStatus({ status }: AiStatusProps) {
  if (status === "idle") return null;

  return (
    <Marker role='status' className='ml-10'>
      <MarkerIcon>
        {status === "thinking" ? (
          <LoaderCircle className='size-4 text-brand animate-spin' />
        ) : (
          <Sparkles className='size-4 text-brand animate-pulse' />
        )}
      </MarkerIcon>

      <MarkerContent className='text-muted-foreground text-sm'>
        {status === "thinking" ? "Thinking..." : "Generating response..."}
      </MarkerContent>
    </Marker>
  );
}
