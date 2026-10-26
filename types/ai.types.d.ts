export type AiMessageRole = "user" | "assistant";

export type AiMessageStatus = "streaming" | "complete" | "stopped" | "error";

export type AiMessage = {
  id: string;
  role: AiMessageRole;
  content: string;
  status?: AiMessageStatus;
};

export type AiChatStatus = "idle" | "thinking" | "streaming";

export type AiChatRequestMessage = Pick<AiMessage, "role" | "content">;

export type SendAiChatOptions = {
  messages: AiChatRequestMessage[];
  signal: AbortSignal;
  onChunk: (chunk: string) => void;
};

export type AiAssistantProps = {
  className?: string;
};
