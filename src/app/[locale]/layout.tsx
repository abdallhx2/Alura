import { Inter, Playfair_Display, Lemonada } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, getDirection, type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lemonada = Lemonada({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lemonada",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = "https://aloura.agency";
  const title = locale === "ar" ? "ألورا | بيت الإبداع" : "ALOURA | Creative House";
  const description =
    locale === "ar"
      ? "بيت الإبداع والفخامة - نصنع حلولاً مخصصة تعيد تعريف كيفية تواصل العلامات التجارية مع جمهورها"
      : "Luxury & Creative House - We craft bespoke solutions that redefine how brands connect with their audiences";

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    icons: {
      icon: "/images/logo.png",
      shortcut: "/images/logo.png",
      apple: "/images/logo.png",
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "ALOURA",
      images: [
        {
          url: "/images/logo.png",
          width: 1200,
          height: 630,
          alt: locale === "ar" ? "ألورا - بيت الإبداع" : "ALOURA - Creative House",
        },
      ],
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = getDirection(locale as Locale);

  return (
    <html lang={locale} dir={direction}>
      <head>
        <OrganizationJsonLd locale={locale} />
        <WebsiteJsonLd locale={locale} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${lemonada.variable} font-body antialiased`}
      >
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
