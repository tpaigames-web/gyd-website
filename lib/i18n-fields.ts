export function pickLocalized(
  doc: object | null | undefined,
  field: string,
  locale: string,
  fallback = "",
): string {
  if (!doc) return fallback;
  const suffix = locale === "en" ? "En" : "Zh";
  const record = doc as Record<string, unknown>;
  const value = record[`${field}${suffix}`];
  if (typeof value === "string" && value.length > 0) return value;
  const otherSuffix = suffix === "Zh" ? "En" : "Zh";
  const other = record[`${field}${otherSuffix}`];
  if (typeof other === "string" && other.length > 0) return other;
  return fallback;
}
