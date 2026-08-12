import { parsePhoneNumberFromString } from "libphonenumber-js";

export function namePerfect(name: string | null) {
  if (!name?.trim()) return "—";
  const value = name.trim();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export type Milliseconds = number & { readonly __brand: "Milliseconds" };

export const Time = {
  ms: (n: number) => n as Milliseconds,
  second: (n: number) => (n * 1_000) as Milliseconds,
  minute: (n: number) => (n * 60_000) as Milliseconds,
  hour: (n: number) => (n * 3_600_000) as Milliseconds,
  day: (n: number) => (n * 86_400_000) as Milliseconds,
} as const;

export function formatDate(date: Date | string | null) {
  if (!date) return "—";

  const d = new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
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

export function formatPhone(phone: string | null) {
  if (!phone) return "—";
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber?.isValid() ? phoneNumber.formatInternational() : phone;
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
