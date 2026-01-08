'use client';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export interface CardItem {
  title: string;
  description: string;
  image: string;
  link?: string;
  linkText?: string;
}

interface StackingCardsProps {
  items: CardItem[];
  isRTL?: boolean;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  linkText?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  isRTL?: boolean;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  image,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  // More dramatic parallax effect - image zooms from 1.5 to 1
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  // Y movement for depth effect
  const imageY = useTransform(scrollYProgress, [0, 1], ['15%', '0%']);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative -top-[10%] md:-top-[25%] h-[70vh] md:h-[80vh] w-full md:w-[90%] lg:w-[80%] overflow-hidden origin-top border border-white/10"
      >
        {/* Full Background Image with parallax */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            fill
            src={image}
            alt={title}
            className="object-cover grayscale brightness-110"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Content at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          {/* Title */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-7xl uppercase tracking-widest text-white mb-6 md:mb-10 leading-none">
            {title}
          </h2>

          {/* Separator Line */}
          <div className="w-16 md:w-32 h-[3px] bg-white/60 mb-6 md:mb-10" />

          {/* Description */}
          <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const StackingCards: React.FC<StackingCardsProps> = ({ items, isRTL = false }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={container}
      className="relative w-full"
      style={{ height: `${items.length * 100}vh` }}
    >
      {items.map((item, i) => {
        const targetScale = 1 - (items.length - i) * 0.05;
        return (
          <Card
            key={`card_${i}`}
            i={i}
            title={item.title}
            description={item.description}
            image={item.image}
            link={item.link}
            linkText={item.linkText}
            progress={scrollYProgress}
            range={[i * (1 / items.length), 1]}
            targetScale={targetScale}
            isRTL={isRTL}
          />
        );
      })}
    </div>
  );
};

export default StackingCards;
