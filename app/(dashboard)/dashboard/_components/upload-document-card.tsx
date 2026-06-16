"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { uploadDocument } from "../../actions";

export default function UploadDocumentCard() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const upload = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are supported.");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Uploading document...");
    try {
      const result = await uploadDocument(file);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        router.refresh();
      } else {
        const detail = result.errors
          ? Object.values(result.errors).flat().join("\n")
          : result.message;
        toast.error(detail || "Failed to upload document", { id: toastId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) upload(file);
      }}
      disabled={isLoading}
      className={cn(
        "flex min-h-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border p-6 text-center transition-colors",
        "hover:border-[#68DBA9]/50 hover:bg-[#68DBA9]/5",
        isDragging && "border-[#68DBA9] bg-[#68DBA9]/10",
        isLoading && "pointer-events-none opacity-70",
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-lg bg-card text-foreground ring-1 ring-foreground/10">
        <FileUp className="size-5" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-serif text-sm text-foreground">Upload PDF</p>
        <p className="text-xs text-muted-foreground">
          {isLoading ? "Uploading…" : "Drag and drop or click to browse"}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />
    </button>
  );
}
