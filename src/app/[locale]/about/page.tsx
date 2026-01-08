"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, Sparkles } from "lucide-react";
import Counter from "@/components/ui/Counter";

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
      {/* Refactored Hero Section with Integrated Stats */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col md:block">
        {/* Background Image - Full Screen */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-bw.png"
            alt="About Aloura"
            fill
            className="object-cover object-center grayscale brightness-50 md:brightness-[0.4]"
            priority
          />
        </div>

        {/* Content Container - Split Layout on Desktop */}
        <div className="relative z-10 w-full md:w-1/2 lg:w-5/12 min-h-screen bg-black/80 md:bg-black/85 backdrop-blur-sm md:backdrop-blur-none flex flex-col justify-center px-8 py-20 md:px-16 lg:px-20 ltr:border-r rtl:border-l border-white/10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                },
              },
            }}
            className="flex flex-col h-full justify-center"
          >
            {/* Header */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, x: isRTL ? 30 : -30 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-widest mb-10 text-white leading-tight"
            >
              {t("about.heading")}
            </motion.h1>

            {/* Content Paragraphs */}
            <div className="space-y-6 text-white/80 text-base md:text-lg leading-relaxed font-light mb-16">
              {[t("about.content"), t("about.content2"), t("about.content3")].map(
                (text, idx) => (
                  <motion.p
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: "easeOut" },
                      },
                    }}
                  >
                    {text}
                  </motion.p>
                )
              )}
            </div>

            {/* Stats Grid - Integrated */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="grid grid-cols-3 gap-6 border-t border-white/20 pt-10"
            >
              <div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-display mb-2 text-white flex items-center">
                  <Counter value={7} />
                  <span>+</span>
                </div>
                <p className="text-white/50 uppercase tracking-[0.2em] text-[10px] md:text-xs">
                  {t("about.stats.years")}
                </p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-display mb-2 text-white flex items-center">
                  <Counter value={50} />
                  <span>+</span>
                </div>
                <p className="text-white/50 uppercase tracking-[0.2em] text-[10px] md:text-xs">
                  {t("about.stats.projects")}
                </p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-display mb-2 text-white flex items-center">
                  <Counter value={100} />
                  <span>%</span>
                </div>
                <p className="text-white/50 uppercase tracking-[0.2em] text-[10px] md:text-xs">
                  {t("about.stats.satisfaction")}
                </p>
              </div>
            </motion.div>
          </motion.div>
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
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest mt-4 mb-8">
              {t("about.founderSection.title")}
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">
              {t("about.founderSection.content1")}
            </p>
            <p className="text-white/80 leading-relaxed">
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
              className="bg-foreground/5 p-8 rounded-none border border-foreground/10 hover:border-foreground/30 transition-all duration-300"
            >
              <value.icon size={48} className="mx-auto mb-6 text-foreground" />
              <h3 className="text-xl font-display uppercase tracking-widest mb-4">
                {value.title}
              </h3>
              <p className="text-white/80 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
