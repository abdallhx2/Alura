"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Palette, Share2, Check } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { MeshGradient } from "@/components/ui/MeshGradient";

export default function ServicesPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const services = [
    {
      icon: Camera,
      titleKey: "services.service1.title",
      descriptionKey: "services.service1.description",
      items: [
        "services.service1.item1",
        "services.service1.item2",
        "services.service1.item3",
      ],
      image: "/images/web-pic/11.jpg",
    },
    {
      icon: Palette,
      titleKey: "services.service2.title",
      descriptionKey: "services.service2.description",
      items: [
        "services.service2.item1",
        "services.service2.item2",
        "services.service2.item3",
      ],
      image: "/images/web-pic/22.jpg",
    },
    {
      icon: Share2,
      titleKey: "services.service3.title",
      descriptionKey: "services.service3.description",
      items: [
        "services.service3.item1",
        "services.service3.item2",
        "services.service3.item3",
      ],
      image: "/images/web-pic/44.jpg",
    },
  ];

  return (
    <div className="py-16">
      {/* Header */}
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden mb-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/service-bw.png"
            alt="Services Hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Sidebar */}
        <div className="absolute inset-y-0 start-0 w-full md:w-1/2 lg:w-5/12 bg-black/90 flex flex-col justify-center p-8 md:p-16 shadow-2xl z-10">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest mb-8">
              {t("services.heading")}
            </h1>
            <p className="text-white/90 text-xl leading-relaxed">
              {t("services.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <section
          key={index}
          className={`py-24 ${index % 2 === 1 ? "bg-foreground/5" : ""}`}
        >
          <div className="container mx-auto px-6">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
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
                  <service.icon size={32} className="text-white/80" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display uppercase tracking-widest mb-6">
                  {t(service.titleKey)}
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  {t(service.descriptionKey)}
                </p>
                <ul className="space-y-4 mb-8">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative aspect-[4/5] ${index % 2 === 1 ? "lg:order-1" : ""
                  }`}
              >
                <Image
                  src={service.image}
                  alt={t(service.titleKey)}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-48 relative overflow-hidden min-h-[40vh] flex items-center">
        {/* Mesh Gradient Background */}
        <MeshGradient color="#333333" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest mb-4 text-white">
              {t("services.cta.title")}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {t("services.cta.description")}
            </p>
            <LiquidButton href={`/${locale}/contact`} className="h-14 w-48">
              {t("common.getInTouch")}
            </LiquidButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
