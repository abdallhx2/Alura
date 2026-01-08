'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface MouseTrailItem {
  src: string;
  alt: string;
}

interface TrailImage {
  id: number;
  x: number;
  y: number;
  imageIndex: number;
  status: 'active' | 'inactive';
}

interface ImageMouseTrailProps {
  items: MouseTrailItem[];
  children?: React.ReactNode;
  className?: string;
  imgClass?: string;
  distance?: number;
  maxNumberOfImages?: number;
  fadeAnimation?: boolean;
}

export function ImageMouseTrail({
  items,
  children,
  className = '',
  imgClass = 'w-40 h-48',
  distance = 25,
  maxNumberOfImages = 5,
  fadeAnimation = true,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const lastPosition = useRef({ x: 0, y: 0 });
  const imageIndexRef = useRef(0);
  const idCounterRef = useRef(0);
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const getDistance = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distanceMoved = getDistance(x, y, lastPosition.current.x, lastPosition.current.y);

    if (distanceMoved >= distance) {
      lastPosition.current = { x, y };

      const newId = idCounterRef.current++;
      const currentImageIndex = imageIndexRef.current;
      imageIndexRef.current = (imageIndexRef.current + 1) % items.length;

      const newImage: TrailImage = {
        id: newId,
        x: x - 80, // Center the image
        y: y - 96,
        imageIndex: currentImageIndex,
        status: 'active',
      };

      setTrail((prev) => {
        const newTrail = [...prev, newImage];
        // Remove oldest images if exceeding max
        if (newTrail.length > maxNumberOfImages) {
          const toRemove = newTrail.slice(0, newTrail.length - maxNumberOfImages);
          toRemove.forEach((img) => {
            const timeout = timeoutRefs.current.get(img.id);
            if (timeout) {
              clearTimeout(timeout);
              timeoutRefs.current.delete(img.id);
            }
          });
          return newTrail.slice(-maxNumberOfImages);
        }
        return newTrail;
      });

      // Set timeout to fade out
      if (fadeAnimation) {
        const fadeTimeout = setTimeout(() => {
          setTrail((prev) =>
            prev.map((img) =>
              img.id === newId ? { ...img, status: 'inactive' } : img
            )
          );

          // Remove from DOM after animation
          const removeTimeout = setTimeout(() => {
            setTrail((prev) => prev.filter((img) => img.id !== newId));
            timeoutRefs.current.delete(newId);
          }, 500);

          timeoutRefs.current.set(newId, removeTimeout);
        }, 1000);

        timeoutRefs.current.set(newId, fadeTimeout);
      }
    }
  }, [distance, items.length, maxNumberOfImages, fadeAnimation, getDistance]);

  const handleMouseLeave = useCallback(() => {
    // Fade out all images when mouse leaves
    setTrail((prev) =>
      prev.map((img) => ({ ...img, status: 'inactive' as const }))
    );

    // Clear all after animation
    setTimeout(() => {
      setTrail([]);
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current.clear();
    }, 500);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const timeouts = timeoutRefs.current;
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      timeouts.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trail images */}
      {trail.map((item) => (
        <div
          key={item.id}
          data-status={item.status}
          className="absolute pointer-events-none transition-all duration-500 ease-out-expo"
          style={{
            left: item.x,
            top: item.y,
            zIndex: item.id,
            transform: item.status === 'active' ? 'scale(1)' : 'scale(0)',
            opacity: item.status === 'active' ? 1 : 0,
          }}
        >
          <div className={`relative ${imgClass}`}>
            <Image
              src={items[item.imageIndex].src}
              alt={items[item.imageIndex].alt}
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 160px, 200px"
            />
          </div>
        </div>
      ))}

      {/* Children (base content) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ImageMouseTrail;
