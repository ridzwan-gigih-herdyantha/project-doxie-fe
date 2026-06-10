import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

/** Top-level error banner shown above an auth form. Renders nothing when empty. */
export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
