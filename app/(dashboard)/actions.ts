"use server";

import { redirect } from "next/navigation";

import { api } from "@/lib/api/client";
import { clearToken } from "@/lib/auth/session";

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch {
    // Ignore — proceed to clear the cookie regardless.
  }

  await clearToken();
  redirect("/login");
}
