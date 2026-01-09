"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  items: FAQItem[];
  isRTL?: boolean;
}

export function FAQSection({ title, subtitle, items, isRTL = false }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className={`font-display uppercase tracking-widest text-white mb-4 md:mb-6 leading-none ${isRTL ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-white/60 max-w-2xl mx-auto ${isRTL ? "text-base sm:text-lg md:text-xl" : "text-sm sm:text-base md:text-lg"}`}>
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-b border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full py-6 md:py-8 flex items-center justify-between gap-4 group ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}
              >
                <span className={`text-white/90 font-medium group-hover:text-white transition-colors duration-300 ${isRTL ? "text-lg sm:text-xl md:text-2xl" : "text-base sm:text-lg md:text-xl"}`}>
                  {item.question}
                </span>
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 border border-white/20 rounded-full group-hover:border-white/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white/60 group-hover:text-white transition-colors duration-300 text-xl sm:text-2xl font-light select-none">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className={`pb-6 md:pb-8 text-white/60 leading-relaxed max-w-3xl ${isRTL ? "text-right text-base sm:text-lg" : "text-left text-sm sm:text-base"}`}>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
