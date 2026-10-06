'use client';

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface CollectionFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export default function CollectionFilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount,
}: CollectionFilterBarProps) {
  return (
    <div className="py-4 px-4 sm:px-6 bg-[#111111] border border-[#222222] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
      {/* Search within collection */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter within this collection..."
          className="w-full bg-[#161616] border border-[#2A2A2A] text-xs text-[#F5F5F5] placeholder-[#666666] pl-9 pr-4 py-2 focus:outline-none focus:border-[#C5A059]"
        />
      </div>

      {/* Right controls: Total count + Sort */}
      <div className="flex items-center justify-between sm:justify-end gap-4 text-xs text-[#A5A5A5]">
        <span className="text-[11px] uppercase tracking-wider text-[#777777]">
          {totalCount} {totalCount === 1 ? 'Cut' : 'Cuts'} Available
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-[11px] uppercase tracking-wider text-[#888888] shrink-0">
            Sort By:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-[#161616] border border-[#2A2A2A] text-xs text-[#E5E5E5] px-3 py-1.5 focus:outline-none focus:border-[#C5A059] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
