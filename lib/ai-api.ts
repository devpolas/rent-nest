import type { SendAiChatOptions } from "../types/ai.types";

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export async function sendAiChat({
  messages,
  signal,
  onChunk,
}: SendAiChatOptions): Promise<void> {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
    },
    credentials: "same-origin",
    cache: "no-store",
    body: JSON.stringify({
      messages: messages.slice(-20),
    }),
    signal,
  });

  if (!response.ok) {
    let message = `The AI request failed (${response.status}).`;

    try {
      const data = (await response.json()) as ApiErrorResponse;

      if (typeof data.message === "string") {
        message = data.message;
      } else if (typeof data.error === "string") {
        message = data.error;
      }
    } catch {
      // Keep the default error if the response isn't JSON.
    }

    throw new Error(message);
  }

  if (!response.body) {
    throw new Error("The AI response stream is unavailable.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let receivedText = false;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      if (chunk) {
        receivedText = true;
        onChunk(chunk);
      }
    }

    const finalChunk = decoder.decode();

    if (finalChunk) {
      receivedText = true;
      onChunk(finalChunk);
    }
  } catch (error) {
    if (signal.aborted) {
      throw error;
    }

    throw new Error("The connection was interrupted. Please try again.");
  } finally {
    reader.releaseLock();
  }

  if (!receivedText) {
    throw new Error("The AI returned an empty response. Please try again.");
  }
}
