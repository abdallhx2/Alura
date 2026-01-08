"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MeshGradient } from "@/components/ui/MeshGradient";

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
    };
}

export function CTASection({ translations }: CTASectionProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Mesh Gradient Background */}
            <MeshGradient color="#333333" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-widest text-white leading-none mb-6">
                        {translations.heading}
                    </h2>
                    <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
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
                                className="w-full bg-transparent border border-white/30 text-white px-6 py-4 focus:border-white outline-none transition-colors placeholder:text-white/40 text-base"
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
                                className="w-full bg-transparent border border-white/30 text-white px-6 py-4 focus:border-white outline-none transition-colors placeholder:text-white/40 text-base"
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder={translations.phonePlaceholder}
                                className="w-full bg-transparent border border-white/30 text-white px-6 py-4 focus:border-white outline-none transition-colors placeholder:text-white/40 text-base"
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
                                rows={6}
                                className="w-full bg-transparent border border-white/30 text-white px-6 py-4 focus:border-white outline-none transition-colors placeholder:text-white/40 resize-none text-base"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-12 py-4 bg-white text-black font-display uppercase tracking-widest hover:bg-black hover:text-white border border-white transition-all duration-300 text-sm"
                            >
                                {translations.sendButton}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
