"use server";

import { redirect } from "next/navigation";

import { api } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
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

export interface UploadedDocument {
  user_id: number;
  title: string;
  status: string;
  file_name: string;
  file_path: string;
  file_size: number;
}

interface UploadDocumentResponse {
  success: boolean;
  message: string;
  data: UploadedDocument;
}

export type UploadDocumentResult =
  | { success: true; message: string; data: UploadedDocument }
  | { success: false; message: string; errors?: Record<string, string[]> };

export async function uploadDocument(file: File): Promise<UploadDocumentResult> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post<UploadDocumentResponse>("/documents", undefined, {
      body: formData,
    });
    return { success: true, message: res.message, data: res.data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.validationErrors ?? undefined,
      };
    }
    return {
      success: false,
      message: "Couldn't reach the server. Please try again.",
    };
  }
}
