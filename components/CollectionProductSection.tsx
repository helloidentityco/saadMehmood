'use client';

import React, { useState, useMemo } from 'react';
import CollectionFilterBar from './CollectionFilterBar';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/db/schema';

interface CollectionProductSectionProps {
  initialProducts: Product[];
}

export default function CollectionProductSection({ initialProducts }: CollectionProductSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...initialProducts];

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.texture.toLowerCase().includes(q) ||
          (p.colorName && p.colorName.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [initialProducts, searchQuery, sortBy]);

  return (
    <div>
      <CollectionFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={filteredAndSortedProducts.length}
      />

      {filteredAndSortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#111111] border border-[#222222] p-8">
          <p className="text-sm text-[#F5F5F5] mb-2">No fabrics match your search criteria.</p>
          <p className="text-xs text-[#777777] mb-4">Try clearing your search term or exploring another royal collection.</p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="px-6 py-2 text-xs uppercase tracking-wider text-[#080808] bg-[#C5A059] font-medium"
          >
            RESET FILTER
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredAndSortedProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 4}
            />
          ))}
        </div>
      )}
    </div>
  );
}
