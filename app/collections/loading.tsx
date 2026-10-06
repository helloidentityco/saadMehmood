import React from 'react';

export default function CollectionsLoading() {
  return (
    <div className="w-full bg-[#080808] min-h-screen py-8 text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
          <span className="text-neutral-700">/</span>
          <div className="h-3 w-32 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
        </div>

        {/* Shimmer Hero Banner Placeholder */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-neutral-900 border border-amber-900/20 overflow-hidden flex flex-col justify-end p-8 sm:p-12 animate-pulse">
          <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-amber-500/20 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-amber-500/20 pointer-events-none" />
          <div className="space-y-4 max-w-2xl">
            <div className="h-3.5 w-32 bg-neutral-800 border border-amber-900/20 rounded" />
            <div className="h-8 sm:h-12 w-3/4 bg-neutral-800/90 rounded" />
            <div className="h-4 w-full sm:w-2/3 bg-neutral-800/60 rounded" />
          </div>
        </div>

        {/* Filter / Category Tabs Bar Placeholder */}
        <div className="flex items-center justify-between border-b border-amber-900/20 pb-4">
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-24 bg-neutral-900 border border-amber-900/20 animate-pulse"
              />
            ))}
          </div>
          <div className="h-8 w-36 bg-neutral-900 border border-amber-900/20 animate-pulse hidden sm:block" />
        </div>

        {/* Responsive 8-Card Grid of Tall Portrait Image Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-amber-900/20 overflow-hidden flex flex-col group animate-pulse"
            >
              {/* Tall Portrait Image Placeholder */}
              <div className="relative aspect-[3/4] w-full bg-neutral-800/70 border-b border-amber-900/20 overflow-hidden">
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-amber-500/30" />
                <div className="absolute top-3 right-3 h-5 w-16 bg-neutral-900/80 border border-amber-900/20" />
              </div>

              {/* Card Meta Shimmer: Collection Tags, Title Lines, and Price Blocks */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* Collection Tag Placeholder */}
                  <div className="h-3 w-24 bg-neutral-800 border border-amber-900/20 rounded" />
                  {/* Title Lines Placeholder */}
                  <div className="h-4.5 w-4/5 bg-neutral-800 rounded" />
                  <div className="h-3 w-2/3 bg-neutral-800/60 rounded" />
                </div>

                {/* Price Block and Action Placeholder */}
                <div className="pt-3 border-t border-amber-900/20 flex items-center justify-between">
                  <div className="h-5 w-24 bg-amber-950/40 border border-amber-900/30 rounded" />
                  <div className="h-8 w-24 bg-neutral-800 border border-amber-900/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
