"use client";

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { uploadDocumentFile } from "@/lib/api/upload";
import { revalidateDocuments } from "../actions";

export default function NewDocumentButton() {
    const router = useRouter();
    const { state, isMobile } = useSidebar();
    const collapsed = state === "collapsed" && !isMobile;

    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    useEffect(() => {
        if (file) {
            console.log(file)
        }
    }, [file]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setIsLoading(true);
        const toastId = toast.loading("Uploading document...");

        try {
            const result = await uploadDocumentFile(selectedFile);

            if (result.success) {
                toast.success(result.message, { id: toastId });
                setFile(selectedFile);
                await revalidateDocuments();
                router.refresh();
            } else {
                const detail = result.errors
                    ? Object.values(result.errors).flat().join("\n")
                    : result.message;
                console.log(detail);
                toast.error(detail || "Failed to upload document", { id: toastId });
            }
        } finally {
            setIsLoading(false);
            event.target.value = "";
        }
    };

    // useEffect(() => {
    //     if (file) {
    //         console.log(file)
    //     }
    // }, [file]);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    disabled={isLoading}
                    onClick={handleFileInput}
                    size={collapsed ? "icon" : "default"}
                    className={cn(
                        "gap-2 bg-brand text-brand-foreground hover:bg-brand/80",
                        !collapsed && "w-full",
                    )}
                >
                    {isLoading ? <Spinner /> : <PlusIcon />}
                    {!collapsed && <span>{isLoading ? "Loading..." : "New Document"}</span>}
                    <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">New Document</TooltipContent>}
        </Tooltip>
    )
}