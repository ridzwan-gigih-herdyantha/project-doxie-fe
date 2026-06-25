/** Decorative "command center" graphic standing in for the mission photo. */
export function CommandCenter() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-[#070E1D] ring-1 ring-foreground/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand)_16%,transparent),transparent_65%)]"
      />
      <div className="absolute inset-0 flex flex-col justify-center gap-3 p-8">
        {/* faux monitor wall */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="space-y-1.5 rounded-lg border border-brand/20 bg-brand/5 p-2.5"
            >
              <div className="h-1.5 w-3/4 rounded-full bg-brand/40" />
              <div className="h-1.5 w-full rounded-full bg-brand/20" />
              <div className="h-1.5 w-1/2 rounded-full bg-brand/20" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 items-end gap-1 rounded-lg border border-brand/20 bg-brand/5 p-2.5"
            >
              {[40, 70, 50, 90, 60, 80].map((h, j) => (
                <div
                  key={j}
                  className="flex-1 rounded-sm bg-brand/40"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}