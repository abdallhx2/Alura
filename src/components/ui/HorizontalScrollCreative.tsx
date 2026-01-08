'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface HorizontalScrollItem {
  src: string;
  alt: string;
  title?: string;
}

interface HorizontalScrollCreativeProps {
  items: HorizontalScrollItem[];
  isRTL?: boolean;
  className?: string;
  itemClassName?: string;
  sectionHeight?: string;
}

export function HorizontalScrollCreative({
  items,
  isRTL = false,
  className = '',
  itemClassName = 'w-[300px] h-[400px] md:w-[400px] md:h-[500px]',
  sectionHeight = '300vh',
}: HorizontalScrollCreativeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Calculate carousel width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        const width = carouselRef.current.scrollWidth - window.innerWidth + 100;
        setCarouselWidth(Math.max(0, width));
      }
    };

    updateWidth();

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateWidth, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [items]);

  // Map scroll progress to horizontal translation
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isRTL ? [-carouselWidth, 0] : [0, -carouselWidth]
  );

  return (
    <>
      {/* Desktop: Horizontal Scroll */}
      <section
        ref={sectionRef}
        className={`relative hidden lg:block ${className}`}
        style={{ height: sectionHeight }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div
            ref={carouselRef}
            className={`flex gap-6 md:gap-8 px-8 md:px-16 ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ x }}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                className={`relative flex-shrink-0 overflow-hidden group ${itemClassName}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 300px, 400px"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                {/* Title */}
                {item.title && (
                  <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-white text-sm uppercase tracking-[0.25em] font-display opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {item.title}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile/Tablet: Vertical Grid */}
      <section className={`lg:hidden py-16 ${className}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative aspect-[3/4] overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  sizes="50vw"
                />
                {/* Title */}
                {item.title && (
                  <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-white text-xs uppercase tracking-widest font-display">
                      {item.title}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HorizontalScrollCreative;
