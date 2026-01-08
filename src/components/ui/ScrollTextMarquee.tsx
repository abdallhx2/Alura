"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ScrollTextMarqueeProps {
  children: string;
  baseVelocity?: number;
  className?: string;
}

function ParallaxText({
  children,
  baseVelocity = -2,
  className,
}: ScrollTextMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div
        className={`flex whitespace-nowrap flex-nowrap ${className || ""}`}
        style={{ x }}
      >
        <span className="block">{children} <span className="mx-4 md:mx-8">•</span></span>
        <span className="block">{children} <span className="mx-4 md:mx-8">•</span></span>
        <span className="block">{children} <span className="mx-4 md:mx-8">•</span></span>
        <span className="block">{children} <span className="mx-4 md:mx-8">•</span></span>
      </motion.div>
    </div>
  );
}

export default function ScrollTextMarquee({
  children,
  baseVelocity = -2,
  className,
}: ScrollTextMarqueeProps) {
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr", unicodeBidi: "isolate" }}
      className="w-full overflow-hidden whitespace-nowrap"
    >
      <ParallaxText baseVelocity={baseVelocity} className={className}>
        {children}
      </ParallaxText>
    </div>
  );
}
