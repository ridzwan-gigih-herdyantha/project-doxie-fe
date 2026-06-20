import { cn } from "@/lib/utils";

/** Doxie mark — a document with a plus badge. Tinted via `currentColor` (text-brand). */
export function DoxieLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-6 text-brand", className)}
      {...props}
    >
      <path
        d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6Z"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <path
        d="M13 3v5a1 1 0 0 0 1 1h5"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13.5h5M8.5 17h3.5"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <circle cx="18" cy="6" r="3.3" fill="currentColor" />
      <path
        d="M18 4.4v3.2M16.4 6h3.2"
        stroke="var(--brand-foreground)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
