"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { api } from "@/lib/api/client";
import { clearToken, clearUser } from "@/lib/auth/session";

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch {
    // Ignore — proceed to clear the cookie regardless.
  }

  await clearToken();
  await clearUser();
  redirect("/login");
}

/**
 * Invalidate the document lists after an upload (done client-side through the
 * proxy route) so every route that renders them re-fetches. Call this right
 * after a successful upload; it also auto-refreshes the route you're on.
 */
export async function revalidateDocuments() {
  revalidatePath("/dashboard");
  revalidatePath("/documents");
}
