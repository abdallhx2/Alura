"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Camera, Palette, Share2, Check } from "lucide-react";

export default function ServicesPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const services = [
    {
      number: "01",
      icon: Camera,
      titleKey: "services.service1.title",
      descriptionKey: "services.service1.description",
      items: [
        "services.service1.item1",
        "services.service1.item2",
        "services.service1.item3",
      ],
      image: "/images/web-pic/2.png",
    },
    {
      number: "02",
      icon: Palette,
      titleKey: "services.service2.title",
      descriptionKey: "services.service2.description",
      items: [
        "services.service2.item1",
        "services.service2.item2",
        "services.service2.item3",
      ],
      image: "/images/web-pic/3.png",
    },
    {
      number: "03",
      icon: Share2,
      titleKey: "services.service3.title",
      descriptionKey: "services.service3.description",
      items: [
        "services.service3.item1",
        "services.service3.item2",
        "services.service3.item3",
      ],
      image: "/images/web-pic/4.png",
    },
  ];

  return (
    <div className="py-16">
      {/* Header */}
      <section className="container mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="section-number">{t("services.sectionNumber")}</span>
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest mt-4 mb-8">
            {t("services.heading")}
          </h1>
          <p className="text-muted text-lg">
            {t("services.description")}
          </p>
        </motion.div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <section
          key={service.number}
          className={`py-24 ${index % 2 === 1 ? "bg-foreground/5" : ""}`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="section-number">{service.number}</span>
                  <service.icon size={32} className="text-muted" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display uppercase tracking-widest mb-6">
                  {t(service.titleKey)}
                </h2>
                <p className="text-muted text-lg mb-8">
                  {t(service.descriptionKey)}
                </p>
                <ul className="space-y-4 mb-8">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted">{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative aspect-[4/5] ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <Image
                  src={service.image}
                  alt={t(service.titleKey)}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest mb-4">
              {t("services.cta.title")}
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              {t("services.cta.description")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="btn-solid inline-flex items-center gap-2"
            >
              {t("common.getInTouch")}
              <Arrow size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
