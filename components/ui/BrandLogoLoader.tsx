'use client';

import React from 'react';
import { useLoading } from '@/components/providers/LoadingContext';
import Image from 'next/image';

interface BrandLogoLoaderProps {
  forceVisible?: boolean;
  customMessage?: string;
}

export default function BrandLogoLoader({
  forceVisible = false,
}: BrandLogoLoaderProps) {
  const { isLoading, isExiting } = useLoading();

  const shouldRender = forceVisible || isLoading || isExiting;
  if (!shouldRender) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`fixed inset-0 z-[999] bg-neutral-950 flex items-center justify-center select-none transition-opacity duration-300 ${
        !forceVisible && isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Circular Logo Container */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden flex items-center justify-center bg-neutral-900 border border-[#C5A059] shadow-[0_0_45px_rgba(245,158,11,0.35)] animate-pulse p-3 sm:p-4">
        <Image
          src="/images/SAAD-LOGO.png"
          alt="Saad Mehmood"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}