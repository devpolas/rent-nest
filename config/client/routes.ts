// config/routes.ts

export const PUBLIC_ROUTES = [
  "/signin",
  "/signup",
  "/forget-password",
  "/reset-password",
  "/landlord/signup",
  "/verify-account",
] as const;

export const PROTECTED_PREFIX = "/dashboard";

export const MATCHER = [
  "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|svg|webp|ico)$).*)",
] as const;
