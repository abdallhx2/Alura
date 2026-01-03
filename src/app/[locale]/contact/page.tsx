"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Instagram, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.info.emailLabel"),
      value: t("contact.info.email"),
      href: "mailto:info@aloura.agency",
    },
    {
      icon: MapPin,
      label: t("contact.info.locationLabel"),
      value: t("contact.info.location"),
      href: null,
    },
    {
      icon: Instagram,
      label: t("contact.info.instagramLabel"),
      value: "@aloura_co",
      href: "https://instagram.com/aloura_co",
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
          <span className="section-number">{t("contact.sectionNumber")}</span>
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest mt-4 mb-8">
            {t("contact.heading")}
          </h1>
          <p className="text-muted text-lg">{t("contact.description")}</p>
        </motion.div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-widest mb-2">
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border border-muted/50 px-4 py-3 focus:border-foreground outline-none transition-colors"
                  disabled={status === "loading"}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm uppercase tracking-widest mb-2">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border border-muted/50 px-4 py-3 focus:border-foreground outline-none transition-colors"
                  disabled={status === "loading"}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-widest mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border border-muted/50 px-4 py-3 focus:border-foreground outline-none transition-colors resize-none"
                  disabled={status === "loading"}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-solid w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t("contact.form.sending")}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t("contact.form.submit")}
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="text-green-500 text-center">{t("contact.form.success")}</p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-center">{t("contact.form.error")}</p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-display uppercase tracking-widest mb-8">
                {t("contact.info.social")}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <info.icon size={24} className="text-muted flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm uppercase tracking-widest text-muted mb-1">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map or Additional Content */}
            <div className="bg-foreground/5 p-8 mt-8">
              <h3 className="text-lg font-display uppercase tracking-widest mb-4">
                {t("contact.workingHours.title")}
              </h3>
              <div className="space-y-2 text-muted">
                <p>{t("contact.workingHours.weekdays")}</p>
                <p>{t("contact.workingHours.weekends")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
