"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { X, Play } from "lucide-react";

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const images = [
    { src: "/images/our-work/1.png", number: "01" },
    { src: "/images/our-work/2.png", number: "02" },
    { src: "/images/our-work/3.png", number: "03" },
    { src: "/images/our-work/4.png", number: "04" },
    { src: "/images/our-work/5.png", number: "05" },
    { src: "/images/our-work/6.png", number: "06" },
    { src: "/images/our-work/7.png", number: "07" },
  ];

  const videos = [
    { src: "/videos/our-work/1.mp4", thumbnail: "/images/our-work/1.png", number: "01" },
    { src: "/videos/our-work/2.mp4", thumbnail: "/images/our-work/2.png", number: "02" },
    { src: "/videos/our-work/3.mp4", thumbnail: "/images/our-work/3.png", number: "03" },
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
          <span className="section-number">{t("sectionNumber")}</span>
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-widest mt-4 mb-8">
            {t("heading")}
          </h1>
          <p className="text-muted text-lg">
            {t("description")}
          </p>
        </motion.div>
      </section>

      {/* Video Work Section */}
      <section className="container mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="section-number">01</span>
          <h2 className="text-2xl md:text-4xl font-display uppercase tracking-widest mt-4">
            {t("videoWork")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative aspect-[9/16] cursor-pointer group"
              onClick={() => setSelectedVideo(video.src)}
            >
              <Image
                src={video.thumbnail}
                alt={`Video ${video.number}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center">
                  <Play size={32} className="text-foreground ml-1" />
                </div>
              </div>
              <span className="absolute bottom-4 left-4 section-number">
                {video.number}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Media Posts Section */}
      <section className="bg-foreground/5 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="section-number">02</span>
            <h2 className="text-2xl md:text-4xl font-display uppercase tracking-widest mt-4">
              {t("socialPosts")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative aspect-square cursor-pointer group overflow-hidden"
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={`Work ${image.number}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-2xl font-display">{image.number}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Feeds Section */}
      <section className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="section-number">03</span>
          <h2 className="text-2xl md:text-4xl font-display uppercase tracking-widest mt-4">
            {t("exampleFeeds")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[...images, ...images.slice(0, 5)].map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-square"
            >
              <Image
                src={image.src}
                alt={`Feed ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Selected work"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Video Lightbox */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 hover:text-accent transition-colors z-10"
            onClick={() => setSelectedVideo(null)}
          >
            <X size={32} />
          </button>
          <div className="relative max-w-2xl w-full">
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
