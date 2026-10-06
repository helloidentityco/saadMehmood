'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, ShieldCheck, Database } from 'lucide-react';
import { useLoading } from '@/components/providers/LoadingContext';

export default function GlobalSkeletonOverlay() {
  const { isMutating, mutationMessage, operationType } = useLoading();
  const pathname = usePathname();

  if (!isMutating) {
    return null;
  }

  const isAdminRoute = pathname?.startsWith('/admin');
  const isCheckoutRoute = pathname?.startsWith('/checkout');

  return (
    <div
      role="status"
      aria-live="assertive"
      aria-busy="true"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden animate-in fade-in duration-200"
    >
      {/* Background Layout-Matching Dark Luxury Shimmer Skeletons */}
      <div className="w-full max-w-6xl mx-auto space-y-6 opacity-45 pointer-events-none select-none">
        {/* Top Header Shimmer Bar */}
        <div className="flex items-center justify-between border-b border-amber-900/20 pb-4">
          <div className="space-y-2">
            <div className="h-3 w-40 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
            <div className="h-7 w-72 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="h-9 w-28 bg-neutral-900 border border-amber-900/20 animate-pulse" />
            <div className="h-9 w-36 bg-amber-950/30 border border-amber-900/30 animate-pulse" />
          </div>
        </div>

        {/* Dynamic Page-Aware Shimmer Placeholders */}
        {isAdminRoute ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Form / Table Shimmer (2 cols) */}
            <div className="lg:col-span-2 bg-neutral-900/90 border border-amber-900/20 p-6 space-y-5 animate-pulse">
              <div className="h-4 w-48 bg-neutral-800 border border-amber-900/20 rounded" />
              <div className="space-y-3">
                <div className="h-11 w-full bg-neutral-800/80 border border-amber-900/20" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-11 w-full bg-neutral-800/80 border border-amber-900/20" />
                  <div className="h-11 w-full bg-neutral-800/80 border border-amber-900/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-11 w-full bg-neutral-800/80 border border-amber-900/20" />
                  <div className="h-11 w-full bg-neutral-800/80 border border-amber-900/20" />
                </div>
                <div className="h-28 w-full bg-neutral-800/70 border border-amber-900/20" />
              </div>
            </div>

            {/* Right Media & Action Shimmer (1 col) */}
            <div className="space-y-6">
              <div className="bg-neutral-900/90 border border-amber-900/20 p-6 space-y-4 animate-pulse">
                <div className="h-4 w-36 bg-neutral-800 border border-amber-900/20 rounded" />
                <div className="h-40 w-full bg-neutral-800/60 border border-dashed border-amber-900/30" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-[3/4] bg-neutral-800 border border-amber-900/20" />
                  <div className="aspect-[3/4] bg-neutral-800 border border-amber-900/20" />
                  <div className="aspect-[3/4] bg-neutral-800 border border-amber-900/20" />
                </div>
              </div>
              <div className="bg-neutral-900/90 border border-amber-900/20 p-6 space-y-3 animate-pulse">
                <div className="h-11 w-full bg-amber-950/40 border border-amber-900/40" />
                <div className="h-10 w-full bg-neutral-800 border border-amber-900/20" />
              </div>
            </div>
          </div>
        ) : isCheckoutRoute ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-neutral-900/90 border border-amber-900/20 p-6 space-y-4 animate-pulse">
              <div className="h-4 w-44 bg-neutral-800 rounded" />
              <div className="h-11 w-full bg-neutral-800/80 border border-amber-900/20" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-11 w-full bg-neutral-800/80 border border-amber-900/20" />
                <div className="h-11 w-full bg-neutral-800/80 border border-amber-900/20" />
              </div>
              <div className="h-24 w-full bg-neutral-800/80 border border-amber-900/20" />
              <div className="h-12 w-full bg-amber-950/40 border border-amber-900/30" />
            </div>
            <div className="lg:col-span-5 bg-neutral-900/90 border border-amber-900/20 p-6 space-y-4 animate-pulse">
              <div className="h-4 w-36 bg-neutral-800 rounded" />
              <div className="h-20 w-full bg-neutral-800/70 border border-amber-900/20" />
              <div className="h-20 w-full bg-neutral-800/70 border border-amber-900/20" />
              <div className="h-10 w-full bg-amber-950/30 border border-amber-900/20" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((card) => (
              <div
                key={card}
                className="bg-neutral-900/90 border border-amber-900/20 overflow-hidden animate-pulse"
              >
                <div className="aspect-[3/4] w-full bg-neutral-800/70 border-b border-amber-900/20" />
                <div className="p-4 space-y-2.5">
                  <div className="h-3 w-20 bg-neutral-800 rounded" />
                  <div className="h-4 w-3/4 bg-neutral-800 rounded" />
                  <div className="h-4 w-24 bg-amber-950/40 border border-amber-900/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Foreground Centerpiece: Saad Mehmood Fabrics Royal Pulse Emblem & Status Box */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative bg-[#0B0B0B]/95 border border-amber-500/30 px-8 py-10 sm:px-12 sm:py-12 max-w-md w-full text-center shadow-[0_0_80px_rgba(197,160,89,0.15)]">
          {/* Corner Royal Filigree Accents */}
          <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t border-l border-amber-500/40 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t border-r border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b border-l border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b border-r border-amber-500/40 pointer-events-none" />

          {/* Gold Metallic Animated Pulse Rings */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-amber-500/30 animate-ping" />
            <span
              className="absolute inset-2 rounded-full border border-amber-400/40 animate-ping"
              style={{ animationDuration: '2s' }}
            />
            <div className="relative w-14 h-14 rounded-full bg-neutral-900 border border-[#C5A059] flex items-center justify-center shadow-[0_0_25px_rgba(197,160,89,0.3)]">
              {operationType === 'create' || operationType === 'update' || operationType === 'delete' ? (
                <Database className="w-6 h-6 text-[#C5A059] animate-pulse" />
              ) : (
                <Sparkles className="w-6 h-6 text-[#C5A059] animate-pulse" />
              )}
            </div>
          </div>

          {/* Brand Monogram Header */}
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-medium block mb-1.5">
            SAAD MEHMOOD
          </span>

          {/* Subtle Gold Typography Indicator */}
          <h3 className="text-base sm:text-lg font-light tracking-[0.18em] uppercase text-[#F5F5F5] mb-2">
            {mutationMessage || 'Updating Catalog...'}
          </h3>

          <p className="text-xs text-neutral-400 font-light tracking-wide mb-6">
            Processing Request... Synchronizing with Neon PostgreSQL &amp; Cloudinary CDN
          </p>

          {/* Animated Shimmer Progress Bar */}
          <div className="w-full h-1 bg-neutral-900 border border-amber-900/30 overflow-hidden relative">
            <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent animate-pulse mx-auto" />
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Encrypted Atelier Transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
