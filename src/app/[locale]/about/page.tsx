"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, Sparkles } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const values = [
    {
      icon: Sparkles,
      title: t("about.values.creativity.title"),
      description: t("about.values.creativity.description"),
    },
    {
      icon: Award,
      title: t("about.values.quality.title"),
      description: t("about.values.quality.description"),
    },
    {
      icon: Users,
      title: t("about.values.partnership.title"),
      description: t("about.values.partnership.description"),
    },
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-number">{t("about.sectionNumber")}</span>
            <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest mt-4 mb-8">
              {t("about.heading")}
            </h1>
            <p className="text-muted leading-relaxed mb-6">{t("about.content")}</p>
            <p className="text-muted leading-relaxed mb-6">{t("about.content2")}</p>
            <p className="text-muted leading-relaxed">{t("about.content3")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5]"
          >
            <Image
              src="/images/web-pic/3.png"
              alt="About ALOURA"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-foreground/5 py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-5xl md:text-7xl font-display mb-4">7+</p>
              <p className="text-muted uppercase tracking-widest text-sm">
                {t("about.stats.years")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-5xl md:text-7xl font-display mb-4">50+</p>
              <p className="text-muted uppercase tracking-widest text-sm">
                {t("about.stats.projects")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-5xl md:text-7xl font-display mb-4">100%</p>
              <p className="text-muted uppercase tracking-widest text-sm">
                {t("about.stats.satisfaction")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square order-2 lg:order-1"
          >
            <Image
              src="/images/web-pic/4.png"
              alt="Lamia Al-Hassani"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="section-number">
              {t("about.founderSection.sectionNumber")}
            </span>
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest mt-4 mb-8">
              {t("about.founderSection.title")}
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              {t("about.founderSection.content1")}
            </p>
            <p className="text-muted leading-relaxed">
              {t("about.founderSection.content2")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-number">{t("about.values.sectionNumber")}</span>
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest mt-4">
            {t("about.values.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card text-center"
            >
              <value.icon size={40} className="mx-auto mb-6 text-muted" />
              <h3 className="text-xl font-display uppercase tracking-widest mb-4">
                {value.title}
              </h3>
              <p className="text-muted text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
