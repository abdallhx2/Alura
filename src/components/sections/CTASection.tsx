"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { trackContactFormSubmission } from "@/components/analytics/GoogleAnalytics";

interface CTASectionProps {
    locale: string;
    isRTL: boolean;
    translations: {
        heading: string;
        subheading: string;
        namePlaceholder: string;
        emailPlaceholder: string;
        phonePlaceholder: string;
        messagePlaceholder: string;
        sendButton: string;
        sending?: string;
        success?: string;
        error?: string;
    };
}

export function CTASection({ translations, isRTL }: CTASectionProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                trackContactFormSubmission({ name: formData.name, email: formData.email });
                setFormData({ name: "", email: "", phone: "", message: "" });
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const getButtonText = () => {
        switch (status) {
            case "sending":
                return translations.sending || (isRTL ? "جارٍ الإرسال..." : "Sending...");
            case "success":
                return translations.success || (isRTL ? "تم الإرسال بنجاح!" : "Sent Successfully!");
            case "error":
                return translations.error || (isRTL ? "حدث خطأ" : "Error occurred");
            default:
                return translations.sendButton;
        }
    };

    const getButtonStyles = () => {
        switch (status) {
            case "success":
                return "bg-green-500 border-green-500 text-white";
            case "error":
                return "bg-red-500 border-red-500 text-white";
            default:
                return "bg-white text-black hover:bg-black hover:text-white border-white";
        }
    };

    return (
        <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(20, 20, 20)"
            gradientBackgroundEnd="rgb(0, 0, 0)"
            firstColor="50, 50, 50"
            secondColor="80, 80, 80"
            thirdColor="40, 40, 40"
            fourthColor="60, 60, 60"
            fifthColor="30, 30, 30"
            pointerColor="100, 100, 100"
            containerClassName="!h-auto py-20 md:py-32"
            interactive={false}
        >
            <section id="cta-section" className="relative z-50">
                <div className="container mx-auto px-6">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className={`font-display uppercase tracking-widest text-white leading-none mb-6 ${isRTL ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"}`}>
                        {translations.heading}
                    </h2>
                    <p className={`text-white/70 max-w-2xl mx-auto ${isRTL ? "text-base sm:text-lg md:text-xl" : "text-sm sm:text-base md:text-lg"}`}>
                        {translations.subheading}
                    </p>
                </motion.div>

                {/* Form - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={translations.namePlaceholder}
                                required
                                disabled={status === "sending"}
                                className="w-full bg-transparent border border-white/30 text-white px-6 py-4 focus:border-white outline-none transition-colors placeholder:text-white/40 text-base disabled:opacity-50"
                            />
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={translations.emailPlaceholder}
                                required
                                disabled={status === "sending"}
                                className="w-full bg-transparent border border-white/30 text-white px-6 py-4 focus:border-white outline-none transition-colors placeholder:text-white/40 text-base disabled:opacity-50"
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder={translations.phonePlaceholder}
                                disabled={status === "sending"}
                                className="w-full bg-transparent border border-white/30 text-white px-6 py-4 focus:border-white outline-none transition-colors placeholder:text-white/40 text-base disabled:opacity-50"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={translations.messagePlaceholder}
                                required
                                disabled={status === "sending"}
                                rows={6}
                                className="w-full bg-transparent border border-white/30 text-white px-6 py-4 focus:border-white outline-none transition-colors placeholder:text-white/40 resize-none text-base disabled:opacity-50"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={`px-12 py-4 font-display uppercase tracking-widest border transition-all duration-300 text-sm disabled:cursor-not-allowed ${getButtonStyles()}`}
                            >
                                {getButtonText()}
                            </button>
                        </div>
                    </form>
                </motion.div>
                </div>
            </section>
        </BackgroundGradientAnimation>
    );
}
