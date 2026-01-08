'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

interface GlobeProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
}

export function Globe({
  className = '',
  theta = 0.25,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = [0.4, 0.4, 0.4],
  markerColor = [1, 1, 1],
  glowColor = [0.3, 0.3, 0.3],
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let globe: ReturnType<typeof createGlobe> | null = null;

    if (canvasRef.current) {
      const width = canvasRef.current.offsetWidth;

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: theta,
        dark: dark,
        diffuse: diffuse,
        mapSamples: mapSamples,
        mapBrightness: mapBrightness,
        baseColor: baseColor,
        markerColor: markerColor,
        glowColor: glowColor,
        scale: scale,
        markers: [
          // Saudi Arabia - Mecca
          { location: [21.4225, 39.8262], size: 0.05 },
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.003;
        },
      });
    }

    const handleResize = () => {
      if (canvasRef.current && globe) {
        // Recreate globe on resize for proper scaling
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [theta, dark, scale, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{
        aspectRatio: '1 / 1',
        maxWidth: '100%',
      }}
    />
  );
}

export default Globe;
