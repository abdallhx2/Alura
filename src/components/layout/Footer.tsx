"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;



  return (
    <>
      <footer className="border-t border-muted/20 py-16 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-start">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link
                href={`/${locale}`}
                className="text-4xl md:text-5xl font-display tracking-ultra uppercase block mb-4"
              >
                ALOURA
              </Link>
              <p className="text-white/80 text-sm max-w-md mx-auto md:mx-0">
                {t("hero.description")}
              </p>
            </div>



            {/* Contact */}
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-6">
                {t("nav.contact")}
              </h4>
              <ul className="space-y-4 flex flex-col items-center md:items-start">
                <li className="flex items-center gap-3 text-white/80 text-sm">
                  <Mail size={16} />
                  <a
                    href="mailto:info@aloura.agency"
                    className="hover:text-white transition-colors"
                  >
                    {t("contact.info.email")}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/80 text-sm">
                  <MapPin size={16} />
                  <span>{t("contact.info.location")}</span>
                </li>
                <li className="flex items-center gap-3 text-white/80 text-sm">
                  <Instagram size={16} />
                  <a
                    href="https://instagram.com/aloura_co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    @aloura_co
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Separate White Footer Bar */}
      <div className="bg-white text-black py-6 border-t border-gray-100">
        <div className="container mx-auto px-6 flex justify-center items-center text-xs md:text-sm">
          <a
            href="https://an1.space"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-all"
          >
            {locale === "ar" ? "التصميم والتطوير تم من قبل عبدالله الحسني" : "Designed and Developed by Abdullah Al-Hasani"}
          </a>
        </div>
      </div>
    </>
  );
}
