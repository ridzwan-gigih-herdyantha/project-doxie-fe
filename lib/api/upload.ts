import { redirectToSessionExpired } from "@/lib/auth/expire";
import { getUploadToken } from "@/app/(dashboard)/documents/action";

// Public Laravel base URL — upload goes browser→API directly (no Vercel function).
const API_URL = (process.env.NEXT_PUBLIC_LARAVEL_API_URL ?? "").replace(/\/+$/, "");

export interface UploadedDocument {
  user_id: number;
  title: string;
  status: string;
  file_name: string;
  file_path: string;
  file_size: number;
}

export type UploadResult =
  | { success: true; message: string; data: UploadedDocument }
  | { success: false; message: string; errors?: Record<string, string[]> };


export async function uploadDocumentFile(file: File): Promise<UploadResult> {
  // Misconfig (missing base URL) — keep the message generic for users.
  if (!API_URL) {
    console.error("uploadDocumentFile: NEXT_PUBLIC_LARAVEL_API_URL is not set.");
    return { success: false, message: "Couldn't upload right now. Please try again." };
  }

  const formData = new FormData();
  formData.append("file", file);

  const token = await getUploadToken();

  let res: Response;
  try {
    // Direct to Laravel; no Content-Type header so the browser sets the boundary.
    res = await fetch(`${API_URL}/documents`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
  } catch {
    return { success: false, message: "Couldn't reach the server. Please try again." };
  }

  // Token rejected mid-session — clear it and bounce to login.
  if (res.status === 401) {
    redirectToSessionExpired();
    return { success: false, message: "Your session expired. Redirecting to login…" };
  }

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    // 413 often has no JSON body (rejected by the web server), so give a clear fallback.
    const fallback =
      res.status === 413
        ? "File is too large to upload. Please choose a smaller file."
        : `Upload failed (HTTP ${res.status}).`;
    return {
      success: false,
      message: payload?.message ?? fallback,
      errors: payload?.errors,
    };
  }

  return {
    success: true,
    message: payload?.message ?? "Document uploaded successfully.",
    data: payload?.data,
  };
}
