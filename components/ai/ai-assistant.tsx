"use client";

import {
  ArrowUpRight,
  BookOpen,
  House,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAiChat } from "@/hooks/use-ai-chat";

import { AiChatInput } from "./ai-chat-input";
import { AiChatMessage } from "./ai-chat-message";
import { AiStatus } from "./ai-status";

const suggestions = [
  {
    icon: Search,
    title: "Find a rental",
    description: "Explore homes that fit your needs",
    prompt: "Help me find a rental property on RentNest.",
  },
  {
    icon: Wallet,
    title: "Plan my budget",
    description: "Work out an affordable rent",
    prompt: "Help me decide on a realistic rental budget.",
  },
  {
    icon: House,
    title: "Find a family home",
    description: "Discover what to look for",
    prompt: "What should I look for when choosing a family rental?",
  },
  {
    icon: BookOpen,
    title: "Rental guidance",
    description: "Understand the renting process",
    prompt: "Explain how renting works on RentNest.",
  },
];

type AiAssistantProps = {
  className?: string;
};

export function AiAssistant({ className }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    status,
    error,
    isLoading,
    sendMessage,
    stopGeneration,
    retryLastMessage,
    clearMessages,
  } = useAiChat();

  useEffect(() => {
    if (!isOpen) return;

    const element = scrollRef.current;
    if (!element) return;

    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, [isOpen, messages, status]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function startNewChat() {
    clearMessages();
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  return (
    <>
      {isOpen && (
        <section
          role='dialog'
          aria-modal='true'
          aria-label='RentNest AI assistant'
          className={cn(
            "z-50 fixed inset-0 flex flex-col overflow-hidden",
            "bg-background text-foreground",
            "border border-border/70 shadow-2xl",
            "supports-backdrop-filter:backdrop-blur-2xl",
            "animate-in fade-in slide-in-from-bottom-2 duration-200",
            "motion-reduce:animate-none",
            "sm:inset-auto sm:right-6 sm:bottom-24",
            "sm:h-[min(720px,calc(100dvh-8rem))]",
            "sm:w-[min(440px,calc(100vw-3rem))]",
            "sm:rounded-3xl sm:bg-background/95",
            className,
          )}
        >
          {/* Header */}
          <header className='isolate relative flex items-center gap-3 bg-card/80 px-4 py-3.5 border-border/70 border-b shrink-0'>
            <div
              aria-hidden='true'
              className='-z-10 absolute inset-0 bg-linear-to-r from-brand/10 via-transparent to-transparent pointer-events-none'
            />

            <div className='relative flex justify-center items-center bg-brand shadow-brand/20 shadow-lg rounded-2xl size-11 text-brand-foreground shrink-0'>
              <Sparkles className='size-5' />

              <span className='-right-1 -bottom-1 absolute flex justify-center items-center bg-brand-success border-2 border-background rounded-full size-4'>
                <span className='bg-white rounded-full size-1.5' />
              </span>
            </div>

            <div className='flex-1 min-w-0'>
              <h2 className='font-semibold tracking-tight'>RentNest AI</h2>

              <p className='mt-0.5 text-muted-foreground text-xs truncate'>
                Your personal rental guide
              </p>
            </div>

            <div className='flex items-center gap-1 shrink-0'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='rounded-xl size-9 text-muted-foreground hover:text-foreground'
                onClick={startNewChat}
                aria-label='Start a new conversation'
                title='New chat'
              >
                <Plus className='size-4' />
              </Button>

              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='rounded-xl size-9 text-muted-foreground hover:text-foreground'
                onClick={() => setIsOpen(false)}
                aria-label='Close assistant'
                title='Close assistant'
              >
                <X className='size-4' />
              </Button>
            </div>
          </header>

          {/* Conversation */}
          <div
            ref={scrollRef}
            aria-live='polite'
            aria-relevant='additions text'
            className={cn(
              "flex-1 min-h-0 overflow-y-auto overscroll-contain",
              "scrollbar-thin",
              "pb-4",
            )}
          >
            {messages.length === 0 ? (
              <div className='flex flex-col justify-center px-5 sm:px-6 py-8 min-h-full'>
                <div className='mx-auto w-full max-w-sm'>
                  {/* Welcome icon */}
                  <div className='relative flex justify-center items-center bg-brand/10 mx-auto mb-6 border border-brand/20 rounded-3xl size-[72px]'>
                    <div className='absolute inset-2 bg-brand/10 blur-lg rounded-2xl' />
                    <Sparkles className='relative size-8 text-brand' />
                  </div>

                  {/* Welcome copy */}
                  <div className='mb-7 text-center'>
                    <div className='inline-flex items-center gap-1.5 bg-brand/5 mb-3 px-3 py-1.5 border border-brand/15 rounded-full font-medium text-brand text-xs'>
                      <Sparkles className='size-3.5' />
                      Your smart rental guide
                    </div>

                    <h3 className='font-bold sm:text-[28px] text-2xl text-balance tracking-tight'>
                      Let&apos;s find your next home.
                    </h3>

                    <p className='mx-auto mt-3 max-w-[290px] text-muted-foreground text-sm text-pretty leading-6'>
                      Tell me your budget, preferred location, and what matters
                      most to you. Let&apos;s find the right fit.
                    </p>
                  </div>

                  {/* Suggested prompts */}
                  <div className='flex justify-between items-center mb-3'>
                    <p className='font-semibold text-muted-foreground text-xs uppercase tracking-wider'>
                      Try asking
                    </p>

                    <Sparkles className='size-3.5 text-brand/70' />
                  </div>

                  <div className='gap-3 grid grid-cols-2'>
                    {suggestions.map((suggestion) => {
                      const Icon = suggestion.icon;

                      return (
                        <button
                          key={suggestion.title}
                          type='button'
                          disabled={isLoading}
                          onClick={() => {
                            void sendMessage(suggestion.prompt);
                          }}
                          className={cn(
                            "group relative flex flex-col items-start rounded-2xl min-h-[126px]",
                            "border border-border/80 bg-card p-3.5 text-left",
                            "transition-[border-color,background-color,transform,box-shadow] duration-200",
                            "hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/[0.035] hover:shadow-md",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            "disabled:pointer-events-none disabled:opacity-50",
                            "motion-reduce:transform-none motion-reduce:transition-none",
                          )}
                        >
                          <span className='flex justify-center items-center bg-brand/10 group-hover:bg-brand/15 mb-3 rounded-xl size-9 text-brand transition-colors'>
                            <Icon className='size-[18px]' />
                          </span>

                          <span className='flex justify-between items-center gap-1 w-full'>
                            <span className='font-semibold text-sm leading-5'>
                              {suggestion.title}
                            </span>

                            <ArrowUpRight className='opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 size-3.5 text-muted-foreground transition-opacity shrink-0' />
                          </span>

                          <span className='mt-1 text-muted-foreground text-xs leading-5'>
                            {suggestion.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <p className='mt-5 text-muted-foreground text-xs text-center'>
                    Ask a question to get started.
                  </p>
                </div>
              </div>
            ) : (
              <div className='space-y-6 px-4 sm:px-5 py-5'>
                {messages.map((message) => (
                  <AiChatMessage
                    key={message.id}
                    message={message}
                    onRetry={
                      message.status === "error" ? retryLastMessage : undefined
                    }
                  />
                ))}

                {isLoading &&
                  !messages.some(
                    (message) =>
                      message.role === "assistant" &&
                      message.status === "streaming" &&
                      message.content.length > 0,
                  ) && <AiStatus status={status} />}

                {error && (
                  <div
                    role='alert'
                    className='bg-destructive/5 ml-10 px-3 py-2.5 border border-destructive/20 rounded-xl text-destructive text-sm'
                  >
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Composer */}
          <div className='pb-[max(12px,env(safe-area-inset-bottom))] bg-background/95 px-3 sm:px-4 pt-3 border-border/70 border-t sm:rounded-b-3xl shrink-0'>
            <AiChatInput
              isLoading={isLoading}
              onSend={sendMessage}
              onStop={stopGeneration}
            />

            <p className='mt-2 text-[10px] text-muted-foreground text-center leading-4'>
              AI can make mistakes. Verify listing details before renting.
            </p>
          </div>
        </section>
      )}

      {/* Floating launcher */}
      {!isOpen && (
        <Button
          type='button'
          onClick={() => setIsOpen(true)}
          aria-label='Open RentNest AI assistant'
          aria-expanded={isOpen}
          title='Chat with RentNest AI'
          className={cn(
            "right-5 bottom-[max(20px,env(safe-area-inset-bottom))] z-50 fixed",
            "size-14 rounded-2xl bg-brand text-brand-foreground",
            "shadow-xl shadow-brand/25",
            "transition-[transform,background-color,box-shadow] duration-200",
            "hover:-translate-y-1 hover:bg-brand/90 hover:shadow-2xl hover:shadow-brand/25",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "motion-reduce:transform-none motion-reduce:transition-none",
          )}
        >
          <MessageCircle className='size-6' />

          <span
            aria-hidden='true'
            className='-top-1 -right-1 absolute flex justify-center items-center bg-brand-success border-2 border-background rounded-full size-4'
          >
            <span className='bg-white rounded-full size-1.5' />
          </span>
        </Button>
      )}
    </>
  );
}
