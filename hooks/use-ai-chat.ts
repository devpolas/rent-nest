"use client";

import { useCallback, useRef, useState } from "react";

import { sendAiChat } from "../lib/ai-api";
import type {
  AiChatRequestMessage,
  AiChatStatus,
  AiMessage,
} from "../types/ai.types";

function createId(): string {
  return crypto.randomUUID();
}

function toRequestMessages(messages: AiMessage[]): AiChatRequestMessage[] {
  return messages
    .filter(
      (message) =>
        message.content.trim().length > 0 &&
        message.status !== "error" &&
        message.status !== "streaming",
    )
    .slice(-19)
    .map(({ role, content }) => ({ role, content }));
}

export function useAiChat() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [status, setStatus] = useState<AiChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const messagesRef = useRef<AiMessage[]>([]);
  const controllerRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);

  /**
   * Keep the ref and React state synchronized.
   * The ref provides the latest messages to async callbacks.
   */
  const commitMessages = useCallback(
    (updater: (current: AiMessage[]) => AiMessage[]) => {
      const next = updater(messagesRef.current);

      messagesRef.current = next;
      setMessages(next);
    },
    [],
  );

  /**
   * Start a request for a new message or retry the last user message.
   */
  const runMessage = useCallback(
    async (content: string, retry = false): Promise<void> => {
      const text = content.trim();

      if (!text || busyRef.current) return;

      busyRef.current = true;
      setError(null);

      const controller = new AbortController();
      controllerRef.current = controller;

      const current = messagesRef.current;

      let conversation: AiMessage[];
      let userMessage: AiMessage;

      if (retry) {
        const lastUserIndex = current.findLastIndex(
          (message) => message.role === "user",
        );

        if (lastUserIndex === -1) {
          busyRef.current = false;
          controllerRef.current = null;
          setStatus("idle");
          return;
        }

        userMessage = current[lastUserIndex];

        // Remove the previous response and any later messages.
        conversation = current.slice(0, lastUserIndex + 1);

        commitMessages(() => conversation);
      } else {
        userMessage = {
          id: createId(),
          role: "user",
          content: text,
        };

        conversation = [...current, userMessage];

        commitMessages(() => conversation);
      }

      const requestMessages = toRequestMessages(
        conversation.slice(0, -1),
      ).concat({
        role: userMessage.role,
        content: userMessage.content,
      });

      const assistantId = createId();

      const assistantMessage: AiMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        status: "streaming",
      };

      commitMessages((previous) => [...previous, assistantMessage]);
      setStatus("thinking");

      try {
        await sendAiChat({
          messages: requestMessages.slice(-20),
          signal: controller.signal,

          onChunk(chunk) {
            // Ignore chunks from requests that are no longer active.
            if (controllerRef.current !== controller) return;

            setStatus("streaming");

            commitMessages((previous) =>
              previous.map(
                (message): AiMessage =>
                  message.id === assistantId
                    ? {
                        ...message,
                        content: message.content + chunk,
                        status: "streaming",
                      }
                    : message,
              ),
            );
          },
        });

        if (controllerRef.current !== controller) return;

        commitMessages((previous) =>
          previous.map(
            (message): AiMessage =>
              message.id === assistantId
                ? { ...message, status: "complete" }
                : message,
          ),
        );
      } catch (cause) {
        // A cleared or superseded request must not mutate the new chat.
        if (controllerRef.current !== controller) return;

        if (controller.signal.aborted) {
          commitMessages((previous) =>
            previous
              .map(
                (message): AiMessage =>
                  message.id === assistantId
                    ? { ...message, status: "stopped" }
                    : message,
              )
              .filter(
                (message) =>
                  message.id !== assistantId || message.content.length > 0,
              ),
          );
        } else {
          const message =
            cause instanceof Error
              ? cause.message
              : "Something went wrong. Please try again.";

          setError(message);

          commitMessages((previous) =>
            previous.map(
              (item): AiMessage =>
                item.id === assistantId ? { ...item, status: "error" } : item,
            ),
          );
        }
      } finally {
        // An older request must not reset a newer request's state.
        if (controllerRef.current === controller) {
          controllerRef.current = null;
          busyRef.current = false;
          setStatus("idle");
        }
      }
    },
    [commitMessages],
  );

  const sendMessage = useCallback(
    (content: string) => runMessage(content),
    [runMessage],
  );

  const stopGeneration = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  const retryLastMessage = useCallback(() => {
    if (busyRef.current) return;

    const lastUserMessage = [...messagesRef.current]
      .reverse()
      .find((message) => message.role === "user");

    if (!lastUserMessage) return;

    setError(null);
    void runMessage(lastUserMessage.content, true);
  }, [runMessage]);

  const clearMessages = useCallback(() => {
    // Invalidate the request before aborting it.
    const controller = controllerRef.current;
    controllerRef.current = null;
    busyRef.current = false;

    controller?.abort();

    messagesRef.current = [];
    setMessages([]);
    setStatus("idle");
    setError(null);
  }, []);

  return {
    messages,
    status,
    error,
    isLoading: status !== "idle",
    sendMessage,
    stopGeneration,
    retryLastMessage,
    clearMessages,
  };
}
