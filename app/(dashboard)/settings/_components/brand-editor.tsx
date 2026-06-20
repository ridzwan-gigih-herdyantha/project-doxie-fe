"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  BRAND_FIELDS,
  applyBrandTheme,
  clearBrandTheme,
  loadBrandTheme,
  readCurrentBrandTheme,
  saveBrandTheme,
  type BrandTheme,
} from "@/lib/brand-theme";

export function BrandEditor() {
  const [theme, setTheme] = useState<BrandTheme | null>(null);

  // Seed from a saved override, else from the current stylesheet values.
  useEffect(() => {
    setTheme(loadBrandTheme() ?? readCurrentBrandTheme());
  }, []);

  if (!theme) return null;

  const update = (key: keyof BrandTheme, value: string) => {
    setTheme((prev) => (prev ? { ...prev, [key]: value } : prev));
    applyBrandTheme({ [key]: value }); // live preview
  };

  const handleSave = () => {
    saveBrandTheme(theme);
    toast.success("Brand colors saved.");
  };

  const handleReset = () => {
    clearBrandTheme();
    setTheme(readCurrentBrandTheme());
    toast.success("Brand colors reset to default.");
  };

  return (
    <Card className="gap-6 p-6">
      <div>
        <h3 className="text-sm font-semibold">Brand colors</h3>
        <p className="text-xs text-muted-foreground">
          Changes preview instantly and are saved to this browser.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {BRAND_FIELDS.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <Label htmlFor={f.key}>{f.label}</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id={f.key}
                value={theme[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                aria-label={`${f.label} color`}
                className="size-9 shrink-0 cursor-pointer rounded-sm border border-input bg-transparent p-0.5"
              />
              <input
                type="text"
                value={theme[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                spellCheck={false}
                className="h-8 w-full min-w-0 rounded-sm border border-input bg-transparent px-2.5 font-mono text-sm uppercase outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Live preview using the brand tokens. */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-4">
        <Button className="bg-brand text-brand-foreground hover:bg-brand/90">
          Primary
        </Button>
        <span className="rounded-md bg-brand-strong px-3 py-1.5 text-sm font-medium text-brand-foreground">
          Strong
        </span>
        <span className="rounded-md bg-brand-dark px-3 py-1.5 text-sm font-medium text-brand-foreground">
          Dark
        </span>
        <span className="font-medium text-brand">Brand text</span>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset to default
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          className="bg-brand text-brand-foreground hover:bg-brand/90"
        >
          Save colors
        </Button>
      </div>
    </Card>
  );
}
