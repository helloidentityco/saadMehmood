import React from 'react';

export default function ProductDetailLoading() {
  return (
    <div className="w-full bg-[#080808] min-h-screen py-8 text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
          <span className="text-neutral-700">/</span>
          <div className="h-3 w-28 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
          <span className="text-neutral-700">/</span>
          <div className="h-3 w-40 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
        </div>

        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Large Portrait Image Gallery Placeholder (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] w-full bg-neutral-900 border border-amber-900/20 overflow-hidden animate-pulse">
              {/* Luxury Corner Ornaments */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-amber-500/30 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-amber-500/30 pointer-events-none" />
            </div>

            {/* Thumbnail Row Placeholders */}
            <div className="flex items-center gap-3 pt-1">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="w-20 h-24 bg-neutral-900 border border-amber-900/20 animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Detail & Purchase Panel Placeholders (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Collection Tag Placeholder */}
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-32 bg-amber-950/40 border border-amber-900/30 animate-pulse rounded" />
                <span className="text-neutral-700">·</span>
                <div className="h-3.5 w-24 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
              </div>

              {/* Title Placeholder */}
              <div className="space-y-2.5">
                <div className="h-9 w-4/5 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
                <div className="h-9 w-2/3 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
              </div>

              {/* Price Placeholder */}
              <div className="flex items-baseline gap-4 pt-2">
                <div className="h-8 w-44 bg-amber-950/50 border border-amber-900/40 animate-pulse rounded" />
                <div className="h-4 w-28 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
              </div>

              {/* Color Selector Placeholder */}
              <div className="space-y-3 pt-4 border-t border-amber-900/20">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-28 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
                  <div className="h-3 w-16 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
                </div>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-neutral-900 border border-amber-900/20 animate-pulse flex items-center justify-center"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-800" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fabric Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-amber-900/20">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-3 bg-neutral-900 border border-amber-900/20 space-y-1.5"
                  >
                    <div className="h-2.5 w-16 bg-neutral-800 animate-pulse rounded" />
                    <div className="h-3.5 w-28 bg-neutral-800/80 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Counter & Add to Bag Button Placeholders */}
            <div className="space-y-4 pt-4 border-t border-amber-900/20">
              <div className="flex items-center gap-3">
                {/* Quantity Counter */}
                <div className="w-32 h-12 bg-neutral-900 border border-amber-900/20 animate-pulse flex items-center justify-between px-3">
                  <div className="w-5 h-5 bg-neutral-800 rounded" />
                  <div className="w-6 h-4 bg-neutral-800 rounded" />
                  <div className="w-5 h-5 bg-neutral-800 rounded" />
                </div>

                {/* Add to Bag Button */}
                <div className="flex-1 h-12 bg-amber-950/60 border border-amber-900/40 animate-pulse rounded flex items-center justify-center">
                  <div className="h-4 w-32 bg-amber-500/20 rounded" />
                </div>
              </div>

              {/* Direct Order CTA Placeholder */}
              <div className="w-full h-12 bg-neutral-900 border border-amber-900/20 animate-pulse flex items-center justify-center">
                <div className="h-4 w-40 bg-neutral-800 rounded" />
              </div>

              {/* Trust Guarantee Placeholder */}
              <div className="pt-2 space-y-2">
                <div className="h-3 w-3/4 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
