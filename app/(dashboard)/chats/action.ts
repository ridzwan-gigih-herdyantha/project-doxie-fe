"use server";

import { api } from "@/lib/api/client";
import { toErrorResult } from "@/lib/api/errors";

export interface Message {
    id: number;
    chat_session_id: number;
    role: "user" | "assistant";
    content: string;
    model_used: string | null;
    created_at: string;
    updated_at: string;
}

export interface Session {
    id: number;
    user_id: number;
    document_id: number;
    title: string;
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
    documentId: number,
): Promise<successCreateSessionResponse | errorResponse> {
    try {
        return await api.post<successCreateSessionResponse>(`/documents/${documentId}/session`);
    } catch (error) {
        return toErrorResult(error);
    }
}

export async function listRecentChats(): Promise<successListSessionsResponse | errorResponse> {
    try {
        return await api.get<successListSessionsResponse>(`/sessions`);
    } catch (error) {
        return toErrorResult(error);
    }
}

export async function listSessions(
    documentId: number,
): Promise<successListSessionsResponse | errorResponse> {
    try {
        return await api.get<successListSessionsResponse>(`/documents/${documentId}/session`);
    } catch (error) {
        return toErrorResult(error);
    }
}

export async function listChats(
    chatSessionId: number,
): Promise<successListChatsResponse | errorResponse> {
    try {
        return await api.get<successListChatsResponse>(`/session/${chatSessionId}/messages`);
    } catch (error) {
        return toErrorResult(error);
    }
}