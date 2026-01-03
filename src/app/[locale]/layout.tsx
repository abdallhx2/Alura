import { Inter, Playfair_Display, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, getDirection, type Locale } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return {
    title: locale === "ar" ? "ألورا | بيت الإبداع" : "ALOURA | Creative House",
    description:
      locale === "ar"
        ? "بيت الإبداع والفخامة - نصنع حلولاً مخصصة تعيد تعريف كيفية تواصل العلامات التجارية مع جمهورها"
        : "Luxury & Creative House - We craft bespoke solutions that redefine how brands connect with their audiences",
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = getDirection(locale as Locale);

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${inter.variable} ${playfair.variable} ${ibmArabic.variable} font-body antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
