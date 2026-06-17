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

/**
 * Upload a document straight to the Laravel API through the same-origin proxy
 * route (`/api/backend/*`).
 *
 * Unlike a Server Action this streams the request body (no 1MB limit) and
 * returns Laravel's real status — so a 422 comes back as a 422 with its field
 * errors instead of being masked as a 500. The proxy attaches the Bearer token
 * from the httpOnly cookie, so the token never touches client JS.
 *
 * Note: this does NOT revalidate Next's cache (it's a plain fetch, not a Server
 * Action). Call `revalidateDocuments()` after a success to refresh the lists.
 */
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

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      success: false,
      message: payload?.message ?? `Upload failed (HTTP ${res.status}).`,
      errors: payload?.errors,
    };
  }

  return {
    success: true,
    message: payload?.message ?? "Document uploaded successfully.",
    data: payload?.data,
  };
}
