import React from 'react';

export default function AdminProductsLoading() {
  return (
    <div className="w-full bg-[#080808] min-h-[90vh] text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-36 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
          <span className="text-neutral-700">/</span>
          <div className="h-3 w-32 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
        </div>

        {/* Page Header Skeleton */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-amber-900/20">
          <div className="space-y-2">
            <div className="h-3.5 w-56 bg-amber-950/40 border border-amber-900/30 animate-pulse rounded" />
            <div className="h-8 w-72 sm:w-96 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
            <div className="h-3.5 w-80 bg-neutral-900 border border-amber-900/20 animate-pulse rounded" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-32 bg-neutral-900 border border-amber-900/20 animate-pulse" />
            <div className="h-10 w-44 bg-amber-950/50 border border-amber-900/40 animate-pulse" />
          </div>
        </div>

        {/* Cloudinary Status Bar Skeleton */}
        <div className="p-4 bg-neutral-900 border border-amber-900/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-neutral-800 border border-amber-900/20" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-48 bg-neutral-800 rounded" />
              <div className="h-2.5 w-64 bg-neutral-800/70 rounded" />
            </div>
          </div>
          <div className="h-6 w-44 bg-neutral-800 border border-amber-900/20" />
        </div>

        {/* Catalog Inventory Table Skeleton */}
        <div className="bg-neutral-900 border border-amber-900/20 overflow-hidden">
          <div className="p-5 border-b border-amber-900/20 flex items-center justify-between">
            <div className="h-4 w-44 bg-neutral-800 border border-amber-900/20 animate-pulse rounded" />
            <div className="h-4 w-28 bg-neutral-800 border border-amber-900/20 animate-pulse rounded" />
          </div>

          {/* Table Header Row */}
          <div className="grid grid-cols-6 gap-4 py-3.5 px-4 bg-neutral-950 border-b border-amber-900/20">
            {[1, 2, 3, 4, 5, 6].map((col) => (
              <div
                key={col}
                className="h-3.5 bg-neutral-800 border border-amber-900/20 animate-pulse rounded"
              />
            ))}
          </div>

          {/* 6 Inventory Row Placeholders */}
          <div className="divide-y divide-amber-900/10">
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <div
                key={row}
                className="grid grid-cols-6 gap-4 py-3.5 px-4 items-center animate-pulse"
              >
                {/* Thumbnail + Fabric Name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 bg-neutral-800 border border-amber-900/20 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 w-full bg-neutral-800 rounded" />
                    <div className="h-2.5 w-2/3 bg-neutral-800/60 rounded" />
                  </div>
                </div>

                {/* Collection Tag */}
                <div className="h-6 w-28 bg-neutral-800 border border-amber-900/20" />

                {/* Material */}
                <div className="h-3.5 w-32 bg-neutral-800 rounded" />

                {/* Price */}
                <div className="space-y-1.5">
                  <div className="h-4 w-24 bg-amber-950/40 border border-amber-900/30 rounded" />
                  <div className="h-2.5 w-16 bg-neutral-800/60 rounded" />
                </div>

                {/* Stock Status */}
                <div className="h-4 w-20 bg-neutral-800 rounded" />

                {/* Action Icons */}
                <div className="flex items-center justify-end gap-2">
                  <div className="w-7 h-7 bg-neutral-800 border border-amber-900/20" />
                  <div className="w-7 h-7 bg-neutral-800 border border-amber-900/20" />
                  <div className="w-7 h-7 bg-neutral-800 border border-amber-900/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
