'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Colors, Liquid } from './liquid-gradient';

// Black and white color palette
const BW_COLORS: Colors = {
  color1: '#FFFFFF',
  color2: '#1a1a1a',
  color3: '#d4d4d4',
  color4: '#fafafa',
  color5: '#f5f5f5',
  color6: '#a3a3a3',
  color7: '#262626',
  color8: '#0a0a0a',
  color9: '#525252',
  color10: '#737373',
  color11: '#171717',
  color12: '#e5e5e5',
  color13: '#404040',
  color14: '#d4d4d4',
  color15: '#c4c4c4',
  color16: '#333333',
  color17: '#4a4a4a',
};

type LiquidButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  href,
  children,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`relative inline-block group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow effect */}
      <div className='absolute w-[120%] h-[140%] top-[5%] left-1/2 -translate-x-1/2 filter blur-[15px] opacity-60'>
        <span className='absolute inset-0 rounded-lg bg-neutral-400 filter blur-[5px]'></span>
        <div className='relative w-full h-full overflow-hidden rounded-lg'>
          <Liquid isHovered={isHovered} colors={BW_COLORS} />
        </div>
      </div>

      {/* Background blur layer */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[95%] h-[110%] rounded-lg bg-black filter blur-[6px]'></div>

      {/* Main button layer */}
      <div className='relative w-full h-full overflow-hidden rounded-lg'>
        <span className='absolute inset-0 rounded-lg bg-neutral-300'></span>
        <span className='absolute inset-0 rounded-lg bg-black'></span>
        <Liquid isHovered={isHovered} colors={BW_COLORS} />

        {/* Dark center overlay */}
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70%] h-[45%] rounded-lg filter blur-[12px] bg-neutral-900'></span>
      </div>

      {/* Button content */}
      <span className='absolute inset-0 flex items-center justify-center px-8 py-4 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-white group-hover:text-neutral-200 transition-colors z-10'>
        {children}
      </span>
    </Link>
  );
};

export default LiquidButton;
