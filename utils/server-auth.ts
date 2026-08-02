"use server";

import { cookies } from "next/headers";
import type { AxiosRequestConfig } from "axios";

export async function withAuthHeaders(
  config: AxiosRequestConfig = {},
): Promise<AxiosRequestConfig> {
  const cookieStore = await cookies();

  return {
    ...config,
    headers: {
      ...config.headers,
      Cookie: cookieStore.toString(),
    },
  };
}
