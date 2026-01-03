"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function HomePage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/web-pic/1.png"
            alt="Hero background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-ultra text-muted mb-4">
              {t("hero.subtitle")}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-widest mb-8">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/portfolio`} className="btn-outline inline-flex items-center justify-center gap-2">
                {t("common.viewWork")}
                <Arrow size={16} />
              </Link>
              <Link href={`/${locale}/contact`} className="btn-solid inline-flex items-center justify-center gap-2">
                {t("common.getInTouch")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-foreground/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-foreground/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Preview Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-number">{t("about.sectionNumber")}</span>
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest mt-4 mb-8">
                {t("about.heading")}
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {t("about.content")}
              </p>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent transition-colors"
              >
                {t("common.learnMore")}
                <Arrow size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5]"
            >
              <Image
                src="/images/web-pic/2.png"
                alt="About ALOURA"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-foreground/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="section-number">{t("services.sectionNumber")}</span>
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest mt-4">
              {t("services.heading")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="card text-center"
              >
                <span className="section-number">0{num}</span>
                <h3 className="text-xl font-display uppercase tracking-widest mt-4 mb-4">
                  {t(`services.service${num}.title`)}
                </h3>
                <p className="text-muted text-sm">
                  {t(`services.service${num}.description`)}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${locale}/services`} className="btn-outline inline-flex items-center gap-2">
              {t("common.learnMore")}
              <Arrow size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest mb-8">
              {t("common.cta")}
            </h2>
            <Link href={`/${locale}/contact`} className="btn-solid inline-flex items-center gap-2">
              {t("common.getInTouch")}
              <Arrow size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
