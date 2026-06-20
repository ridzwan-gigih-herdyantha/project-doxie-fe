"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api/client";
import { toErrorResult } from "@/lib/api/errors";

export interface dataDocument {
    id: number;
    user_id: number;
    title: string;
    file_name: string;
    file_path: string;
    file_size: number;
    file_url: string;
    page_count: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface successListDocumentsResponse {
    success: true;
    message: string;
    data: dataDocument[];
}

export interface errorListDocumentsResponse {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}

export type documentsResult =
| successListDocumentsResponse
| errorListDocumentsResponse;

export interface successGetDocumentResponse {
    success: true;
    message: string;
    data: dataDocument;
}

export type documentResult =
| successGetDocumentResponse
| errorListDocumentsResponse;

export async function getDocument(id: string): Promise<documentResult> {
    try {
        return await api.get<successGetDocumentResponse>(`/documents/${id}`);
    } catch (error) {
        return toErrorResult(error);
    }
}

export async function deleteDocument(
    id: string,
): Promise<{ success: boolean; message: string }> {
    try {
        const res = await api.delete<{ message?: string }>(`/documents/${id}`);

        // Refresh every route that lists documents.
        revalidatePath("/dashboard");
        revalidatePath("/documents");

        return { success: true, message: res?.message ?? "Document deleted." };
    } catch (error) {
        return toErrorResult(error);
    }
}

export async function listDocuments(): Promise<documentsResult>{
    try {
        return await api.get<successListDocumentsResponse>("/documents");
    } catch (error) {
        return toErrorResult(error);
    }
}