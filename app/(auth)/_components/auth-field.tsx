"use client";

import { useState, type ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** A live validation rule: return an error message, or null when valid. */
export type FieldRule = (value: string) => string | null;

export const rule = {
  email: (v: string): string | null =>
    v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? null
      : "Enter a valid email address.",
  min: (n: number, msg?: string): FieldRule => (v) =>
    v.length >= n ? null : msg ?? `Must be at least ${n} characters.`,
  max: (n: number, msg?: string): FieldRule => (v) =>
    v.length <= n ? null : msg ?? `Must be at most ${n} characters.`,
};

interface AuthFieldProps extends ComponentProps<typeof Input> {
  label: string;
  name: string;
  ref_text?: string;
  ref_link?: string;
  /** Server-side validation messages (e.g. from a Laravel 422). */
  errors?: string[];
  /** Live client-side rules, checked as the user types. */
  rules?: FieldRule[];
  /** Muted helper text shown when the field is valid. */
  hint?: string;
  /** Show an "x/max" character counter. */
  counterMax?: number;
}

export function AuthField({
  label,
  name,
  errors,
  id,
  ref_text,
  ref_link,
  rules,
  hint,
  counterMax,
  defaultValue,
  onChange,
  onBlur,
  ...props
}: AuthFieldProps) {
  const fieldId = id ?? name;
  const [value, setValue] = useState(String(defaultValue ?? ""));
  const [touched, setTouched] = useState(false);

  // Validate once the user has interacted (typed or blurred).
  const active = touched || value !== String(defaultValue ?? "");
  const liveError =
    active && rules ? rules.reduce<string | null>((acc, r) => acc ?? r(value), null) : null;
  // Server errors apply until the user edits the field; then live rules govern.
  const serverError =
    !active && errors?.length ? errors.join(" ") : null;
  const error = liveError ?? serverError;

  const errorId = error ? `${fieldId}-error` : undefined;
  const showHint = !error && hint;
  const overCount = counterMax != null && value.length > counterMax;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <Label htmlFor={fieldId}>{label}</Label>
        {ref_text && (
          <a href={ref_link ?? "#"} className="text-xs text-brand hover:underline">
            {ref_text}
          </a>
        )}
      </div>
      <Input
        id={fieldId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        defaultValue={defaultValue}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        className="dark:bg-[#070E1D] [--autofill-bg:#070E1D] border-[#3D4A42] focus:ring-[#3D4A42] data-invalid:ring-destructive data-invalid:focus:ring-destructive"
        {...props}
      />
      {(error || showHint || counterMax != null) && (
        <div className="flex items-start justify-between gap-2">
          {error ? (
            <p id={errorId} className="text-sm text-destructive">
              {error}
            </p>
          ) : showHint ? (
            <p className="text-xs text-muted-foreground">{hint}</p>
          ) : (
            <span />
          )}
          {counterMax != null && (
            <span
              className={cn(
                "shrink-0 text-xs tabular-nums",
                overCount ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {value.length}/{counterMax}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
