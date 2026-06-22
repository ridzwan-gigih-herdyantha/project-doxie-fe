"use server";

import { api } from "@/lib/api/client";
import { toErrorResult } from "@/lib/api/errors";

export interface Message {
    uuid: string;
    chat_session_id: string;
    role: "user" | "assistant" | "role-assistant" | "agent";
    content: string;
    model_used: string | null;
    created_at: string;
    updated_at: string;
}

export interface Session {
    uuid: string;
    document_uuid: string;
    title: string | null;
    created_at: string;
    updated_at: string;
}

export interface successListChatsResponse {
    success: true;
    message: string;
    data: Message[];
}

export interface successListSessionsResponse {
    success: true;
    message: string;
    data: Session[];
}

/** Cursor pagination info — sent alongside the list in a top-level `meta`. */
interface CursorMeta {
    next_cursor: string | null;
    prev_cursor: string | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    per_page: number;
}

export interface successRecentChatsResponse {
    success: true;
    message: string;
    data: Session[];
    nextCursor: string | null;
}

export interface successCreateSessionResponse {
    success: true;
    message: string;
    data: Session;
}

export interface errorResponse {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}

export async function deleteChat(id: string) {
    try {
        return await api.delete(`/chats/${id}`);
    } catch (error) {
        return toErrorResult(error);
    }
}

export async function createSession(
    documentId: string,
): Promise<successCreateSessionResponse | errorResponse> {
    try {
        return await api.post<successCreateSessionResponse>(`/documents/${documentId}/session`);
    } catch (error) {
        return toErrorResult(error);
    }
}

export async function listRecentChats(
    params?: { cursor?: string | null; perPage?: number },
): Promise<successRecentChatsResponse | errorResponse> {
    const search = new URLSearchParams();
    if (params?.perPage) search.set("per_page", String(params.perPage));
    if (params?.cursor) search.set("cursor", params.cursor);
    const qs = search.toString();

    try {
        const res = await api.get<{ success: true; message: string; data: Session[]; meta: CursorMeta }>(
            `/sessions${qs ? `?${qs}` : ""}`,
        );
        return {
            success: true,
            message: res.message,
            data: res.data ?? [],
            nextCursor: res.meta?.next_cursor ?? null,
        };
    } catch (error) {
        return toErrorResult(error);
    }
}

export async function listSessions(
    documentId: string,
): Promise<successListSessionsResponse | errorResponse> {
    try {
        return await api.get<successListSessionsResponse>(`/documents/${documentId}/session`);
    } catch (error) {
        return toErrorResult(error);
    }
}

export async function listChats(
    chatSessionId: string,
): Promise<successListChatsResponse | errorResponse> {
    try {
        return await api.get<successListChatsResponse>(`/session/${chatSessionId}/messages`);
    } catch (error) {
        return toErrorResult(error);
    }
}