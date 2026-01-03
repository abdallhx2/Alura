"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/about`, label: t("nav.about") },
    { href: `/${locale}/services`, label: t("nav.services") },
    { href: `/${locale}/portfolio`, label: t("nav.portfolio") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <footer className="border-t border-muted/20 py-16 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href={`/${locale}`}
              className="text-3xl font-display tracking-ultra uppercase block mb-4"
            >
              ALOURA
            </Link>
            <p className="text-muted text-sm max-w-md">
              {t("hero.description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6">
              {t("nav.home")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6">
              {t("nav.contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted text-sm">
                <Mail size={16} />
                <a
                  href="mailto:info@aloura.agency"
                  className="hover:text-foreground transition-colors"
                >
                  {t("contact.info.email")}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted text-sm">
                <MapPin size={16} />
                <span>{t("contact.info.location")}</span>
              </li>
              <li className="flex items-center gap-3 text-muted text-sm">
                <Instagram size={16} />
                <a
                  href="https://instagram.com/aloura_co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  @aloura_co
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-muted/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">{t("footer.copyright")}</p>
          <p className="text-muted text-sm">{t("footer.crafted")}</p>
        </div>
      </div>
    </footer>
  );
}
