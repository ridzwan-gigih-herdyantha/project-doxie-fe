import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function ChatSection() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight">Chat</h2>
            <p className="text-sm text-muted-foreground">
                ID : {router.query.id}
            </p>
        </div>
    );
}