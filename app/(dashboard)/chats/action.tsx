"use server";

import { api } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";

// TODO: Chat session get API
export interface Chat {
    id: string;
    name: string;
    messages: string[];
}

export interface successListChatsResponse {
    success: true;
    message: string;
    data: Chat[];
}

export async function deleteChat(id: string) {
    try {
        return await api.delete(`/chats/${id}`);
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
}

export async function listChats() {
    try {
        // TODO: Chat list get API
        return await api.get<successListChatsResponse>("/chats");
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