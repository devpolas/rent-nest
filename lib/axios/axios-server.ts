"use server";

import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { cookies, headers } from "next/headers";

const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API!,
  withCredentials: true,
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

async function getCookieHeader() {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
}

axiosServerInstance.interceptors.request.use(async (config) => {
  const cookieHeader = await getCookieHeader();
  const requestHeaders = await headers();

  if (cookieHeader) {
    config.headers.set("Cookie", cookieHeader);
  }

  const clientInfo = requestHeaders.get("x-client-info");

  config.headers.set(
    "X-Client-Info",
    clientInfo ??
      JSON.stringify({
        userAgent: requestHeaders.get("user-agent"),
        language: requestHeaders.get("accept-language"),
        referer: requestHeaders.get("referer"),
        origin: requestHeaders.get("origin"),
      }),
  );

  const userAgent = requestHeaders.get("user-agent");

  if (userAgent) {
    config.headers.set("User-Agent", userAgent);
  }

  const acceptLanguage = requestHeaders.get("accept-language");

  if (acceptLanguage) {
    config.headers.set("Accept-Language", acceptLanguage);
  }

  const requestId = requestHeaders.get("x-request-id");

  if (requestId) {
    config.headers.set("X-Request-ID", requestId);
  }

  return config;
});

async function refreshTokens() {
  try {
    const cookieHeader = await getCookieHeader();

    if (!cookieHeader) {
      return false;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/auth/refresh-token`,
      null,
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      },
    );

    if (!response.headers["set-cookie"]) {
      return false;
    }

    const cookieStore = await cookies();

    for (const cookie of response.headers["set-cookie"]) {
      const [nameValue, ...attributes] = cookie.split(";");

      const [name, ...valueParts] = nameValue.split("=");

      const value = valueParts.join("=");

      if (!name || !value) continue;

      const options: {
        name: string;
        value: string;
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "lax" | "strict" | "none";
        path?: string;
        maxAge?: number;
      } = {
        name: name.trim(),
        value: value.trim(),
      };

      for (const attribute of attributes) {
        const [key, attributeValue] = attribute.trim().split("=");

        switch (key.toLowerCase()) {
          case "httponly":
            options.httpOnly = true;
            break;

          case "secure":
            options.secure = true;
            break;

          case "path":
            options.path = attributeValue;
            break;

          case "max-age":
            options.maxAge = Number(attributeValue);
            break;

          case "samesite":
            if (
              attributeValue === "lax" ||
              attributeValue === "strict" ||
              attributeValue === "none"
            ) {
              options.sameSite = attributeValue;
            }
            break;
        }
      }

      cookieStore.set(options);
    }

    return true;
  } catch {
    return false;
  }
}

axiosServerInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetryConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retry ||
      request.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    request._retry = true;

    const refreshed = await refreshTokens();

    if (!refreshed) {
      return Promise.reject(error);
    }

    return axiosServerInstance.request(request);
  },
);

export default axiosServerInstance;
