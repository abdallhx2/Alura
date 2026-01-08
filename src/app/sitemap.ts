import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aloura.agency";
  const locales = ["en", "ar"];
  const lastModified = new Date();

  // الصفحات المتاحة حالياً
  const pages = [""];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // إنشاء entries لكل صفحة بكل لغة
  for (const page of pages) {
    for (const locale of locales) {
      const path = page ? `/${locale}/${page}` : `/${locale}`;
      sitemapEntries.push({
        url: `${baseUrl}${path}`,
        lastModified,
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page ? `/${page}` : ""}`,
            ar: `${baseUrl}/ar${page ? `/${page}` : ""}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
