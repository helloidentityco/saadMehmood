import React from 'react';
import CollectionCard from './CollectionCard';
import type { Collection } from '@/lib/db/schema';

interface CollectionGridProps {
  collections: Collection[];
}

export default function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-2 block">
            THE THREE PILLARS OF MENSWEAR
          </span>
          <h2 className="text-2xl sm:text-4xl font-light tracking-[0.16em] uppercase text-[#F5F5F5] mb-4">
            SHOP BY COLLECTION
          </h2>
          <div className="h-[1px] w-16 bg-[#C5A059]/60 mb-4" />
          <p className="text-xs sm:text-sm text-[#A5A5A5] font-light max-w-xl text-balance">
            Every collection tells its own story of heritage, weave, and purpose. Tailored specifically for the Pakistani man of stature.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((col, idx) => (
            <CollectionCard
              key={col.slug}
              slug={col.slug}
              name={col.name}
              fabricType={col.fabricType}
              description={col.description}
              tagline={col.tagline}
              image={col.image}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
