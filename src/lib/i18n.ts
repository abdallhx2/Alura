export { routing, type Locale } from "@/i18n/routing";

export function getDirection(locale: string): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
