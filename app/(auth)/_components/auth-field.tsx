import type { ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Labelled shadcn input with inline validation errors. Presentational and reused
 * by every auth form so login/register stay consistent — forms just vary which
 * fields they render. Setting `aria-invalid` drives the destructive styling that
 * shadcn's Input already ships with.
 */
interface AuthFieldProps extends ComponentProps<typeof Input> {
  label: string;
  name: string;
  ref_text?: string;
  ref_link?: string;
  /** Validation messages for this field (e.g. from Laravel 422). */
  errors?: string[];
}

export function AuthField({ label, name, errors, id, ref_text, ref_link, ...props }: AuthFieldProps) {
  const fieldId = id ?? name;
  const hasError = Boolean(errors?.length);
  const errorId = hasError ? `${fieldId}-error` : undefined;
  const refText = ref_text ? `${ref_text}` : "";
  const refLink = ref_link ? `${ref_link}` : "#";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <Label htmlFor={fieldId}>{label}</Label>
        {refText && (
          <a href={refLink} className="text-xs text-brand hover:underline">
            {refText}
          </a>
        )}
      </div>
      <Input
        id={fieldId}
        name={name}
        aria-invalid={hasError}
        aria-describedby={errorId}
        className="dark:bg-[#070E1D] [--autofill-bg:#070E1D] border-[#3D4A42] focus:ring-[#3D4A42] data-invalid:ring-destructive data-invalid:focus:ring-destructive"
        {...props}
      />
      {hasError && (
        <p id={errorId} className={cn("text-sm text-destructive")}>
          {errors!.join(" ")}
        </p>
      )}
    </div>
  );
}
