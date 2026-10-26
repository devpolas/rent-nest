"use client";

import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AiMessage } from "@/types/ai.types";

type AiChatMessageProps = {
  message: AiMessage;
  onRetry?: () => void;
};

export function AiChatMessage({ message, onRetry }: AiChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";
  const isError = message.status === "error";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable in restricted browser contexts.
    }
  }

  return (
    <article className={cn("flex gap-2.5 w-full", isUser && "justify-end")}>
      {!isUser && (
        <div className='flex justify-center items-center bg-brand/10 mt-0.5 border border-brand/15 rounded-xl size-8 text-brand shrink-0'>
          <Sparkles className='size-4' />
        </div>
      )}

      <div
        className={cn(
          "group min-w-0",
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-primary-foreground"
            : "flex-1 pt-1",
        )}
      >
        {message.content ? (
          <div
            className={cn(
              "text-sm wrap-break-words leading-7 whitespace-pre-wrap",
              !isUser && "text-foreground",
            )}
          >
            {message.content}
          </div>
        ) : (
          isError && (
            <p className='text-destructive text-sm'>
              This response could not be completed.
            </p>
          )
        )}

        {!isUser && message.content.length > 0 && (
          <div className='flex items-center gap-1 mt-2'>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='rounded-lg size-7 text-muted-foreground'
              onClick={() => void handleCopy()}
              aria-label='Copy response'
              title='Copy response'
            >
              {copied ? (
                <Check className='size-3.5' />
              ) : (
                <Copy className='size-3.5' />
              )}
            </Button>

            {isError && onRetry && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='gap-1.5 rounded-lg h-7 text-muted-foreground'
                onClick={onRetry}
              >
                <RotateCcw className='size-3.5' />
                Retry
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
