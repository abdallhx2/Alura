"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

import { ReactLenis } from "lenis/react";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { StackingCards, CardItem } from "@/components/ui/StackingCards";
import ScrollTextMarquee from "@/components/ui/ScrollTextMarquee";
import { Marquee } from "@/components/ui/Marquee";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
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
      image: "/images/web-pic/creative-direction.png",
    },
    {
      title: t("services.service2.title"),
      description: t("services.service2.description"),
      image: "/images/web-pic/content-creation.png",
    },
    {
      title: t("services.service3.title"),
      description: t("services.service3.description"),
      image: "/images/web-pic/44.jpg",
    },
  ];

  const testimonials = [
    { name: t("about.testimonials.items.0.name"), role: t("about.testimonials.items.0.role"), content: t("about.testimonials.items.0.content") },
    { name: t("about.testimonials.items.1.name"), role: t("about.testimonials.items.1.role"), content: t("about.testimonials.items.1.content") },
    { name: t("about.testimonials.items.2.name"), role: t("about.testimonials.items.2.role"), content: t("about.testimonials.items.2.content") },
    { name: t("about.testimonials.items.3.name"), role: t("about.testimonials.items.3.role"), content: t("about.testimonials.items.3.content") },
    { name: t("about.testimonials.items.4.name"), role: t("about.testimonials.items.4.role"), content: t("about.testimonials.items.4.content") },
    { name: t("about.testimonials.items.5.name"), role: t("about.testimonials.items.5.role"), content: t("about.testimonials.items.5.content") },
    { name: t("about.testimonials.items.6.name"), role: t("about.testimonials.items.6.role"), content: t("about.testimonials.items.6.content") },
    { name: t("about.testimonials.items.7.name"), role: t("about.testimonials.items.7.role"), content: t("about.testimonials.items.7.content") },
    { name: t("about.testimonials.items.8.name"), role: t("about.testimonials.items.8.role"), content: t("about.testimonials.items.8.content") },
    { name: t("about.testimonials.items.9.name"), role: t("about.testimonials.items.9.role"), content: t("about.testimonials.items.9.content") },
    { name: t("about.testimonials.items.10.name"), role: t("about.testimonials.items.10.role"), content: t("about.testimonials.items.10.content") },
    { name: t("about.testimonials.items.11.name"), role: t("about.testimonials.items.11.role"), content: t("about.testimonials.items.11.content") },
    { name: t("about.testimonials.items.12.name"), role: t("about.testimonials.items.12.role"), content: t("about.testimonials.items.12.content") },
    { name: t("about.testimonials.items.13.name"), role: t("about.testimonials.items.13.role"), content: t("about.testimonials.items.13.content") },
  ];

  return (
    <ReactLenis root>
      <main>
        <article>
          {/* Hero Section - Sticky */}
          <section className="h-screen w-full relative overflow-hidden bg-black text-white sticky top-0">
            <div className="absolute inset-0 z-0">
              <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover object-center">
                <source src="/images/vid-landscape.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-6xl">
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/80 mb-8 font-bold py-1 px-3 inline-block">
                  {t("hero.subtitle")}
                </p>
                <h1 className={`font-display uppercase tracking-widest mb-10 text-white drop-shadow-sm leading-none ${isRTL ? "text-5xl md:text-7xl lg:text-8xl" : "text-4xl md:text-6xl lg:text-7xl"}`}>
                  {t("hero.title")}
                </h1>
                <p className={`text-white/90 max-w-3xl mx-auto mb-16 font-medium leading-relaxed ${isRTL ? "text-base md:text-xl" : "text-sm md:text-lg"}`}>
                  {t("hero.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                  <LiquidButton scrollTo="cta-section" className="h-14 w-48 sm:h-16 sm:w-56 md:h-20 md:w-64 text-lg">
                    {t("common.getInTouch")}
                  </LiquidButton>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Content Section - Slides over Hero */}
          <section className="bg-black rounded-t-3xl relative z-10">
            {/* Marquee */}
            <div className="py-4 md:py-6 border-y-4 border-white">
              <ScrollTextMarquee className="text-2xl sm:text-3xl md:text-5xl font-display uppercase tracking-widest text-white leading-none opacity-90 transition-opacity hover:opacity-100">
                {t("marquee.services")}
              </ScrollTextMarquee>
            </div>

            {/* About Section - Split Layout: White (Content) + Black (Image) */}
            <div className={`flex flex-col lg:flex-row ${isRTL ? "lg:flex-row-reverse" : ""}`}>
              {/* Content Side - 60% width on desktop */}
              <div className="w-full lg:w-3/5 bg-white py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className={isRTL ? "text-right" : "text-left"}>
                  <h2 className={`font-display uppercase tracking-widest text-black mb-6 md:mb-8 leading-none ${isRTL ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"}`}>
                    {t("about.heading")}
                  </h2>
                  <div className={`space-y-4 md:space-y-5 text-black/70 leading-relaxed mb-10 md:mb-12 ${isRTL ? "text-base sm:text-lg md:text-xl" : "text-sm sm:text-base md:text-lg"}`}>
                    <p>{t("about.content")}</p>
                    <p>{t("about.content2")}</p>
                    <p>{t("about.content3")}</p>
                  </div>

                  {/* Stats Grid */}
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="grid grid-cols-3 gap-6 md:gap-8 lg:gap-10 border-t border-black/10 pt-8 md:pt-10">
                    <div>
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display mb-2 text-black flex items-center">
                        <Counter value={7} /><span>+</span>
                      </div>
                      <p className={`text-black/50 uppercase tracking-wider leading-tight ${isRTL ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"}`}>{t("about.stats.years")}</p>
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display mb-2 text-black flex items-center">
                        <Counter value={50} /><span>+</span>
                      </div>
                      <p className={`text-black/50 uppercase tracking-wider leading-tight ${isRTL ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"}`}>{t("about.stats.projects")}</p>
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display mb-2 text-black flex items-center">
                        <Counter value={100} /><span>%</span>
                      </div>
                      <p className={`text-black/50 uppercase tracking-wider leading-tight ${isRTL ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"}`}>{t("about.stats.satisfaction")}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Image Side - 40% width on desktop */}
              <div className="w-full lg:w-2/5 bg-black relative min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]">
                <Image
                  src="/images/hero-bw.png"
                  alt="ALOURA Creative House"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>

            {/* Services Section */}
            <div className="container mx-auto px-6 text-center pt-20 md:pt-32 lg:pt-40 pb-8 md:pb-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center">
                <h2 className={`font-display uppercase tracking-widest text-white mb-4 sm:mb-5 md:mb-6 leading-none ${isRTL ? "text-4xl sm:text-6xl md:text-7xl" : "text-3xl sm:text-5xl md:text-6xl"}`}>
                  {t("services.heading")}
                </h2>
                <p className={`text-white/70 max-w-3xl ${isRTL ? "text-base sm:text-lg md:text-xl" : "text-sm sm:text-base md:text-lg"}`}>
                  {t("services.description")}
                </p>
              </motion.div>
            </div>

            <StackingCards items={stackingItems} isRTL={isRTL} />

            {/* Testimonials Section */}
            <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
              <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12 md:mb-16"
                >
                  <h2 className={`font-display uppercase tracking-widest text-white mb-4 md:mb-6 leading-none ${isRTL ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"}`}>
                    {t("about.testimonials.title")}
                  </h2>
                </motion.div>

                {/* Mobile & Tablet: Single Column */}
                <div className="block lg:hidden max-w-2xl mx-auto">
                  <Marquee vertical className="h-[400px] sm:h-[450px] [--duration:30s] [--gap:1rem]">
                    {testimonials.map((item, i) => (
                      <motion.div key={i} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }} className="group relative overflow-hidden backdrop-blur-sm bg-white/[0.03] border border-white/10 p-5 sm:p-6 mb-4 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                        <div className="absolute -inset-px bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute top-4 right-4 text-4xl font-serif text-white/5 group-hover:text-white/10 transition-colors duration-300 pointer-events-none">&rdquo;</div>
                        <div className="relative z-10">
                          <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur border border-white/10 text-white/90 flex items-center justify-center text-base font-semibold">
                              {item.name.charAt(0)}
                            </div>
                            <div className={isRTL ? "text-right" : "text-left"}>
                              <p className={`text-white/90 font-medium tracking-wide ${isRTL ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}>{item.name}</p>
                              <p className={`text-white/40 uppercase tracking-wider ${isRTL ? "text-xs sm:text-sm" : "text-xs"}`}>{item.role}</p>
                            </div>
                          </div>
                          <div className="w-10 h-px bg-gradient-to-r from-white/20 to-transparent mb-4" />
                          <p className={`text-white/60 leading-relaxed ${isRTL ? "text-right text-base sm:text-lg" : "text-left text-sm sm:text-base"}`}>&ldquo;{item.content}&rdquo;</p>
                        </div>
                      </motion.div>
                    ))}
                  </Marquee>
                </div>

                {/* Desktop: Three Columns */}
                <div className="hidden lg:flex gap-6 max-w-6xl mx-auto">
                  <div className="flex-1">
                    <Marquee vertical className="h-[500px] xl:h-[550px] [--duration:22s] [--gap:1.25rem]">
                      {testimonials.slice(0, 5).map((item, i) => (
                        <motion.div key={i} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }} className="group relative overflow-hidden backdrop-blur-sm bg-white/[0.03] border border-white/10 p-6 mb-5 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                          <div className="absolute -inset-px bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />
                          <div className="absolute top-4 right-4 text-4xl font-serif text-white/5 group-hover:text-white/10 transition-colors duration-300 pointer-events-none">&rdquo;</div>
                          <div className="relative z-10">
                            <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur border border-white/10 text-white/90 flex items-center justify-center text-base font-semibold group-hover:from-white/25 group-hover:to-white/10 transition-all duration-300">
                                {item.name.charAt(0)}
                              </div>
                              <div className={isRTL ? "text-right" : "text-left"}>
                                <p className={`text-white/90 font-medium tracking-wide ${isRTL ? "text-base" : "text-sm"}`}>{item.name}</p>
                                <p className={`text-white/40 uppercase tracking-wider ${isRTL ? "text-sm" : "text-xs"}`}>{item.role}</p>
                              </div>
                            </div>
                            <div className="w-10 h-px bg-gradient-to-r from-white/20 to-transparent mb-4" />
                            <p className={`text-white/60 leading-relaxed ${isRTL ? "text-right text-base" : "text-left text-sm"}`}>&ldquo;{item.content}&rdquo;</p>
                          </div>
                        </motion.div>
                      ))}
                    </Marquee>
                  </div>
                  <div className="flex-1">
                    <Marquee vertical reverse className="h-[500px] xl:h-[550px] [--duration:26s] [--gap:1.25rem]">
                      {testimonials.slice(5, 10).map((item, i) => (
                        <motion.div key={i} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }} className="group relative overflow-hidden backdrop-blur-sm bg-white/[0.03] border border-white/10 p-6 mb-5 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                          <div className="absolute -inset-px bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />
                          <div className="absolute top-4 right-4 text-4xl font-serif text-white/5 group-hover:text-white/10 transition-colors duration-300 pointer-events-none">&rdquo;</div>
                          <div className="relative z-10">
                            <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur border border-white/10 text-white/90 flex items-center justify-center text-base font-semibold group-hover:from-white/25 group-hover:to-white/10 transition-all duration-300">
                                {item.name.charAt(0)}
                              </div>
                              <div className={isRTL ? "text-right" : "text-left"}>
                                <p className={`text-white/90 font-medium tracking-wide ${isRTL ? "text-base" : "text-sm"}`}>{item.name}</p>
                                <p className={`text-white/40 uppercase tracking-wider ${isRTL ? "text-sm" : "text-xs"}`}>{item.role}</p>
                              </div>
                            </div>
                            <div className="w-10 h-px bg-gradient-to-r from-white/20 to-transparent mb-4" />
                            <p className={`text-white/60 leading-relaxed ${isRTL ? "text-right text-base" : "text-left text-sm"}`}>&ldquo;{item.content}&rdquo;</p>
                          </div>
                        </motion.div>
                      ))}
                    </Marquee>
                  </div>
                  <div className="flex-1">
                    <Marquee vertical className="h-[500px] xl:h-[550px] [--duration:24s] [--gap:1.25rem]">
                      {testimonials.slice(10).map((item, i) => (
                        <motion.div key={i} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }} className="group relative overflow-hidden backdrop-blur-sm bg-white/[0.03] border border-white/10 p-6 mb-5 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                          <div className="absolute -inset-px bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />
                          <div className="absolute top-4 right-4 text-4xl font-serif text-white/5 group-hover:text-white/10 transition-colors duration-300 pointer-events-none">&rdquo;</div>
                          <div className="relative z-10">
                            <div className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur border border-white/10 text-white/90 flex items-center justify-center text-base font-semibold group-hover:from-white/25 group-hover:to-white/10 transition-all duration-300">
                                {item.name.charAt(0)}
                              </div>
                              <div className={isRTL ? "text-right" : "text-left"}>
                                <p className={`text-white/90 font-medium tracking-wide ${isRTL ? "text-base" : "text-sm"}`}>{item.name}</p>
                                <p className={`text-white/40 uppercase tracking-wider ${isRTL ? "text-sm" : "text-xs"}`}>{item.role}</p>
                              </div>
                            </div>
                            <div className="w-10 h-px bg-gradient-to-r from-white/20 to-transparent mb-4" />
                            <p className={`text-white/60 leading-relaxed ${isRTL ? "text-right text-base" : "text-left text-sm"}`}>&ldquo;{item.content}&rdquo;</p>
                          </div>
                        </motion.div>
                      ))}
                    </Marquee>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <FAQSection
              title={t("faq.title")}
              subtitle={t("faq.subtitle")}
              items={[
                { question: t("faq.items.0.question"), answer: t("faq.items.0.answer") },
                { question: t("faq.items.1.question"), answer: t("faq.items.1.answer") },
                { question: t("faq.items.2.question"), answer: t("faq.items.2.answer") },
                { question: t("faq.items.3.question"), answer: t("faq.items.3.answer") },
                { question: t("faq.items.4.question"), answer: t("faq.items.4.answer") },
                { question: t("faq.items.5.question"), answer: t("faq.items.5.answer") },
              ]}
              isRTL={isRTL}
            />

            {/* Second Marquee */}
            <div className="py-3 md:py-4 border-y-4 border-white">
              <ScrollTextMarquee baseVelocity={2} className="text-2xl sm:text-3xl md:text-5xl font-display uppercase tracking-widest text-white leading-none opacity-90">
                {t("marquee.tagline")}
              </ScrollTextMarquee>
            </div>

            {/* CTA Section */}
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
                sending: t("contact.form.sending"),
                success: t("contact.form.success"),
                error: t("contact.form.error"),
              }}
            />
          </section>
        </article>
      </main>
    </ReactLenis>
  );
}
