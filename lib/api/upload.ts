import { redirectToSessionExpired } from "@/lib/auth/expire";

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
  const formData = new FormData();
  formData.append("file", file);

  let res: Response;
  try {
    // No Content-Type header — the browser sets multipart with the boundary.
    res = await fetch("/api/backend/documents", {
      method: "POST",
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
