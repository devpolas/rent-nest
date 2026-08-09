"use server";
import { cookies } from "next/headers";

export async function getServerAuthHeaders(): Promise<{
  Cookie: string;
}> {
  const cookieStore = await cookies();

  return {
    Cookie: cookieStore.toString(),
  };
}
