import React from 'react';

export default function AdminLoading() {
  return (
    <div className="w-full bg-[#080808] min-h-[90vh] text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
          <span className="text-neutral-700">/</span>
          <div className="h-3 w-44 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
        </div>

        {/* Portal Header Skeleton */}
        <div className="pb-8 border-b border-amber-900/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="h-3.5 w-48 bg-amber-950/40 border border-amber-900/30 animate-pulse rounded" />
            <div className="h-9 w-80 sm:w-96 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
            <div className="h-3.5 w-64 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-28 bg-neutral-900 border border-amber-900/20 animate-pulse" />
            <div className="h-9 w-32 bg-amber-950/40 border border-amber-900/30 animate-pulse" />
            <div className="h-9 w-24 bg-neutral-900 border border-red-950 animate-pulse" />
          </div>
        </div>

        {/* Top Row: 4 KPI Metric Summary Card Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-amber-900/20 p-6 relative overflow-hidden animate-pulse"
            >
              {/* Subtle top gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-600/30" />

              <div className="flex items-center justify-between">
                <div className="h-3 w-28 bg-neutral-800 border border-amber-900/20 rounded" />
                <div className="w-8 h-8 bg-neutral-800 border border-amber-900/20" />
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-8 w-32 bg-neutral-800 rounded" />
                <div className="h-3 w-3/4 bg-neutral-800/60 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Full Data Table Skeleton with Header Row and 6 Inventory Row Placeholders */}
        <div className="bg-neutral-900 border border-amber-900/20 p-6 space-y-6">
          {/* Table Toolbar Placeholders */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/20">
            <div className="flex items-center gap-2">
              <div className="h-9 w-32 bg-neutral-800 border border-amber-900/20 animate-pulse" />
              <div className="h-9 w-32 bg-neutral-800/60 border border-amber-900/20 animate-pulse" />
            </div>
            <div className="h-9 w-48 bg-neutral-800 border border-amber-900/20 animate-pulse" />
          </div>

          {/* Full Data Table Skeleton */}
          <div className="border border-amber-900/20 overflow-hidden">
            {/* Header Row Placeholder */}
            <div className="grid grid-cols-6 gap-4 py-3.5 px-4 bg-neutral-950 border-b border-amber-900/20">
              {[1, 2, 3, 4, 5, 6].map((col) => (
                <div key={col} className="h-3.5 bg-neutral-800 border border-amber-900/20 animate-pulse rounded" />
              ))}
            </div>

            {/* 6 Inventory Row Placeholders */}
            <div className="divide-y divide-amber-900/10 bg-neutral-900/50">
              {[1, 2, 3, 4, 5, 6].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-6 gap-4 py-4 px-4 items-center animate-pulse"
                >
                  <div className="h-3.5 w-20 bg-neutral-800 border border-amber-900/20 rounded" />
                  <div className="h-3.5 w-32 bg-neutral-800 border border-amber-900/20 rounded" />
                  <div className="h-3.5 w-24 bg-neutral-800 border border-amber-900/20 rounded" />
                  <div className="h-3.5 w-20 bg-amber-950/40 border border-amber-900/30 rounded" />
                  <div className="h-5 w-20 bg-neutral-800 border border-amber-900/20 rounded" />
                  <div className="h-7 w-16 bg-neutral-800 border border-amber-900/20 rounded ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
