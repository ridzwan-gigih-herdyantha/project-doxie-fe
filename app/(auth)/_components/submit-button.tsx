"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Full-width submit button that reads the parent form's pending state via
 * `useFormStatus`, so each auth form gets a loading state without threading
 * props. Must be rendered inside a `<form>`.
 */
export function SubmitButton({
  children,
  pendingText,
}: {
  children: React.ReactNode;
  pendingText: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full py-6 rounded-sm bg-[#25A475] hover:bg-[#25A475]/80 text-gray-900">
      {pending && <Loader2 className="animate-spin" />}
      {pending ? pendingText : children}
    </Button>
  );
}
