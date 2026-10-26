"use client";

import { ArrowUp, LoaderCircle, Square } from "lucide-react";
import { useRef, type FormEvent, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type AiChatInputProps = {
  isLoading: boolean;
  onSend: (message: string) => void | Promise<void>;
  onStop: () => void;
  disabled?: boolean;
};

export function AiChatInput({
  isLoading,
  onSend,
  onStop,
  disabled = false,
}: AiChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resetHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const textarea = textareaRef.current;
    const message = textarea?.value.trim();

    if (!message || isLoading || disabled) return;

    void onSend(message);

    if (textarea) {
      textarea.value = "";
      resetHeight();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <footer className='pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-background/80 p-3 border-border/70 border-t shrink-0'>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "bg-card/80 p-2 border border-border rounded-2xl",
          "transition-all duration-200",
          "focus-within:border-brand/50 focus-within:ring-2 focus-within:ring-brand/10",
        )}
      >
        <Textarea
          ref={textareaRef}
          rows={1}
          maxLength={4000}
          disabled={disabled || isLoading}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            const textarea = event.currentTarget;
            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
          }}
          placeholder='Ask about your next home...'
          aria-label='Message RentNest AI'
          className={cn(
            "bg-transparent border-0 min-h-10 max-h-36 resize-none",
            "px-2 py-2 text-sm shadow-none",
            "focus-visible:ring-0",
          )}
        />

        <div className='flex justify-between items-center gap-3 px-1 pt-1 pb-0.5'>
          <p className='text-[11px] text-muted-foreground'>
            Enter to send · Shift + Enter for a new line
          </p>

          {isLoading ? (
            <Button
              type='button'
              variant='secondary'
              size='icon'
              className='rounded-xl size-9 shrink-0'
              onClick={onStop}
              aria-label='Stop generating'
              title='Stop generating'
            >
              <Square className='fill-current size-3.5' />
            </Button>
          ) : (
            <Button
              type='submit'
              size='icon'
              className='bg-brand hover:bg-brand/90 rounded-xl size-9 text-brand-foreground shrink-0'
              disabled={disabled}
              aria-label='Send message'
              title='Send message'
            >
              {disabled ? (
                <LoaderCircle className='size-4 animate-spin' />
              ) : (
                <ArrowUp className='size-4' />
              )}
            </Button>
          )}
        </div>
      </form>

      <p className='mt-2 text-[10px] text-muted-foreground text-center leading-4'>
        AI can make mistakes. Verify property details before making decisions.
      </p>
    </footer>
  );
}
