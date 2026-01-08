"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

import { LiquidButton } from "@/components/ui/LiquidButton";
import { StackingCards, CardItem } from "@/components/ui/StackingCards";
import ScrollTextMarquee from "@/components/ui/ScrollTextMarquee";
import { Marquee } from "@/components/ui/Marquee";
import { CTASection } from "@/components/sections/CTASection";
import Counter from "@/components/ui/Counter";

export default function HomePage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const stackingItems: CardItem[] = [
    {
      title: t("services.service1.title"),
      description: t("services.service1.description"),
      image: "/images/web-pic/11.jpg",
    },
    {
      title: t("services.service2.title"),
      description: t("services.service2.description"),
      image: "/images/web-pic/22.jpg",
    },
    {
      title: t("services.service3.title"),
      description: t("services.service3.description"),
      image: "/images/web-pic/44.jpg",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: t("about.testimonials.items.0.name"),
      role: t("about.testimonials.items.0.role"),
      content: t("about.testimonials.items.0.content"),
    },
    {
      name: t("about.testimonials.items.1.name"),
      role: t("about.testimonials.items.1.role"),
      content: t("about.testimonials.items.1.content"),
    },
    {
      name: t("about.testimonials.items.2.name"),
      role: t("about.testimonials.items.2.role"),
      content: t("about.testimonials.items.2.content"),
    },
    {
      name: t("about.testimonials.items.3.name"),
      role: t("about.testimonials.items.3.role"),
      content: t("about.testimonials.items.3.content"),
    },
  ];


  return (
    <>
      {/* Hero Section */}
      <section className="h-screen w-full relative overflow-hidden bg-black text-white">
        {/* Background Video - Full Screen */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center grayscale brightness-125"
            onTimeUpdate={(e) => {
              if (e.currentTarget.currentTime >= 7) {
                e.currentTarget.currentTime = 0;
              }
            }}
          >
            <source src="/images/vid.mp4" type="video/mp4" />
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content - Centered */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl"
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/80 mb-8 font-bold py-1 px-3 inline-block">
              {t("hero.subtitle")}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-widest mb-10 text-white drop-shadow-sm leading-none">
              {t("hero.title")}
            </h1>
            <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
              <LiquidButton href={`/${locale}/contact`} className="h-14 w-48 sm:h-16 sm:w-56 md:h-20 md:w-64 text-lg">
                {t("common.getInTouch")}
              </LiquidButton>
            </div>
          </motion.div>
        </div>

      </section>

      <div className="py-4 md:py-6 border-y-4 border-white">
        <ScrollTextMarquee className="text-4xl sm:text-5xl md:text-7xl font-display uppercase tracking-widest text-white leading-none opacity-90 transition-opacity hover:opacity-100">
          {t("marquee.services")}
        </ScrollTextMarquee>
      </div>

      {/* About Preview Section - New Layout */}
      <section className="bg-black">
        {/* Row 1: Text Content - Full Width */}
        <div className="container mx-auto px-6 py-12 sm:py-16 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={isRTL ? "text-right" : "text-left"}
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-widest mb-8 sm:mb-12 text-white leading-none">
              {t("about.heading")}
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed mb-8 sm:mb-12 text-base sm:text-lg md:text-xl max-w-5xl">
              <p>{t("about.content")}</p>
              <p>{t("about.content2")}</p>
              <p>{t("about.content3")}</p>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 border-t border-white/20 pt-8 sm:pt-10 max-w-3xl"
            >
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display mb-1 sm:mb-2 text-white flex items-center">
                  <Counter value={7} />
                  <span>+</span>
                </div>
                <p className="text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-[10px] md:text-xs leading-tight">
                  {t("about.stats.years")}
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display mb-1 sm:mb-2 text-white flex items-center">
                  <Counter value={50} />
                  <span>+</span>
                </div>
                <p className="text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-[10px] md:text-xs leading-tight">
                  {t("about.stats.projects")}
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display mb-1 sm:mb-2 text-white flex items-center">
                  <Counter value={100} />
                  <span>%</span>
                </div>
                <p className="text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-[10px] md:text-xs leading-tight">
                  {t("about.stats.satisfaction")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Row 2: Two Columns - Testimonials + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[400px] sm:h-[500px] lg:h-[600px]">
          {/* Testimonials */}
          <div className={`bg-black p-4 sm:p-6 lg:p-8 flex items-center ${isRTL ? "order-1 lg:border-s" : "order-2 lg:order-1 lg:border-e"} border-white/10`}>
            <div className="flex gap-3 sm:gap-4 w-full h-[350px] sm:h-[450px] lg:h-[550px] overflow-hidden">
              <div className="flex-1">
                <Marquee vertical className="h-full [--duration:20s] [--gap:1rem]">
                  {testimonials.map((item, i) => (
                    <div
                      key={i}
                      className="bg-black border border-white p-3 sm:p-4 lg:p-5 mb-3 sm:mb-4 hover:bg-white transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center text-xs sm:text-sm font-medium group-hover:bg-black group-hover:text-white border border-white group-hover:border-black transition-colors duration-300">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-xs sm:text-sm font-medium group-hover:text-black transition-colors duration-300">{item.name}</p>
                          <p className="text-white/60 text-[10px] sm:text-xs group-hover:text-black/60 transition-colors duration-300">{item.role}</p>
                        </div>
                      </div>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed group-hover:text-black/80 transition-colors duration-300">&ldquo;{item.content}&rdquo;</p>
                    </div>
                  ))}
                </Marquee>
              </div>
              <div className="flex-1">
                <Marquee vertical reverse className="h-full [--duration:25s] [--gap:1rem]">
                  {[...testimonials].reverse().map((item, i) => (
                    <div
                      key={i}
                      className="bg-black border border-white p-3 sm:p-4 lg:p-5 mb-3 sm:mb-4 hover:bg-white transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center text-xs sm:text-sm font-medium group-hover:bg-black group-hover:text-white border border-white group-hover:border-black transition-colors duration-300">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-xs sm:text-sm font-medium group-hover:text-black transition-colors duration-300">{item.name}</p>
                          <p className="text-white/60 text-[10px] sm:text-xs group-hover:text-black/60 transition-colors duration-300">{item.role}</p>
                        </div>
                      </div>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed group-hover:text-black/80 transition-colors duration-300">&ldquo;{item.content}&rdquo;</p>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`relative ${isRTL ? "order-2" : "order-1 lg:order-2"}`}>
            <Image
              src="/images/hero-bw.png"
              alt={isRTL ? "فريق ألورا يعمل على مشروع إبداعي في الاستوديو" : "ALOURA team working on creative project in studio"}
              fill
              className="object-cover grayscale brightness-50"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Section - Header */}
      <section className="bg-black">
        <div className="container mx-auto px-6 text-center pt-20 md:pt-32 lg:pt-40 pb-8 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-widest text-white mb-4 sm:mb-5 md:mb-6 leading-none">
              {t("services.heading")}
            </h2>
            <p className="text-white/70 max-w-3xl text-base sm:text-lg md:text-xl">
              {t("services.description")}
            </p>
          </motion.div>
        </div>

        {/* Stacking Cards */}
        <StackingCards items={stackingItems} isRTL={isRTL} />
      </section>

      <div className="py-3 md:py-4 border-y-4 border-white">
        <ScrollTextMarquee
          baseVelocity={2}
          className="text-4xl sm:text-5xl md:text-7xl font-display uppercase tracking-widest text-white leading-none opacity-90"
        >
          {t("marquee.tagline")}
        </ScrollTextMarquee>
      </div>

      <CTASection
        locale={locale}
        isRTL={isRTL}
        translations={{
          heading: t("common.cta"),
          subheading: t("common.ctaSubheading") || t("contact.description"),
          namePlaceholder: t("contact.form.name"),
          emailPlaceholder: t("contact.form.email"),
          phonePlaceholder: t("contact.form.phone") || "Phone / الهاتف",
          messagePlaceholder: t("contact.form.message"),
          sendButton: t("contact.form.submit"),
        }}
      />
    </>
  );
}
