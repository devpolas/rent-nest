"use server";

import axios from "axios";
import { cookies, headers } from "next/headers";

const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API!,
  withCredentials: true,
});

axiosServerInstance.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const requestHeaders = await headers();

  /**
   * Forward authentication cookies
   */
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  if (cookieHeader) {
    config.headers.set("Cookie", cookieHeader);
  }

  /**
   * Forward browser/client metadata
   *
   * If the original browser request already
   * contains X-Client-Info, preserve it.
   */
  const clientInfo = requestHeaders.get("x-client-info");

  if (clientInfo) {
    config.headers.set("X-Client-Info", clientInfo);
  } else {
    /**
     * Fallback metadata available to Next.js.
     */
    const fallbackClientInfo = {
      userAgent: requestHeaders.get("user-agent"),

      language: requestHeaders.get("accept-language"),

      referer: requestHeaders.get("referer"),

      origin: requestHeaders.get("origin"),
    };

    config.headers.set("X-Client-Info", JSON.stringify(fallbackClientInfo));
  }

  /**
   * Forward User-Agent
   */
  const userAgent = requestHeaders.get("user-agent");

  if (userAgent) {
    config.headers.set("User-Agent", userAgent);
  }

  /**
   * Forward Accept-Language
   */
  const acceptLanguage = requestHeaders.get("accept-language");

  if (acceptLanguage) {
    config.headers.set("Accept-Language", acceptLanguage);
  }

  /**
   * Forward request ID if one exists
   */
  const requestId = requestHeaders.get("x-request-id");

  if (requestId) {
    config.headers.set("X-Request-ID", requestId);
  }

  return config;
});

export default axiosServerInstance;
