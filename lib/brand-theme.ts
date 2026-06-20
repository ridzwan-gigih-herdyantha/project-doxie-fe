/**
 * Runtime-overridable brand colors.
 */
export const ADMIN_EMAIL = "admin@doxie.ai";

export const BRAND_STORAGE_KEY = "doxie_brand_theme";

export const BRAND_FIELDS = [
  { key: "brand", cssVar: "--brand", label: "Brand" },
  { key: "brandStrong", cssVar: "--brand-strong", label: "Brand strong (lighter)" },
  { key: "brandDark", cssVar: "--brand-dark", label: "Brand dark (deeper)" },
  { key: "brandForeground", cssVar: "--brand-foreground", label: "Text on brand" },
] as const;

export type BrandKey = (typeof BRAND_FIELDS)[number]["key"];
export type BrandTheme = Record<BrandKey, string>;

/** Override the live CSS variables on <html> (instant preview). */
export function applyBrandTheme(theme: Partial<BrandTheme>): void {
  for (const { key, cssVar } of BRAND_FIELDS) {
    const value = theme[key];
    if (value) document.documentElement.style.setProperty(cssVar, value);
  }
}

/** Drop the inline overrides so the stylesheet defaults take over again. */
export function clearAppliedBrandTheme(): void {
  for (const { cssVar } of BRAND_FIELDS) {
    document.documentElement.style.removeProperty(cssVar);
  }
}

export function loadBrandTheme(): BrandTheme | null {
  try {
    const raw = localStorage.getItem(BRAND_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BrandTheme) : null;
  } catch {
    return null;
  }
}

export function saveBrandTheme(theme: BrandTheme): void {
  localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(theme));
  applyBrandTheme(theme);
}

export function clearBrandTheme(): void {
  localStorage.removeItem(BRAND_STORAGE_KEY);
  clearAppliedBrandTheme();
}

/** Current values as rendered — a saved override, or the stylesheet default. */
export function readCurrentBrandTheme(): BrandTheme {
  const styles = getComputedStyle(document.documentElement);
  const out = {} as BrandTheme;
  for (const { key, cssVar } of BRAND_FIELDS) {
    out[key] = styles.getPropertyValue(cssVar).trim() || "#000000";
  }
  return out;
}
