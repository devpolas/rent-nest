export function namePerfect(name: string) {
  const correctName = name.charAt(0).toUpperCase() + name.slice(1);
  return correctName;
}

export type Milliseconds = number & { readonly __brand: "Milliseconds" };

export const Time = {
  ms: (n: number) => n as Milliseconds,
  second: (n: number) => (n * 1_000) as Milliseconds,
  minute: (n: number) => (n * 60_000) as Milliseconds,
  hour: (n: number) => (n * 3_600_000) as Milliseconds,
  day: (n: number) => (n * 86_400_000) as Milliseconds,
} as const;

export function formatDate(date: Date) {
  const d = new Date(date);
  const result = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);

  return result;
}

export function getInitials(name: string) {
  if (!name) return;
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const CALLBACK_URL_KEY = "callbackUrl";

export function saveCallbackUrl(callbackUrl?: string) {
  localStorage.setItem(CALLBACK_URL_KEY, callbackUrl || "/");
}

export function getCallbackUrl() {
  return localStorage.getItem(CALLBACK_URL_KEY) || "/";
}

export function clearCallbackUrl() {
  localStorage.removeItem(CALLBACK_URL_KEY);
}
