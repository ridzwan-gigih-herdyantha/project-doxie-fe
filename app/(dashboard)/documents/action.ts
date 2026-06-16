"use server";

import { redirect } from "next/navigation";

import { api } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";

interface dataDocument {
    id: number;
    user_id: number;
    title: string;
    file_name: string;
    file_path: string;
    file_size: number;
    page_count: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface successListDocumentsResponse {
    success: boolean;
    message: string;
    data: dataDocument[];
}

export interface errorListDocumentsResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}

export type documentsResult = successListDocumentsResponse | errorListDocumentsResponse;

export async function deleteDocument(id: string) {
    try {
        await api.delete(`/documents/${id}`);
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: false,
            message: "Couldn't reach the server. Please try again.",
        };
    }
    redirect("/documents");
}

export async function listDocuments(): Promise<documentsResult>{
    try {
        return await api.get<successListDocumentsResponse>("/documents");
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
        }            
    }
}