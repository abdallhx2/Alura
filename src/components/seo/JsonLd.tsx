interface JsonLdProps {
  locale: string;
}

export function OrganizationJsonLd({ locale }: JsonLdProps) {
  const isArabic = locale === "ar";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ALOURA",
    alternateName: isArabic ? "ألورا" : "ALOURA Creative House",
    url: "https://aloura.agency",
    logo: "https://aloura.agency/images/logo.png",
    description: isArabic
      ? "بيت الإبداع والفخامة - نصنع حلولاً مخصصة تعيد تعريف كيفية تواصل العلامات التجارية مع جمهورها"
      : "Luxury & Creative House - We craft bespoke solutions that redefine how brands connect with their audiences",
    foundingDate: "2018",
    founder: {
      "@type": "Person",
      name: isArabic ? "لمياء الحسني" : "Lamia Al-Hassani",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: isArabic ? "مكة المكرمة" : "Mecca",
      addressCountry: "SA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@aloura.agency",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: ["https://instagram.com/aloura_co"],
    areaServed: {
      "@type": "Country",
      name: isArabic ? "المملكة العربية السعودية" : "Saudi Arabia",
    },
    knowsAbout: isArabic
      ? ["التسويق الرقمي", "إدارة وسائل التواصل الاجتماعي", "صناعة المحتوى", "التوجيه الإبداعي"]
      : ["Digital Marketing", "Social Media Management", "Content Creation", "Creative Direction"],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://aloura.agency/#localbusiness",
    name: "ALOURA",
    image: "https://aloura.agency/images/logo.png",
    url: "https://aloura.agency",
    email: "info@aloura.agency",
    address: {
      "@type": "PostalAddress",
      addressLocality: isArabic ? "مكة المكرمة" : "Mecca",
      addressRegion: isArabic ? "منطقة مكة المكرمة" : "Makkah Region",
      addressCountry: "SA",
    },
    priceRange: "$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}

export function WebsiteJsonLd({ locale }: JsonLdProps) {
  const isArabic = locale === "ar";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ALOURA",
    alternateName: isArabic ? "ألورا" : "ALOURA Creative House",
    url: "https://aloura.agency",
    inLanguage: isArabic ? "ar-SA" : "en-US",
    publisher: {
      "@type": "Organization",
      name: "ALOURA",
      logo: {
        "@type": "ImageObject",
        url: "https://aloura.agency/images/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}
