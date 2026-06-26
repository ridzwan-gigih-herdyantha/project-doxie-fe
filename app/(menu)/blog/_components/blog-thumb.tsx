"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { CATEGORY_ICON, type Category } from "../posts";
import Image from "next/image";

/**
 * Blog thumbnail: shows the cover image when available, otherwise (or on load
 * error) falls back to a category-relevant tech/AI/document icon over a glow.
 */
export function BlogThumb({
  image,
  category,
  className,
  iconClassName,
  children,
}: {
  image?: string;
  category: Category;
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const Icon = CATEGORY_ICON[category];
  const showImage = image && !failed;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#070E1D] ring-1 ring-foreground/5",
        className,
      )}
    >
      {/* Fallback layer (always present, sits behind the image) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand)_18%,transparent),transparent_65%)]"
      />
      <Icon
        aria-hidden
        className={cn(
          "absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-brand opacity-60",
          iconClassName,
        )}
      />

      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          src={image}
          alt=""
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}

      {children}
    </div>
  );
}
