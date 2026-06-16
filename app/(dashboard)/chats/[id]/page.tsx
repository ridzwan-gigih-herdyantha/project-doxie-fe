"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function ChatSection() {
    const params = useParams();

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight">Chat</h2>
            <p className="text-sm text-muted-foreground">
                ID : {params.id}
            </p>
        </div>
    );
}